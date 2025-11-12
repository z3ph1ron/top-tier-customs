import { Router } from "express";
import {
  listCategories,
  createCategory,
} from "../controllers/categories.controller.js";

export const categoriesRouter = Router();

categoriesRouter.get("/categories", listCategories);
categoriesRouter.post("/admin/categories", createCategory);
