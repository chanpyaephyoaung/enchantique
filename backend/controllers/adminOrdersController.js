import asyncHandler from "../middleware/asyncHandler.js";

export const getAllUsersOrdersByAdmin = asyncHandler(async (req, res) => {
   res.status(200).send("Get all users' orders.");
});

export const setOrderToDeliveredByAdmin = asyncHandler(async (req, res) => {
   res.status(200).send("Order is delivered.");
});
