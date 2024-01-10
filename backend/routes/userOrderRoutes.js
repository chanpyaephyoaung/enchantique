import express from "express";
import {
   createOrderByUser,
   getAllOrdersByUser,
   getSingleOrderByIdByUser,
   checkoutOrderByUser,
   cancelOrder,
} from "../controllers/userOrdersController.js";
import { protectRoutes } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protectRoutes, createOrderByUser);
router.get("/my-orders", protectRoutes, getAllOrdersByUser);
router.get("/:orderId", protectRoutes, getSingleOrderByIdByUser);
router.post("/pay", protectRoutes, checkoutOrderByUser);
router.post("/:orderId/cancel", protectRoutes, cancelOrder);

export default router;
