import { assert } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import Product from "../../backend/dataModels/productModel.js";
import { seedDummyData } from "../../backend/seeder.js";
import User from "../../backend/dataModels/userModel.js";
import users from "../../backend/data/dummyUsers.js";
import Order from "../../backend/dataModels/orderModel.js";
import orders from "../../backend/data/dummyOrders.js";
import products from "../../backend/data/dummyProducts.js";
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

const createSampleOrders = (prod, user) => {
   return orders.map((order) => ({
      orderedProducts: [
         {
            name: prod.name,
            quantity: 1,
            image: prod.image,
            price: prod.price,
            _id: undefined,
            product: prod._id,
         },
      ],
      ...order,
      user: user,
   }));
};

const generateJwtToken = (userId) => {
   const jwtToken = jwt.sign({ userId }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "10d",
   });

   return jwtToken;
};

describe("Integration tests for orders endpoints with database.", () => {
   beforeEach(async () => {
      await Product.deleteMany({});
      await User.deleteMany({});
      await Order.deleteMany({});
   });

   afterEach(async () => {
      await Product.deleteMany({});
      await User.deleteMany({});
      await Order.deleteMany({});
   });

   it("Test 'GET' /orders/my-orders - Retreive all orders of a user (Only when signed in)", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;
      const user = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(user);

      const product = new Product(createNewMockProduct(admin));
      const createdProduct = await product.save();

      const sampleOrders = createSampleOrders(createdProduct, user);
      await Order.insertMany(sampleOrders);

      const res = await request(app)
         .get(`/api/orders/my-orders`)
         .set("Cookie", `jwtCookie=${mockJwtToken}`);

      assert.equal(res.status, 200);
      assert.isArray(res.body, "The response body should be an array.");
      assert.equal(res.body.length, 2);
   });

   it("Test 'GET' /orders/my-orders - Should not retreive all orders of a user (NOT signed in)", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;
      const user = createdDumUsers[1]._id;

      const product = new Product(createNewMockProduct(admin));
      const createdProduct = await product.save();

      const sampleOrders = createSampleOrders(createdProduct, user);
      await Order.insertMany(sampleOrders);

      const res = await request(app).get(`/api/orders/my-orders`);

      assert.equal(res.status, 401);
   });

   it("Test 'GET' /orders/:orderId - Retreive a single order by ID (Only when signed in)", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;
      const user = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(user);

      const product = new Product(createNewMockProduct(admin));
      const createdProduct = await product.save();

      const sampleOrders = createSampleOrders(createdProduct, user);
      const createdOrders = await Order.insertMany(sampleOrders);

      const sampleCreatedOrderId = createdOrders[0]._id;

      const res = await request(app)
         .get(`/api/orders/${sampleCreatedOrderId}`)
         .set("Cookie", `jwtCookie=${mockJwtToken}`);

      assert.equal(res.status, 200);
      assert.isObject(res.body, "The response order should be an object.");
      assert.property(res.body, "userDeliveryAddress");
      assert.property(res.body, "_id");
      assert.property(res.body, "user");
      assert.property(res.body, "orderedProducts");
      assert.property(res.body, "totalRawProductPrice");
      assert.property(res.body, "shippingAmount");
      assert.property(res.body, "taxAmount");
      assert.property(res.body, "hasBeenPaid");
      assert.property(res.body, "hasBeenShipped");
      assert.property(res.body, "hasBeenDelivered");
   });

   it("Test 'GET' /orders/:orderId - Should not retreive a single order by ID if the order requested does not exist", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;
      const user = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(user);

      const product = new Product(createNewMockProduct(admin));
      const createdProduct = await product.save();

      const sampleOrders = createSampleOrders(createdProduct, user);
      await Order.insertMany(sampleOrders);

      const sampleCreatedOrderId = "659f3c3de3fcf0c74b1fa999";

      const res = await request(app)
         .get(`/api/orders/${sampleCreatedOrderId}`)
         .set("Cookie", `jwtCookie=${mockJwtToken}`);

      assert.equal(res.status, 404);
      assert.equal(res.body.errMessage, "Requested order not found.");
   });

   it("Test 'GET' /orders/:orderId - Should not retreive a single order by ID of a user (NOT signed in)", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;
      const user = createdDumUsers[1]._id;

      const product = new Product(createNewMockProduct(admin));
      const createdProduct = await product.save();

      const sampleOrders = createSampleOrders(createdProduct, user);
      const createdOrders = await Order.insertMany(sampleOrders);

      const sampleCreatedOrderId = createdOrders[0]._id;

      const res = await request(app).get(`/api/orders/${sampleCreatedOrderId}`);

      assert.equal(res.status, 401);
   });

   it("Test 'GET' /orders/my-orders - Retreive all orders of a user (Only when signed in)", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;
      const user = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(user);

      const product = new Product(createNewMockProduct(admin));
      const createdProduct = await product.save();

      const sampleOrders = createSampleOrders(createdProduct, user);
      await Order.insertMany(sampleOrders);

      const res = await request(app)
         .get(`/api/orders/my-orders`)
         .set("Cookie", `jwtCookie=${mockJwtToken}`);

      assert.equal(res.status, 200);
      assert.isArray(res.body, "The response body should be an array.");
      assert.equal(res.body.length, 2);
   });

   it("Test 'POST' /orders - Create a new order", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;
      const user = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(user);

      const product = new Product(createNewMockProduct(admin));
      const createdProduct = await product.save();

      const sampleOrderedProductInCart = {
         orderedProducts: [
            {
               name: createdProduct.name,
               quantity: 1,
               image: createdProduct.image,
               price: createdProduct.price,
               _id: createdProduct._id,
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

      const res = await request(app)
         .post(`/api/orders`)
         .set("Cookie", `jwtCookie=${mockJwtToken}`)
         .send(sampleOrderedProductInCart);

      assert.equal(res.status, 201);
      assert.isObject(res.body, "The response body should be an object.");
      assert.property(res.body, "user");
      assert.property(res.body, "orderedProducts");
      assert.property(res.body, "userDeliveryAddress");
      assert.property(res.body, "totalRawProductPrice");
      assert.property(res.body, "shippingAmount");
      assert.property(res.body, "totalAmount");
      assert.property(res.body, "hasBeenPaid");
      assert.property(res.body, "hasBeenShipped");
      assert.property(res.body, "hasBeenDelivered");
   });

   it("Test 'POST' /orders/pay - Proceed to checkout", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;
      const user = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(user);

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

      const res = await request(app)
         .post(`/api/orders/pay`)
         .set("Cookie", `jwtCookie=${mockJwtToken}`)
         .send({
            orderedProducts: savedOrder.orderedProducts,
            shippingAmount: savedOrder.shippingAmount,
            taxAmount: savedOrder.taxAmount,
            orderId: savedOrder._id,
         });

      assert.equal(res.status, 201);
      assert.property(res.body, "url");
   });

   it("Test 'POST' /orders/:orderId/pay - Cancel order", async () => {
      const createdDumUsers = await User.insertMany(users);
      const admin = createdDumUsers[0]._id;
      const user = createdDumUsers[1]._id;

      const mockJwtToken = generateJwtToken(user);

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

      const res = await request(app)
         .post(`/api/orders/${savedOrder._id}/cancel`)
         .set("Cookie", `jwtCookie=${mockJwtToken}`);

      assert.equal(res.status, 200);
      assert.equal(res.body.message, "Order Canceled");
   });
});
