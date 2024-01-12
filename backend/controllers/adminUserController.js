import asyncHandler from "../middleware/asyncHandler.js";
import User from "../dataModels/userModel.js";

export const getAllUsers = asyncHandler(async (req, res) => {
   const allUsers = await User.find({});
   res.status(200).json(allUsers);
});

export const deleteSingleUserById = asyncHandler(async (req, res) => {
   const targetUser = await User.findById(req.body?.userId);

   if (!targetUser) {
      res.status(404);
      throw new Error("Requested user not found.");
   } else {
      await User.deleteOne({ _id: targetUser._id });
      res.status(204).json({ message: "User removed!" });
   }
});
