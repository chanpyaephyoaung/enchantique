import { assert } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import { seedDummyData } from "../../backend/seeder.js";
import User from "../../backend/dataModels/userModel.js";
import users from "../../backend/data/dummyUsers.js";
import Order from "../../backend/dataModels/orderModel.js";
import Product from "../../backend/dataModels/productModel.js";
import app from "../../backend/server.js";
import jwt from "jsonwebtoken";

process.env.NODE_ENV = "test";

const createNewMockProduct = (seller) => ({
   seller,
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

const createMockOrder = async (admin, user) => {
   const product = new Product(createNewMockProduct(admin));
   const createdProduct = await product.save();

   const sampleOrderedProductInCart = {
      user,
      orderedProducts: [
         {
            name: createdProduct.name,
            quantity: 1,
            image: createdProduct.image,
            price: createdProduct.price,
            _id: undefined,
            product: createdProduct._id,
         },
      ],
      shippingAmount: 0,
      taxAmount: 0,
      totalAmount: 10,
      totalRawProductPrice: 10,
      userDeliveryAddress: {
         firstLineAddress: "45 Basking Lane",
         secondLineAddress: "Bohemian Court",
         postalCode: "Pl4 988",
         city: "Plymouth",
      },
   };
   const newOrder = new Order(sampleOrderedProductInCart);
   const savedOrder = await newOrder.save();

   return savedOrder;
};

const generateJwtToken = (userId) => {
   const jwtToken = jwt.sign({ userId }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "10d",
   });

   return jwtToken;
};

describe("Integration tests for users endpoints with database.", () => {
   beforeEach(async () => {
      await User.deleteMany({});
      await Order.deleteMany({});
   });

   afterEach(async () => {
      await User.deleteMany({});
      await Order.deleteMany({});
   });

   // it("Test 'GET' /orders/admin - Retrieve all orders by admin (With admin privilege)", async () => {
   //    const createdDumUsers = await User.insertMany(users);
   //    const admin = createdDumUsers[0]._id;
   //    const user = createdDumUsers[1]._id;

   //    const mockJwtToken = generateJwtToken(admin);

   //    await createMockOrder(admin, user);

   //    const res = await request(app)
   //       .get("/api/orders/admin")
   //       .set("Cookie", `jwtCookie=${mockJwtToken}`);

   //    assert.equal(res.status, 200);
   //    assert.isArray(res.body, "The response body should be an array.");
   //    assert.equal(res.body.length, 1);
   // });

   // it("Test 'GET' /orders/admin - Should not retrieve all orders (WITHOUT admin privilege)", async () => {
   //    const createdDumUsers = await User.insertMany(users);
   //    const admin = createdDumUsers[0]._id;
   //    const user = createdDumUsers[1]._id;

   //    const mockJwtToken = generateJwtToken(user);

   //    await createMockOrder(admin, user);

   //    const res = await request(app)
   //       .get("/api/orders/admin")
   //       .set("Cookie", `jwtCookie=${mockJwtToken}`);

   //    assert.equal(res.status, 401);
   // });

   it("Test 'PUT' /orders/admin/:orderId/shipped - Set an order to 'shipped' (With admin privilege)", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;
      const user = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(admin);

      const mockOrder = await createMockOrder(admin, user);

      assert.property(mockOrder, "hasBeenShipped");
      assert.equal(mockOrder.hasBeenShipped, false);

      const res = await request(app)
         .put(`/api/orders/admin/${mockOrder._id}/shipped`)
         .set("Cookie", `jwtCookie=${mockJwtToken}`);

      assert.equal(res.status, 200);
      assert.property(res.body, "hasBeenShipped");
      assert.property(res.body, "shippingDate");
      assert.equal(res.body.hasBeenShipped, true);
   });

   it("Test 'PUT' /orders/admin/:orderId/delivered - Set an order to 'delivered' (With admin privilege)", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;
      const user = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(admin);

      const mockOrder = await createMockOrder(admin, user);

      assert.property(mockOrder, "hasBeenDelivered");
      assert.equal(mockOrder.hasBeenDelivered, false);

      const res = await request(app)
         .put(`/api/orders/admin/${mockOrder._id}/delivered`)
         .set("Cookie", `jwtCookie=${mockJwtToken}`);

      assert.equal(res.status, 200);
      assert.property(res.body, "hasBeenDelivered");
      assert.property(res.body, "deliveryDate");
      assert.equal(res.body.hasBeenDelivered, true);
   });
});
