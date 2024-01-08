import express from "express";
import { protectRoutes, verifyAdmin } from "../middleware/authMiddleware.js";
import {
   getAllProducts,
   getSingleProductById,
   createNewProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:productId", getSingleProductById);

router.post("/new", protectRoutes, verifyAdmin, createNewProduct);

export default router;
