import asyncHandler from "../middleware/asyncHandler.js";
import User from "../dataModels/userModel.js";

export const signInUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const currentUser = await User.findOne({ email });

   if (!currentUser || !(await currentUser.comparePassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password. Please try again.");
   } else {
      res.json({
         _id: currentUser._id,
         isAdmin: currentUser.isAdmin,
         name: currentUser.name,
         email: currentUser.email,
         telephoneNum: currentUser.telephoneNum,
         joinedDate: currentUser.joinedDate,
      });
   }

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
