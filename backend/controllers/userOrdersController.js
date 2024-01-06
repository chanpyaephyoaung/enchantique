import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../dataModels/orderModel.js";

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
         user: req.user._id,
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
      throw new Error("There is no products in the order.");
   }
});

export const setOrderToPaidByUser = asyncHandler(async (req, res) => {
   res.status(200).send("Order is paid.");
});
