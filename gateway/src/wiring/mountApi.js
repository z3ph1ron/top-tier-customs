import { Router } from "express";
import { health } from "../routes/health.routes.js";

export function mountApi(app) {
  const api = Router();

  api.use(health);

  app.use(api);
}
