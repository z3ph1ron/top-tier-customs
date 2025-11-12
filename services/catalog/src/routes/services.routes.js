import { Router } from "express";
import {
  listServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} from "../controllers/services.controller.js";

export const servicesRouter = Router();

servicesRouter.get("/services", listServices);
servicesRouter.get("/services/:slug", getServiceBySlug);

servicesRouter.post("/admin/services", createService);
servicesRouter.patch("/admin/services/:id", updateService);
servicesRouter.delete("/admin/services/:id", deleteService);
