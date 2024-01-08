import express from "express";
import { getAllUsers, deleteSingleUserById } from "../controllers/adminUserController.js";
import { protectRoutes, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoutes, verifyAdmin, getAllUsers);
router.delete("/:userId", protectRoutes, verifyAdmin, deleteSingleUserById);

export default router;
