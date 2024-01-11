import asyncHandler from "../middleware/asyncHandler.js";
import User from "../dataModels/userModel.js";
import generateJwtToken from "../helpers/generateJwtToken..js";
import UserNotification from "../dataModels/userNotificationModel.js";

export const signInUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const currentUser = await User.findOne({ email });

   if (!currentUser || !(await currentUser.comparePassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password. Please try again.");
   } else {
      generateJwtToken(res, currentUser._id);

      res.status(200).json({
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
         throw new Error("Invalid user form data. Please try again.");
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
   const currentUser = await User.findById(req.currentUser._id);

   if (!currentUser) {
      res.status(404);
      throw new Error("User is not found.");
   } else {
      res.status(200).json({
         _id: currentUser._id,
         name: currentUser.name,
         email: currentUser.email,
         isAdmin: currentUser.isAdmin,
         telephoneNum: currentUser.telephoneNum,
      });
   }
});

export const updateUserAccProfile = asyncHandler(async (req, res) => {
   const currentUser = await User.findById(req.currentUser._id);

   if (!currentUser) {
      res.status(404);
      throw new Error("Update unsuccessful. User not found.");
   } else {
      currentUser.name = req.body.name || currentUser.name;
      currentUser.email = req.body.email || currentUser.email;
      currentUser.telephoneNum = req.body.telephoneNum || currentUser.telephoneNum;

      if (req.body.password) {
         currentUser.password = req.body.password;
      }

      const updatedCurrentUser = await currentUser.save();

      res.status(200).json({
         _id: updatedCurrentUser._id,
         isAdmin: updatedCurrentUser.isAdmin,
         name: updatedCurrentUser.name,
         email: updatedCurrentUser.email,
         telephoneNum: updatedCurrentUser.telephoneNum,
      });
   }
});

// Retrieve all user notifications from the database
export const getAllUserNotifications = asyncHandler(async (req, res) => {
   const allUserNotifications = await UserNotification.find({ user: req.params.userId });
   res.status(200).json(allUserNotifications);
});

// Retrieve all user notifications from the database
export const createNewNotification = asyncHandler(async (req, res) => {
   const { user, notificationMessage, payload } = req.body;

   const newNoti = new UserNotification({
      user,
      notificationMessage,
      payload,
   });

   const savedNoti = await newNoti.save();
   res.status(201).json(savedNoti);
});
