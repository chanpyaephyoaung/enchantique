import express from "express";
import {
   registerNewUser,
   signoutUser,
   getUserAccProfile,
   updateUserAccProfile,
   getAllUserNotifications,
   signInUser,
   createNewNotification,
} from "../controllers/userController.js";
import { protectRoutes } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", registerNewUser);
router.post("/signin", signInUser);
router.post("/signout", signoutUser);
router
   .route("/account-profile")
   .get(protectRoutes, getUserAccProfile)
   .put(protectRoutes, updateUserAccProfile);
router.get("/:userId/notifications", getAllUserNotifications);
router.post("/notifications/new", createNewNotification);

export default router;
