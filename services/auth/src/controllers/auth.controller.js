import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import z from "zod";
import { User } from "../models/User.js";
import { env } from "../config/env.js";
import { redis } from "../config/redis.js";
import { errors } from "../utils/errors.js";
import { signAccess, signRefresh } from "../utils/tokens.js";

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1).max(80).optional(),
  lastName: z.string().min(1).max(80).optional(),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function setRefreshCookie(res, token, exp) {
  const isProd = env.nodeENV === "production";

  res.cookie(env.refreshCookie, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    expires: new Date(exp * 1000),
  });
}

export const health = (_req, res) => res.json({ ok: true });

export const signup = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = SignupSchema.parse(
      req.body
    );

    const exists = await User.findOne({ email });
    if (exists) {
      throw errors.conflict("email_in_use");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const doc = await User.create({
      email,
      passwordHash,
      profile: { firstName, lastName },
    });

    return res.status(201).json({ userID: String(doc._id), email: doc.email });
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);

    const u = await User.findOne({ email });
    if (!u) {
      throw errors.unauthorized("invalid_creds");
    }

    const ok = await bcrypt.compare(password, u.passwordHash);
    if (!ok) {
      throw errors.unauthorized("invalid_creds");
    }

    const { token: accessToken, exp } = signAccess({
      userID: String(u._id),
      roles: u.roles,
      secret: env.jwtSecret,
      ttl: env.accessTTL,
    });

    const {
      token: refreshToken,
      exp: rExp,
      jti,
    } = signRefresh({
      userID: String(u._id),
      secret: env.jwtRefreshSecret,
      ttl: env.refreshTTL,
    });

    await redis.set(
      `refresh:${jti}`,
      JSON.stringify(
        { userID: String(u._id) },
        "EX",
        rExp - Math.floor(Date.now() / 1000)
      )
    );
    setRefreshCookie(res, refreshToken, rExp);

    return res.json({
      accessToken,
      expiresIn: exp - Math.floor(Date.now() / 1000),
      user: { id: String(u._id), email: u.email, roles: u.roles },
    });
  } catch (e) {
    next(e);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const cookie = req.cookies?.[env.refreshCookie];
    if (!cookie) {
      throw errors.unauthorized("no_refresh_cookie");
    }

    let payload;
    try {
      payload = jwt.verify(cookie, env.jwtRefreshSecret);
    } catch {
      throw errors.unauthorized("invalid_refresh");
    }

    const key = `refresh:${payload.jti}`;
    const record = await redis.get(key);
    if (!record) {
      throw errors.unauthorized("refresh_revoked");
    }

    await redis.del(key);

    const { token: accessToken, exp } = signAccess({
      userID: payload.sub,
      roles: [],
      secret: env.jwtSecret,
      ttl: env.accessTTL,
    });

    const {
      token: newRefresh,
      exp: rExp,
      jti,
    } = signRefresh({
      userID: payload.sub,
      secret: env.jwtRefreshSecret,
      ttl: env.refreshTTL,
    });

    await redis.set(
      `refresh:${jti}`,
      JSON.stringify({ userID: payload.sub }),
      "EX",
      rExp - Math.floor(Date.now() / 1000)
    );
    setRefreshCookie(res, newRefresh, rExp);

    return res.json({
      accessToken,
      expiresIn: exp - Math.floor(Date.now() / 1000),
    });
  } catch (e) {
    next(e);
  }
};

export const logout = async (req, res, next) => {
  try {
    const cookie = req.cookies?.[env.refreshCookie];
    if (cookie) {
      try {
        const p = jwt.verify(cookie, env.jwtRefreshSecret);
        await redis.del(`refresh:${p.jti}`);
      } catch {}
    }

    res.clearCookie(env.refreshCookie, { path: "/" });

    return res.status(204).end();
  } catch (e) {
    next(e);
  }
};

export const me = async (req, res) => {
  return res.json({ id: req.user.id, roles: req.user.roles });
};
