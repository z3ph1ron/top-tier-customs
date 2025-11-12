import { authRoutes } from "../routes/auth.routes.js";
import { catalogRoutes } from "../routes/catalog.routes.js";

export function mountProxies(app) {
  app.use(authRoutes);
  app.use(catalogRoutes);
}
