import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../dataModels/orderModel.js";
import Stripe from "stripe";

// Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getAllOrdersByUser = asyncHandler(async (req, res) => {
   const allOrders = await Order.find({ user: req.user_id });

   res.status(200).json(allOrders);
});

export const getSingleOrderByIdByUser = asyncHandler(async (req, res) => {
   const targetUserOrder = await Order.findById(req.params.orderId).populate("user", "email");

   if (!targetUserOrder) {
      res.status(404);
      throw new Error("Requested order not found.");
   } else {
      res.status(200).json(targetUserOrder);
   }
});

export const createOrderByUser = asyncHandler(async (req, res) => {
   const {
      orderedProducts,
      totalRawItemsPrice,
      taxAmount,
      shippingAmount,
      totalAmount,
      paymentType,
      userDeliveryAddress,
   } = req.body;

   if (orderedProducts && orderedProducts.length > 0) {
      // Create new order using Order model
      const newOrder = new Order({
         orderedProducts: orderedProducts.map((ordProd) => {
            return {
               _id: undefined,
               ...ordProd,
               product: ordProd._id,
            };
         }),
         user: req.currentUser._id,
         totalRawItemsPrice,
         taxAmount,
         shippingAmount,
         totalAmount,
         paymentType,
         userDeliveryAddress,
      });

      // Save new order to database
      const savedOrder = await newOrder.save();

      res.status(201).json(savedOrder);
   } else {
      res.status(400);
      throw new Error("There are no products in the order.");
   }
});

export const checkoutOrderByUser = asyncHandler(async (req, res) => {
   const { orderedProducts, shippingAmount, taxAmount } = req.body;
   const additionalPriceInfo = [
      {
         price_data: {
            unit_amount: shippingAmount * 100,
            currency: "usd",
            product_data: {
               name: "Shipping Price",
            },
         },
         quantity: 1,
      },
      {
         price_data: {
            unit_amount: taxAmount * 100,
            currency: "usd",
            product_data: {
               name: "Tax",
            },
         },
         quantity: 1,
      },
   ];
   const products = req.body.orderedProducts.map((product) => {
      return {
         price_data: {
            unit_amount: product.price * 100,
            currency: "usd",
            product_data: {
               name: product.name,
            },
         },
         quantity: product.quantity,
      };
   });
   const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [...products, ...additionalPriceInfo],
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/",
   });

   res.json({ url: session.url });
});

export const setOrderToPaidByUser = asyncHandler(async (req, res) => {
   res.status(200).send("Order is paid.");
});
