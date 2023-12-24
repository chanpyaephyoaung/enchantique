import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../dataModels/productModel.js";

const router = express.Router();

router.get(
   "/",
   asyncHandler(async (req, res) => {
      const productsList = await Product.find({});
      res.json(productsList);
   })
);

router.get(
   "/:productId",
   asyncHandler(async (req, res) => {
      const targetProduct = await Product.findById(req.params.productId);

      if (!targetProduct) {
         return res.status(404).json({ messsage: "Product not found!" });
      } else {
         res.json(targetProduct);
      }
   })
);

export default router;
