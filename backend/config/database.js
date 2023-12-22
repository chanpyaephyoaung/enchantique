import mongoose from "mongoose";

export default async () => {
   try {
      const connection = await mongoose.connect(process.env.MONGOATLAS_URI);
      console.log(`MONGODB ATLAS Connected: ${connection.connection.host}`);
   } catch (err) {
      console.log(`Error occurred: ${err.message}`);
      process.exit(1);
   }
};
