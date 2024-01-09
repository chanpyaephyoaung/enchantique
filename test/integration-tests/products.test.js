import { assert } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import Product from "../../backend/dataModels/productModel.js";
import { seedDummyData } from "../../backend/seeder.js";
import User from "../../backend/dataModels/userModel.js";
import users from "../../backend/data/dummyUsers.js";
import app from "../../backend/server.js";

process.env.NODE_ENV = "test";

describe("Integration tests for products controllers.", () => {
   beforeEach(async () => {
      await Product.deleteMany({});
      await User.deleteMany({});
   });

   afterEach(async () => {
      await Product.deleteMany({});
      await User.deleteMany({});
   });

   it("Test GET /products - Retrieve all products", async () => {
      await seedDummyData();

      const res = await request(app).get("/api/products");

      assert.equal(res.status, 200, "Request unsuccessful.");
      assert.isArray(res.body, "The response body (products list) should be an array.");
      assert.equal(res.body.length, 6, "Test array data should have 6 elements.");
   });

   it("Test GET /products/:productId - Retrieve a single product by id", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;

      const product = new Product({
         seller: admin,
         name: "Product Test 1",
         price: 15,
         description: "This is a test description",
         image: "/images/test.jpg",
         brandName: "Orange",
         category: "Electronics",
         rating: 5,
         ratings: [],
         stocksCount: 5,
         createdDate: "2023-12-30T22:24:19.284Z",
      });

      const createdProduct = await product.save();

      const res = await request(app).get(`/api/products/${createdProduct._id}`);

      assert.equal(res.status, 200, "Request unsuccessful.");
      assert.isObject(res.body, "Product should be an object.");
      assert.property(res.body, "_id");
      assert.property(res.body, "seller");
      assert.property(res.body, "name");
      assert.property(res.body, "price");
      assert.property(res.body, "description");
      assert.property(res.body, "image");
      assert.property(res.body, "brandName");
      assert.property(res.body, "category");
      assert.property(res.body, "rating");
      assert.property(res.body, "ratings");
      assert.property(res.body, "stocksCount");
   });
});
