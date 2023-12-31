import { assert } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import Product from "../../backend/dataModels/productModel.js";
import { seedDummyData } from "../../backend/seeder.js";
import User from "../../backend/dataModels/userModel.js";
import users from "../../backend/data/dummyUsers.js";
import app from "../../backend/server.js";

console.log("Hiyah");

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
         reviewsCount: 10,
         stocksCount: 5,
         createdDate: "2023-12-30T22:24:19.284Z",
      });

      const createdProduct = await product.save();
      console.log("CREATED PRODUCT - ", createdProduct);

      const res = await request(app).get(`/api/products/${createdProduct._id}`);
      console.log("RESPONSE BODY - ", res.body);

      assert.equal(res.status, 200, "Request unsuccessful.");
      assert.isObject(res.body, "Product should be an object.");
      assert.typeOf(res.body._id, "string");
      assert.typeOf(res.body.seller, "string");
      assert.propertyVal(res.body, "name", "Product Test 1");
      assert.propertyVal(res.body, "price", 15);
      assert.propertyVal(res.body, "description", "This is a test description");
      assert.propertyVal(res.body, "image", "/images/test.jpg");
      assert.propertyVal(res.body, "brandName", "Orange");
      assert.propertyVal(res.body, "category", "Electronics");
      assert.propertyVal(res.body, "rating", 5);
      assert.propertyVal(res.body, "reviewsCount", 10);
      assert.propertyVal(res.body, "stocksCount", 5);
      assert.typeOf(res.body.createdDate, "string");
   });
});
