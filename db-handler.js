import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer = null;

export const connect = async () => {
   mongoServer = await MongoMemoryServer.create();
   console.log(mongoServer);
   console.log("Hello Connection");

   await mongoose.connect(mongoServer.getUri());
};

export const closeDB = async () => {
   await mongoose.connection.dropDatabase();
   await mongoose.connection.close();
   if (mongoServer) {
      await mongoServer.stop();
   }
};

export const clearDB = async () => {
   const collections = mongoose.connection.collections;

   for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
   }
};
