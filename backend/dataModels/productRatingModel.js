import mongoose from "mongoose";

const productRatingSchema = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      userName: {
         type: String,
         required: true,
      },
      rating: {
         type: Number,
         required: true,
      },
      ratedProduct: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "Product",
      },
   },
   { timestamps: true }
);

const ProductRating = mongoose.model("ProductRating", productRatingSchema);

export default ProductRating;
