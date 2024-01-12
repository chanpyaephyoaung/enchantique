import { assert } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import { seedDummyData } from "../../backend/seeder.js";
import User from "../../backend/dataModels/userModel.js";
import users from "../../backend/data/dummyUsers.js";
import app from "../../backend/server.js";
import jwt from "jsonwebtoken";

process.env.NODE_ENV = "test";

const generateJwtToken = (userId) => {
   const jwtToken = jwt.sign({ userId }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "10d",
   });

   return jwtToken;
};

describe("Integration tests for ADMIN USERS endpoints with database.", () => {
   beforeEach(async () => {
      await User.deleteMany({});
   });

   afterEach(async () => {
      await User.deleteMany({});
   });

   it("Test 'GET' /users/admin - Retrieve all users by admin (With admin privilege)", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;

      const mockJwtToken = generateJwtToken(admin);

      const res = await request(app)
         .get("/api/users/admin")
         .set("Cookie", `jwtCookie=${mockJwtToken}`);

      assert.equal(res.status, 200);
      assert.isArray(res.body, "The response body should be an array.");
      assert.equal(res.body.length, 3);
   });

   it("Test 'GET' /users/admin - Should not retrieve all users (WITHOUT admin privilege)", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(admin);

      const res = await request(app)
         .get("/api/users/admin")
         .set("Cookie", `jwtCookie=${mockJwtToken}`);

      assert.equal(res.status, 401);
   });

   it("Test 'DELETE' /users/admin/:userId - Delete a user (With admin privilege)", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;
      const userId = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(admin);

      const res = await request(app)
         .delete(`/api/users/admin/${userId}`)
         .set("Cookie", `jwtCookie=${mockJwtToken}`)
         .send({ userId });

      assert.equal(res.status, 204);
   });

   it("Test 'DELETE' /users/admin/:userId - Should not delete a user (WIHTOUT admin privilege)", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;
      const userId = createdDumUsers[1]._id;
      const userId2 = createdDumUsers[2]._id;

      const mockJwtToken = generateJwtToken(userId);

      const res = await request(app)
         .delete(`/api/users/admin/${userId2}`)
         .set("Cookie", `jwtCookie=${mockJwtToken}`)
         .send({ userId2 });

      assert.equal(res.status, 401);
   });
});
