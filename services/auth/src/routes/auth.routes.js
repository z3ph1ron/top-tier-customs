import { Router } from "express";
import { authLimiter } from "../middleware/rateLimit.js";
import { requireAuth } from "../middleware/requireAuth.js";
import {
  health,
  signup,
  login,
  refresh,
  logout,
  me,
} from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.get("/health", health);

authRouter.post("/signup", authLimiter, signup);
authRouter.post("/login", authLimiter, login);
authRouter.post("/refresh", authLimiter, refresh);

authRouter.post("/logout", logout);

authRouter.get("/me", requireAuth, me);
