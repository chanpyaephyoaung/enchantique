import express from "express";
import {
   getAllUsers,
   getSingleUserById,
   deleteSingleUserById,
   updateSingleUserById,
} from "../controllers/adminUserController.js";
import { protectRoutes, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoutes, verifyAdmin, getAllUsers);
router
   .route("/:userId")
   .get(protectRoutes, verifyAdmin, getSingleUserById)
   .put(protectRoutes, verifyAdmin, updateSingleUserById)
   .delete(protectRoutes, verifyAdmin, deleteSingleUserById);

export default router;
