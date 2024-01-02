import asyncHandler from "../middleware/asyncHandler.js";
import User from "../dataModels/userModel.js";
import generateJwtToken from "../helpers/generateJwtToken..js";

export const signInUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const currentUser = await User.findOne({ email });

   if (!currentUser || !(await currentUser.comparePassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password. Please try again.");
   } else {
      generateJwtToken(res, currentUser._id);

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
   const { email, password, name, telephoneNum } = req.body;

   const isUserExists = await User.findOne({ email });

   if (!isUserExists) {
      const newUser = await User.create({
         name,
         email,
         password,
         telephoneNum,
      });

      if (!newUser) {
         res.status(400);
         throw new Error("Invalid user form data.");
      } else {
         generateJwtToken(res, newUser._id);

         res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            telephoneNum: newUser.telephoneNum,
            joinedDate: newUser.joinedDate,
         });
      }
   } else {
      res.status(400);
      throw new Error("User already exists.");
   }
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
