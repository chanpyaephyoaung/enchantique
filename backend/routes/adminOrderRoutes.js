import express from "express";
import {
   getAllUsersOrdersByAdmin,
   setOrderToDeliveredByAdmin,
} from "../controllers/adminOrdersController.js";
import { protectRoutes, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoutes, verifyAdmin, getAllUsersOrdersByAdmin);
router.get("/:orderId/delivered", protectRoutes, verifyAdmin, setOrderToDeliveredByAdmin);

export default router;
