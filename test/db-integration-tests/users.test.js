import { assert } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import Product from "../../backend/dataModels/productModel.js";
import { seedDummyData } from "../../backend/seeder.js";
import User from "../../backend/dataModels/userModel.js";
import users from "../../backend/data/dummyUsers.js";
import UserNotification from "../../backend/dataModels/userNotificationModel.js";
import userNotifications from "../../backend/data/dummyUserNotifications.js";
import app from "../../backend/server.js";
import jwt from "jsonwebtoken";

process.env.NODE_ENV = "test";

let admin;

const generateMockUser = (seller) => {
   return {
      name: "Bob",
      email: "bob@gmail.com",
      password: "123abc",
      telephoneNum: "199",
   };
};

const generateJwtToken = (userId) => {
   const jwtToken = jwt.sign({ userId }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "10d",
   });

   return jwtToken;
};

describe("Integration tests for users endpoints with database.", () => {
   beforeEach(async () => {
      await Product.deleteMany({});
      await User.deleteMany({});
      await UserNotification.deleteMany({});
   });

   afterEach(async () => {
      await Product.deleteMany({});
      await User.deleteMany({});
      await UserNotification.deleteMany({});
   });

   it("Test 'POST' /users/signin - Sign in the user with correct credentials", async () => {
      const createdDumUsers = await User.insertMany(users);
      const existingUserId = createdDumUsers[1]._id;

      const user = {
         email: "albus@gmail.com",
         password: "123abc",
      };

      const mockJwtToken = generateJwtToken(existingUserId);

      const res = await request(app)
         .post("/api/users/signin")
         .set("Cookie", `jwtCookie=${mockJwtToken}`)
         .send(user);

      assert.equal(res.status, 200);
      assert.isObject(res.body, "The response body (user) should be an object.");
      assert.property(res.body, "_id");
      assert.property(res.body, "isAdmin");
      assert.property(res.body, "name");
      assert.property(res.body, "email");
      assert.property(res.body, "telephoneNum");
      assert.property(res.body, "joinedDate");
   });

   it("Test 'POST' /users/signin - Does not sign in the user with wrong email", async () => {
      const createdDumUsers = await User.insertMany(users);
      const existingUserId = createdDumUsers[1]._id;

      const user = {
         email: "albuses@gmail.com",
         password: "123abc",
      };

      const mockJwtToken = generateJwtToken(existingUserId);

      const res = await request(app)
         .post("/api/users/signin")
         .set("Cookie", `jwtCookie=${mockJwtToken}`)
         .send(user);

      assert.equal(res.status, 401);
   });

   it("Test 'POST' /users/signin - Does not sign in the user with wrong password", async () => {
      const createdDumUsers = await User.insertMany(users);
      const existingUserId = createdDumUsers[1]._id;

      const user = {
         email: "albus@gmail.com",
         password: "999",
      };

      const mockJwtToken = generateJwtToken(existingUserId);

      const res = await request(app)
         .post("/api/users/signin")
         .set("Cookie", `jwtCookie=${mockJwtToken}`)
         .send(user);

      assert.equal(res.status, 401);
      assert.equal(res.body.errMessage, "Invalid email or password. Please try again.");
   });

   it("Test 'POST' /users/signup - Register a new user", async () => {
      const user = {
         name: "Draco Malfoy",
         email: "malfoy@gmail.com",
         password: "123abc",
         telephoneNum: "+44 5555555555",
      };

      const res = await request(app).post("/api/users/signup").send(user);

      assert.equal(res.status, 201);
      assert.isObject(res.body, "The response body (user) should be an object.");
      assert.property(res.body, "_id");
      assert.property(res.body, "name");
      assert.property(res.body, "email");
      assert.property(res.body, "isAdmin");
      assert.property(res.body, "telephoneNum");
      assert.property(res.body, "joinedDate");
   });

   it("Test 'POST' /users/signup - Attempt to register a new user whose credentials collide with one of the existing users'", async () => {
      await User.insertMany(users);

      const user = {
         name: "Albus dumbledore",
         email: "albus@gmail.com",
         password: "123abc",
         telephoneNum: "+44 2222222222",
      };

      const res = await request(app).post("/api/users/signup").send(user);

      assert.equal(res.status, 400);
      assert.equal(res.body.errMessage, "User already exists.");
   });

   it("Test 'POST' /users/signout - Sign out the user", async () => {
      const createdDumUsers = await User.insertMany(users);
      const existingUserId = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(existingUserId);

      const res = await request(app)
         .post("/api/users/signout")
         .set("Cookie", `jwtCookie=${mockJwtToken}`);

      assert.equal(res.status, 200);
      assert.equal(res.body.message, "User is signed out successfully.");
   });

   it("Test 'GET' /users/account-profile - Retrieve the account profile of a user when signed in", async () => {
      const createdDumUsers = await User.insertMany(users);
      const existingUserId = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(existingUserId);

      const res = await request(app)
         .get("/api/users/account-profile")
         .set("Cookie", `jwtCookie=${mockJwtToken}`);

      assert.equal(res.status, 200);
      assert.isObject(res.body, "The response body (user) should be an object.");
      assert.property(res.body, "_id");
      assert.property(res.body, "name");
      assert.property(res.body, "email");
      assert.property(res.body, "isAdmin");
      assert.property(res.body, "telephoneNum");
   });

   it("Test 'GET' /users/account-profile - Does not retrieve the account profile of a user when NOT signed in", async () => {
      await User.insertMany(users);
      const notExistingUserId = "659f0a906bf7e2fa49254d99";

      const mockJwtToken = generateJwtToken(notExistingUserId);

      const res = await request(app)
         .get("/api/users/account-profile")
         .set("Cookie", `jwtCookie=${mockJwtToken}`);

      assert.equal(res.status, 404);
      assert.equal(res.body.errMessage, "User is not found.");
   });

   it("Test 'PUT' /users/account-profile - Update the account profile of a user when signed in", async () => {
      const createdDumUsers = await User.insertMany(users);
      const existingUserId = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(existingUserId);

      const updatedUser = generateMockUser();

      const res = await request(app)
         .put("/api/users/account-profile")
         .set("Cookie", `jwtCookie=${mockJwtToken}`)
         .send(updatedUser);

      assert.equal(res.status, 200);
      assert.isObject(res.body, "The response body (user) should be an object.");
      assert.property(res.body, "_id");
      assert.property(res.body, "name");
      assert.property(res.body, "email");
      assert.property(res.body, "isAdmin");
      assert.property(res.body, "telephoneNum");
   });

   it("Test 'PUT' /users/account-profile - Does not update the account profile of a user when NOT signed in", async () => {
      await User.insertMany(users);
      const mockedUserId = "659f0a906bf7e2fa49254d99";

      const mockJwtToken = generateJwtToken(mockedUserId);

      const updatedUser = generateMockUser();

      const res = await request(app)
         .put("/api/users/account-profile")
         .set("Cookie", `jwtCookie=${mockJwtToken}`)
         .send(updatedUser);

      assert.equal(res.status, 404);
      assert.equal(res.body.errMessage, "Update unsuccessful. User not found.");
   });

   it("Test 'GET' /users/:userId/notifications - Retrieve all notifications of a signed-in user", async () => {
      const createdDumUsers = await User.insertMany(users);
      const user = createdDumUsers[1]._id;

      const sampleUserNotis = userNotifications.map((noti) => ({
         ...noti,
         user: user,
      }));

      await UserNotification.insertMany(sampleUserNotis);

      const mockJwtToken = generateJwtToken(user);

      const res = await request(app)
         .get(`/api/users/${user}/notifications`)
         .set("Cookie", `jwtCookie=${mockJwtToken}`);

      assert.equal(res.status, 200);
      assert.isArray(res.body, "The response body should be an array.");
      assert.equal(res.body.length, 2);
   });

   it("Test 'POST' /notifications/new - Create a new notification", async () => {
      const createdDumUsers = await User.insertMany(users);
      const user = createdDumUsers[1]._id;

      const noti = {
         user,
         notificationMessage: "Your order has been shipped",
         payload: { type: "Order", id: "123" },
         isGeneral: false,
      };

      const mockJwtToken = generateJwtToken(user);

      const res = await request(app)
         .post("/api/users/notifications/new")
         .set("Cookie", `jwtCookie=${mockJwtToken}`)
         .send(noti);

      assert.equal(res.status, 201);
      assert.isObject(res.body, "The response body (notification) should be an object.");
      assert.property(res.body, "notificationMessage");
      assert.property(res.body, "user");
      assert.property(res.body, "payload");
      assert.property(res.body, "isGeneral");
   });
});
