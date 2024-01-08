import express from "express";
import {
   getAllUsersOrdersByAdmin,
   setOrderToShippedByAdmin,
   setOrderToDeliveredByAdmin,
} from "../controllers/adminOrdersController.js";
import { protectRoutes, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoutes, verifyAdmin, getAllUsersOrdersByAdmin);
router.put("/:orderId/shipped", protectRoutes, verifyAdmin, setOrderToShippedByAdmin);
router.put("/:orderId/delivered", protectRoutes, verifyAdmin, setOrderToDeliveredByAdmin);

export default router;
