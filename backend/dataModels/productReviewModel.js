import mongoose from "mongoose";

const productReviewSchema = mongoose.Schema(
   {
      reviewer: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      name: {
         type: String,
         required: true,
      },
      rating: {
         type: Number,
         required: true,
      },
   },
   { timestamps: true }
);

const ProductReview = mongoose.model("ProductReview", productReviewSchema);

export default ProductReview;
