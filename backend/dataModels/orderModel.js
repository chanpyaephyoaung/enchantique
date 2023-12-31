import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      orderedProducts: [
         {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
               type: mongoose.Schema.Types.ObjectId,
               required: true,
               ref: "Product",
            },
         },
      ],
      userDeliveryAddress: {
         firstLineAddress: { type: String, required: true },
         secondLineAddress: { type: String, required: true },
         postalCode: { type: String, required: true },
         city: { type: String, required: true },
      },
      totalRawProductPrice: {
         type: Number,
         required: true,
         default: 0.0,
      },
      shippingAmount: {
         type: Number,
         required: true,
         default: 0.0,
      },
      taxAmount: {
         type: Number,
         required: true,
         default: 0.0,
      },
      totalAmount: {
         type: Number,
         required: true,
         default: 0.0,
      },
      hasBeenPaid: {
         type: Boolean,
         required: true,
         default: false,
      },
      paymentDate: {
         type: Date,
      },
      hasBeenShipped: {
         type: Boolean,
         required: true,
         default: false,
      },
      shippingDate: {
         type: Date,
      },
      hasBeenDelivered: {
         type: Boolean,
         required: true,
         default: false,
      },
      deliveryDate: {
         type: Date,
      },
   },
   { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
