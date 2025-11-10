import jwt from "jsonwebtoken";
import crypto from "crypto";
import { toSeconds } from "./time.js";

export function signAccess({ userID, roles, secret, ttl }) {
  const expiresInSec = toSeconds(ttl);

  const token = jwt.sign({ sub: userID, roles }, secret, {
    algorithm: "HS256",
    expiresIn: expiresInSec,
  });

  const exp = Math.floor(Date.now() / 1000) + expiresInSec;

  return { token, exp };
}

export function signRefresh({ userID, secret, ttl }) {
  const jti = crypto.randomUUID();

  const expiresInSec = toSeconds(ttl);

  const token = jwt.sign({ sub: userID, jti }, secret, {
    algorithm: "HS256",
    expiresIn: expiresInSec,
  });

  return { token, exp, jti };
}
