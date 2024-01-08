import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../dataModels/orderModel.js";

export const getAllUsersOrdersByAdmin = asyncHandler(async (req, res) => {
   const allUsersOrders = await Order.find({}).populate("user", "id email name telephoneNum");
   res.status(200).json(allUsersOrders);
});

export const setOrderToShippedByAdmin = asyncHandler(async (req, res) => {
   const targetOrder = await Order.findById(req.params.orderId);

   if (!targetOrder) {
      res.status(404);
      throw new Error("Requested order not found.");
   } else {
      targetOrder.hasBeenShipped = true;
      targetOrder.shippingDate = Date.now();

      const shippedOrder = await targetOrder.save();

      res.status(200).json(shippedOrder);
   }
});

export const setOrderToDeliveredByAdmin = asyncHandler(async (req, res) => {
   const targetOrder = await Order.findById(req.params.orderId);

   if (!targetOrder) {
      res.status(404);
      throw new Error("Requested order not found.");
   } else {
      targetOrder.hasBeenDelivered = true;
      targetOrder.deliveryDate = Date.now();

      const deliveredOrder = await targetOrder.save();

      res.status(200).json(deliveredOrder);
   }
});
