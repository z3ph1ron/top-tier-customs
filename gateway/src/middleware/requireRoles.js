import { hasAnyRole } from "../utils/rbac.js";

export function requireRoles(...roles) {
  return (req, res, next) => {
    const userRoles = req.user?.roles || [];

    if (!hasAnyRole(userRoles, roles)) {
      return res.status(403).json({ error: "forbidden" });
    }

    next();
  };
}
