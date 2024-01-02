import asyncHandler from "../middleware/asyncHandler.js";
import User from "../dataModels/userModel.js";

export const signInUser = asyncHandler(async (req, res) => {
   res.send("Sign in user!");
});

export const registerNewUser = asyncHandler(async (req, res) => {
   res.send("Register New User!");
});

export const signoutUser = asyncHandler(async (req, res) => {
   res.send("Sign out user!");
});

export const getUserAccProfile = asyncHandler(async (req, res) => {
   res.send("Get user account profile!");
});

export const updateUserAccProfile = asyncHandler(async (req, res) => {
   res.send("Update user account profile!");
});
