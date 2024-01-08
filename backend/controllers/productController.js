import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../dataModels/productModel.js";

// Retrieve all products from the database
export const getAllProducts = asyncHandler(async (req, res) => {
   const productsList = await Product.find({});
   res.status(200).json(productsList);
});

// Retrieve a single product by ID
export const getSingleProductById = asyncHandler(async (req, res) => {
   const targetProduct = await Product.findById(req.params.productId);

   // Throw error if the product is not found
   if (!targetProduct) {
      res.status(404);
      throw new Error("Resource not found!");
   } else {
      res.status(200).json(targetProduct);
   }
});

// Create a new product
export const createNewProduct = asyncHandler(async (req, res) => {
   const { name, price, description, image, brandName, category } = req.body;

   const newProduct = new Product({
      name,
      price,
      seller: req.currentUser._id,
      description,
      image,
      brandName,
      category,
   });

   const savedProduct = await newProduct.save();
   res.status(201).json(savedProduct);
});

// Delete an existing product
export const deleteProduct = asyncHandler(async (req, res) => {
   const targetProduct = await Product.findById(req.body.productId);

   if (!targetProduct) {
      res.status(404);
      throw new Error("Requested product not found.");
   } else {
      await Product.deleteOne({ _id: targetProduct._id });
      res.status(204).json({ message: "Product deleted!" });
   }
});
