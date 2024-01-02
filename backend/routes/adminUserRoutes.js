import express from "express";
import {
   getAllUsers,
   getSingleUserById,
   deleteSingleUserById,
   updateSingleUserById,
} from "../controllers/adminUserController.js";

const router = express.Router();

router.get("/", getAllUsers);
router
   .route("/:userId")
   .get(getSingleUserById)
   .put(updateSingleUserById)
   .delete(deleteSingleUserById);

export default router;
