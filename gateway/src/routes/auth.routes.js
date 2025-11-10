import { Router } from "express";
import { makeProxy } from "../utils/makeProxy.js";
import { env } from "../config/env.js";

export const authRoutes = Router();

authRoutes.use("/auth", makeProxy(env.UPSTREAM.AUTH));
