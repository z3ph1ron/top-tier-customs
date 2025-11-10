import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function requireAuth(req, res, next) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    const claims = jwt.verify(token, env.jwtSecret);

    req.user = { id: claims.sub, roles: claims.roles || [] };

    next();
  } catch {
    return res.status(401).json({ error: "unauthorized" });
  }
}
