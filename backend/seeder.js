import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";

import users from "./data/dummyUsers.js";
import products from "./data/dummyProducts.js";

import Product from "./dataModels/productModel.js";
import User from "./dataModels/userModel.js";
import ProductRating from "./dataModels/productRatingModel.js";
import Order from "./dataModels/orderModel.js";
import UserNotification from "./dataModels/userNotificationModel.js";
import userNotifications from "./data/dummyUserNotifications.js";

dotenv.config();

connectDatabase();

export const seedDummyData = async () => {
   try {
      await Product.deleteMany();
      await User.deleteMany();
      await ProductRating.deleteMany();
      await Order.deleteMany();
      await UserNotification.deleteMany();

      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;
      const user = createdDumUsers[1]._id;

      const sampleProducts = products.map((prod) => ({
         ...prod,
         seller: admin,
      }));

      const sampleUserNotis = userNotifications.map((noti) => ({
         ...noti,
         user: user,
      }));

      await Product.insertMany(sampleProducts);
      await UserNotification.insertMany(sampleUserNotis);
      console.log("Dummy Data Successfully Seeded!");

      if (process.env.NODE_ENV !== "test") {
         process.exit();
      }
   } catch (err) {
      console.error(err.message);
      process.exit(1);
   }
};

const removeDummyData = async () => {
   try {
      await Product.deleteMany();
      await User.deleteMany();
      await ProductRating.deleteMany();
      await Order.deleteMany();
      await UserNotification.deleteMany();

      console.log("Dummy Data Successfully Removed!");
      process.exit();
   } catch (err) {
      console.error(err.message);
      process.exit(1);
   }
};

switch (process.argv[2]) {
   case "-s":
      seedDummyData();
      break;
   case "-r":
      removeDummyData();
      break;
   default:
   // Do nothing
}
