import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
   {
      seller: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      name: {
         type: String,
         required: true,
      },
      price: {
         type: Number,
         required: true,
         default: 0,
      },
      description: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         required: true,
      },
      brandName: {
         type: String,
         required: true,
      },
      category: {
         type: String,
         required: true,
      },
      rating: {
         type: Number,
         required: true,
         default: 0,
      },
      reviewsCount: {
         type: Number,
         required: true,
         default: 0,
      },
      stocksCount: {
         type: Number,
         required: true,
         default: 20,
      },
      createdDate: {
         type: Date,
      },
   },
   { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
