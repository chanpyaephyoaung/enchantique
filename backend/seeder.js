import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";

import users from "./data/dummyUsers.js";
import products from "./data/dummyProducts.js";

import Product from "./dataModels/productModel.js";
import User from "./dataModels/userModel.js";
import ProductReview from "./dataModels/productReviewModel.js";
import Order from "./dataModels/orderModel.js";

dotenv.config();

connectDatabase();

export const seedDummyData = async () => {
   try {
      await Product.deleteMany();
      await User.deleteMany();
      await ProductReview.deleteMany();
      await Order.deleteMany();

      const createdDumUsers = await User.insertMany(users);
      console.log(createdDumUsers);
      const admin = createdDumUsers[0]._id;

      const sampleProducts = products.map((prod) => ({
         ...prod,
         seller: admin,
      }));

      const createdProducts = await Product.insertMany(sampleProducts);
      console.log(createdProducts);
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
      await ProductReview.deleteMany();
      await Order.deleteMany();

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
