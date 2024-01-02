import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

userSchema.methods.comparePassword = async function (passwordInput) {
   return await bcrypt.compare(passwordInput, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
