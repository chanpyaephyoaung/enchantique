import mongoose from "mongoose";
// import { connect, closeDB, clearDB } from "../db-handler.js";
import Product from "../backend/dataModels/productModel.js";
import User from "../backend/dataModels/userModel.js";
import ProductReview from "../backend/dataModels/productReviewModel.js";
import Order from "../backend/dataModels/orderModel.js";
import products from "../backend/data/dummyProducts.js";
import users from "../backend/data/dummyUsers.js";
import request from "supertest";
import app from "../backend/server.js";

describe("GET /api/products", () => {
   /* Connecting to the database before each test. */
   beforeAll(async () => {
      await mongoose.connect(process.env.MONGOATLAS_URI_TEST);

      try {
         console.log("Hello from try!");
         await Product.deleteMany().maxTimeMS(30000);
         await User.deleteMany();
         await ProductReview.deleteMany();
         await Order.deleteMany();

         const createdDumUsers = await User.insertMany(users);
         const admin = createdDumUsers[0]._id;

         const sampleProducts = products.map((prod) => ({
            ...prod,
            seller: admin,
         }));

         await Product.insertMany(sampleProducts);

         console.log("Dummy Data Successfully Seeded!");
      } catch (err) {
         console.error(err.message);
      }
   }, 20000);

   /* Closing database connection after each test. */
   afterAll(async () => {
      await mongoose.connection.close();
   }, 20000);
   it("should retrieve all products", async () => {
      // Make a GET request to the API endpoint that retrieves all products
      const response = await request(app).get("/api/products");

      // Assert the response status, body, or any other expectations
      expect(response.status).toBe(200);
      // expect(response.body).toHaveLength(6); // Adjust based on the number of seeded products
   }, 20000);
});
