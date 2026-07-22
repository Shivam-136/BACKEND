import express from "express";

const router = express.Router();

import {
  createProductController,
  getAllProductsController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller.js";

router.post("/create", createProductController);

router.get("/", getAllProductsController);

router.get("/:productId", getSingleProductController);

router.patch("/update/:productId", updateProductController);

router.delete("/delete/:productId", deleteProductController);

export default router;