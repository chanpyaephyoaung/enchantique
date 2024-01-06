import express from "express";
import {
   createOrderByUser,
   getAllOrdersByUser,
   setOrderToPaidByUser,
   getSingleOrderByIdByUser,
} from "../controllers/userOrdersController.js";
import { protectRoutes } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protectRoutes, createOrderByUser);
router.get("/my-orders", protectRoutes, getAllOrdersByUser);
router.get("/:orderId", protectRoutes, getSingleOrderByIdByUser);
router.get("/:orderId/paid", protectRoutes, setOrderToPaidByUser);

export default router;
