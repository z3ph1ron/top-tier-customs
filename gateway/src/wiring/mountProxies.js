import { authRoutes } from "../routes/auth.routes.js";

export function mountProxies(app) {
  app.use(authRoutes);
}
