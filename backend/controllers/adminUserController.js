import asyncHandler from "../middleware/asyncHandler.js";
import User from "../dataModels/userModel.js";

export const getAllUsers = asyncHandler(async (req, res) => {
   const allUsers = await User.find({});
   console.log(allUsers);
   res.status(200).json(allUsers);
});

export const deleteSingleUserById = asyncHandler(async (req, res) => {
   res.send("Delete user by id!");
});
