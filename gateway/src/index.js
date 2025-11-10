import express from "express";
import helmet from "helmet";
import pino from "pino-http";
import cookieParser from "cookie-parser";
import { corsMw } from "./config/cors.js";
import { requestID } from "./middleware/requestID.js";
import { notFound, errorHandler } from "./middleware/error.js";
import { mountProxies } from "./wiring/mountProxies.js";
import { mountApi } from "./wiring/mountApi.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", true);
  app.use(helmet());
  app.use(pino());
  app.use(requestID);
  app.use(corsMw);
  app.use(cookieParser());

  // 1. Mount proxies first (safe even if JSON parser is later)
  mountProxies(app);

  // 2. Parse JSON for gateway-owned endpoints
  app.use(express.json());

  // 3. Mount gateway-owned routes
  mountApi(app);

  // 4. 404 + Error
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
