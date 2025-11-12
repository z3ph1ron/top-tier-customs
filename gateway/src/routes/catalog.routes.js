import { Router } from "express";
import { makeProxy } from "../utils/makeProxy.js";
import { env } from "../config/env.js";

export const catalogRoutes = Router();

catalogRoutes.use("/catalog", makeProxy(env.UPSTREAM.CATALOG));
