import express from "express";
import {
   registerNewUser,
   signoutUser,
   getUserAccProfile,
   updateUserAccProfile,
   signInUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", registerNewUser);
router.post("/signin", signInUser);
router.post("/signout", signoutUser);
router.route("/account-profile").get(getUserAccProfile).put(updateUserAccProfile);

export default router;
