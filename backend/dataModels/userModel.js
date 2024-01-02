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
         default: new Date(),
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

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      next();
   }

   const bcSalt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, bcSalt);
});

userSchema.methods.comparePassword = async function (passwordInput) {
   return await bcrypt.compare(passwordInput, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
