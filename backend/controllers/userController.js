import asyncHandler from "../middleware/asyncHandler.js";
import User from "../dataModels/userModel.js";
import jwt from "jsonwebtoken";

export const signInUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const currentUser = await User.findOne({ email });

   if (!currentUser || !(await currentUser.comparePassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password. Please try again.");
   } else {
      const jwtToken = jwt.sign({ userId: currentUser._id }, process.env.JWT_TOKEN_SECRET, {
         expiresIn: "10d",
      });

      res.cookie("jwtCookie", jwtToken, {
         httpOnly: true,
         secure: process.env.NODE_ENV !== "development" || process.env.NODE_ENV === "test",
         maxAge: 10 * 24 * 3600 * 1000, //10 days
         sameSite: "strict",
      });

      res.json({
         _id: currentUser._id,
         isAdmin: currentUser.isAdmin,
         name: currentUser.name,
         email: currentUser.email,
         telephoneNum: currentUser.telephoneNum,
         joinedDate: currentUser.joinedDate,
      });
   }
});

export const registerNewUser = asyncHandler(async (req, res) => {
   res.send("Register New User!");
});

export const signoutUser = asyncHandler(async (req, res) => {
   res.cookie("jwtCookie", "", {
      httpOnly: true,
      expires: new Date(0), //expires immediately to clear out the cookie
   });

   res.status(200).json({ message: "User is signed out successfully." });
});

export const getUserAccProfile = asyncHandler(async (req, res) => {
   res.send("Get user account profile!");
});

export const updateUserAccProfile = asyncHandler(async (req, res) => {
   res.send("Update user account profile!");
});
