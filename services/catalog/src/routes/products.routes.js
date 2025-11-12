import { Router } from "express";
import {
  listProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

export const productsRouter = Router();

productsRouter.get("/products", listProducts);
productsRouter.get("/products/:slug", getProductBySlug);

productsRouter.post("/admin/products", createProduct);
productsRouter.patch("/admin/products/:id", updateProduct);
productsRouter.delete("/admin/products/:id", deleteProduct);
