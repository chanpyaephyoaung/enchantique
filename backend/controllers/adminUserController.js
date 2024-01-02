import asyncHandler from "../middleware/asyncHandler.js";
import User from "../dataModels/userModel.js";

export const getAllUsers = asyncHandler(async (req, res) => {
   res.send("Get all users!");
});

export const getSingleUserById = asyncHandler(async (req, res) => {
   res.send("Get single user by id!");
});

export const deleteSingleUserById = asyncHandler(async (req, res) => {
   res.send("Delete user by id!");
});

export const updateSingleUserById = asyncHandler(async (req, res) => {
   res.send("Update single user by id!");
});
