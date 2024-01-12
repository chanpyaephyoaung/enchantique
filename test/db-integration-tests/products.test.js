import { assert } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import Product from "../../backend/dataModels/productModel.js";
import { seedDummyData } from "../../backend/seeder.js";
import User from "../../backend/dataModels/userModel.js";
import users from "../../backend/data/dummyUsers.js";
import products from "../../backend/data/dummyProducts.js";
import app from "../../backend/server.js";
import jwt from "jsonwebtoken";
import ProductRating from "../../backend/dataModels/productRatingModel.js";

process.env.NODE_ENV = "test";

let admin;

const generateMockProductObj = (seller) => {
   return {
      name: "Test Product",
      seller,
      price: 20,
      description: "This is a test product.",
      image: "test_img.jpg",
      brandName: "Test Brand",
      category: "Test",
   };
};

const generateJwtToken = (userId) => {
   const jwtToken = jwt.sign({ userId }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "10d",
   });

   return jwtToken;
};

describe("Integration tests for products endpoints with database.", () => {
   beforeEach(async () => {
      await Product.deleteMany({});
      await User.deleteMany({});
      await ProductRating.deleteMany({});
   });

   afterEach(async () => {
      await Product.deleteMany({});
      await User.deleteMany({});
      await ProductRating.deleteMany({});
   });

   it("Test 'GET' /products - Retrieve all products", async () => {
      await seedDummyData();

      const res = await request(app).get("/api/products");

      assert.equal(res.status, 200);
      assert.isArray(res.body, "The response body (products list) should be an array.");
      assert.equal(res.body.length, 6, "Test array data should have 6 elements.");
   });

   it("Test 'GET' /products/:productId - Retrieve a single product by id", async () => {
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

   it("Test 'GET' /products/:productId - Should not retrieve a single product by id if the product does not exist in the database", async () => {
      const mockProductId = "659f0a906bf7e2fa49254d99";

      const res = await request(app).get(`/api/products/${mockProductId}`);

      assert.equal(res.status, 404, "Request unsuccessful.");
      assert.equal(res.body.errMessage, "Resource not found!");
   });

   it("Test 'POST' /products/new - Create a new product (Only with admin privilege)", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;

      const mockJwtToken = generateJwtToken(admin);
      const mockProductObj = generateMockProductObj(admin);

      const res = await request(app)
         .post("/api/products/new")
         .set("Cookie", `jwtCookie=${mockJwtToken}`)
         .send(mockProductObj);

      assert.equal(res.status, 201, "Request unsuccessful.");
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

   it("Test 'POST' /products/new - Should not create a new product (Without admin privilege)", async () => {
      const createdDumUsers = await User.insertMany(users);
      const user = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(user);
      const mockProductObj = generateMockProductObj(user);

      const res = await request(app)
         .post("/api/products/new")
         .set("Cookie", `jwtCookie=${mockJwtToken}`)
         .send(mockProductObj);

      assert.equal(res.status, 401);
   });

   it("Test 'DELETE' /products/:productId - Delete an existing product (With admin privilege)", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;

      const mockJwtToken = generateJwtToken(admin);

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

      const res = await request(app)
         .delete(`/api/products/${createdProduct._id}`)
         .set("Cookie", `jwtCookie=${mockJwtToken}`)
         .send({ productId: createdProduct._id });

      assert.equal(res.status, 204);
   });

   it("Test 'DELETE' /products/:productId - Should not delete an existing product (Without admin privilege)", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;
      const user = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(user);

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

      const res = await request(app)
         .delete(`/api/products/${createdProduct._id}`)
         .set("Cookie", `jwtCookie=${mockJwtToken}`)
         .send({ productId: createdProduct._id });

      assert.equal(res.status, 401);
   });

   it("Test 'POST' /products/:productId/rate - Give a rating to a product (As a normal user)", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;
      const user = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(user);

      const product = new Product({
         seller: admin,
         name: "Product Test 1",
         price: 15,
         description: "This is a test description",
         image: "/images/test.jpg",
         brandName: "Orange",
         category: "Electronics",
      });

      const createdProduct = await product.save();

      const res = await request(app)
         .post(`/api/products/${createdProduct._id}/rate`)
         .set("Cookie", `jwtCookie=${mockJwtToken}`)
         .send({ prodRating: 4 });

      assert.equal(res.status, 201);
      assert.equal(res.body.message, "New rating given.");
   });

   it("Test 'POST' /products/:productId/rate - Should not give a rating to a product if the user has already rated it. (As a normal user)", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;
      const user = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(user);

      const product = new Product({
         seller: admin,
         name: "Product Test 1",
         price: 15,
         description: "This is a test description",
         image: "/images/test.jpg",
         brandName: "Orange",
         category: "Electronics",
      });

      const createdProduct = await product.save();

      await request(app)
         .post(`/api/products/${createdProduct._id}/rate`)
         .set("Cookie", `jwtCookie=${mockJwtToken}`)
         .send({ prodRating: 4 });

      const newRes = await request(app)
         .post(`/api/products/${createdProduct._id}/rate`)
         .set("Cookie", `jwtCookie=${mockJwtToken}`)
         .send({ prodRating: 4 });

      assert.equal(newRes.status, 400);
      assert.equal(newRes.body.errMessage, "You have already rated this product.");
   });
});
