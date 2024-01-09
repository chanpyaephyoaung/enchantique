import express from "express";
import { protectRoutes, verifyAdmin } from "../middleware/authMiddleware.js";
import {
   getAllProducts,
   getSingleProductById,
   createNewProduct,
   deleteProduct,
   giveProductRating,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:productId", getSingleProductById);
router.delete("/:productId", protectRoutes, verifyAdmin, deleteProduct);
router.post("/:productId/rate", protectRoutes, giveProductRating);

router.post("/new", protectRoutes, verifyAdmin, createNewProduct);
export default router;
