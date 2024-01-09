import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../dataModels/productModel.js";
import ProductRating from "../dataModels/productRatingModel.js";

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

// Give a product rating
export const giveProductRating = asyncHandler(async (req, res) => {
   const { prodRating: rating } = req.body;
   const targetProduct = await Product.findById(req.params.productId);

   if (!targetProduct) {
      res.status(404);
      throw new Error("Requested product not found.");
   } else {
      const allRatingsOfCurrentProd = await ProductRating.find({ ratedProduct: targetProduct._id });

      const alreadyRatedByCurrentUser = allRatingsOfCurrentProd.find(
         (rating) => rating.user.toString() === req.currentUser._id.toString()
      );

      if (alreadyRatedByCurrentUser) {
         res.status(400);
         throw new Error("You have already rated this product.");
      } else {
         const newRating = new ProductRating({
            user: req.currentUser._id,
            userName: req.currentUser.name,
            rating: Number(rating),
            ratedProduct: targetProduct._id,
         });

         await newRating.save();

         const updatedAllRatingsOfCurrentProd = await ProductRating.find({
            ratedProduct: targetProduct._id,
         });

         targetProduct.ratings.push(newRating);
         const ratingsCount = targetProduct.ratings.length;

         const averageRating =
            updatedAllRatingsOfCurrentProd.reduce((acc, curRating) => acc + curRating.rating, 0) /
            ratingsCount;

         targetProduct.rating = +averageRating.toFixed(1);

         await targetProduct.save();
         res.status(201).json({ message: "New rating given." });
      }
   }
});
