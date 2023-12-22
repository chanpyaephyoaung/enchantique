import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      isAdmin: {
         type: Boolean,
         required: true,
         default: false,
      },
      joinedDate: {
         type: Date,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      telephoneNum: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
