import express from "express";
import { getAllProducts, getSingleProductById } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:productId", getSingleProductById);

export default router;
