import express from "express";
import dotenv from "dotenv";
import { createServer } from "node:http";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDatabase from "./config/database.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import userOrderRoutes from "./routes/userOrderRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import { resourceNotFound, errorHandler } from "./middleware/errorMiddleware.js";
import { Server } from "socket.io";

dotenv.config();

const port = process.env.PORT || 3001;

if (process.env.NODE_ENV !== "test") {
   connectDatabase();
}

const app = express();
const server = createServer(app);

// Cors
app.use(cors());

// Socket IO
const io = new Server(server, {
   cors: {
      origin: "http://localhost:3000",
   },
});

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

app.get("/", (req, res) => {
   res.send("API is now running!!");
});

app.use("/api/products", productRoutes);
app.use("/api/users/admin", adminUserRoutes);
app.use("/api/orders/admin", adminOrderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", userOrderRoutes);

app.use(resourceNotFound);
app.use(errorHandler);

let onlineUsersList = [];

const addNewOnlineUser = (userId, socketId) => {
   if (!onlineUsersList.some((user) => user.userId === userId)) {
      onlineUsersList.push({ userId, socketId });
   }
};

const removeOnlineUser = (socketId) => {
   onlineUsersList = onlineUsersList.filter((user) => user.socketId !== socketId);
};

const removeNullOnlineUser = () => {
   onlineUsersList = onlineUsersList.filter((user) => user.userId !== null);
};

const getUser = (userId) => {
   return onlineUsersList.find((user) => user.userId === userId);
};

io.on("connection", async (socket) => {
   console.log("a user connected!", socket.id);
   socket.on("newUser", (userId) => {
      addNewOnlineUser(userId, socket.id);
      removeNullOnlineUser();
      console.log(onlineUsersList);
   });

   socket.on("sendShipOrderNoti", ({ buyerId, orderId }) => {
      const buyer = getUser(buyerId);
      console.log("Buyer", buyer, "BuyerId: ", buyerId);
      socket.to(buyer?.socketId).emit("getShipOrderNoti", {
         message: `Your Order (${orderId}) has been shipped!`,
         payload: orderId,
      });
   });

   socket.on("sendDeliverOrderNoti", ({ buyerId, orderId }) => {
      const buyer = getUser(buyerId);
      console.log("Buyer", buyer, "BuyerId: ", buyerId);
      socket.to(buyer?.socketId).emit("getDeliverOrderNoti", {
         message: `Your Order (${orderId}) has been delivered!`,
         payload: orderId,
      });
   });

   socket.on("sendCreateNewProductNoti", ({ productId }) => {
      socket.broadcast.emit("getCreateNewProductNoti", {
         message: "A new product has been added to the store!",
         payload: productId,
      });
   });

   socket.on("disconnect", () => {
      removeOnlineUser(socket.id);
   });
});

if (process.env.NODE_ENV !== "test") {
   server.listen(port, () => console.log(`Server running on port: ${port}`));
}

export default app;
