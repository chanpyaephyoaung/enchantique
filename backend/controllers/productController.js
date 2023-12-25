import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../dataModels/productModel.js";

// Retrieve all products from the database
export const getAllProducts = asyncHandler(async (req, res) => {
   const productsList = await Product.find({});
   res.json(productsList);
});

// Retrieve a single product by ID
export const getSingleProductById = asyncHandler(async (req, res) => {
   const targetProduct = await Product.findById(req.params.productId);

   // Throw error if the product is not found
   if (!targetProduct) {
      res.status(404);
      throw new Error("Resource not found@");
   } else {
      res.json(targetProduct);
   }
});
