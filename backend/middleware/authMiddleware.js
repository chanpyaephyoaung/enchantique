import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../dataModels/userModel.js";

export const protectRoutes = asyncHandler(async (req, res, next) => {
   let jwtToken;
   jwtToken = req.cookies.jwtCookie;

   if (!jwtToken) {
      res.status(401);
      throw new Error("Unauthorised, token not presented.");
   } else {
      try {
         const decodedToken = jwt.verify(jwtToken, process.env.JWT_TOKEN_SECRET);
         req.currentUser = await User.findById(decodedToken.userId).select("-password"); //Exclude password
         next();
      } catch (err) {
         res.status(401);
         throw new Error("Unauthorised, token unsuccessful.");
      }
   }
});

// Verify admin user middleware
export const verifyAdmin = (req, res, next) => {
   if (!req.currentUser || !req.currentUser.isAdmin) {
      res.status(401);
      throw new Error("Unauthorised as admin user.");
   } else {
      next();
   }
};
