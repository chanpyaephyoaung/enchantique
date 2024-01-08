import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDatabase from "./config/database.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import userOrderRoutes from "./routes/userOrderRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import { resourceNotFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const port = process.env.PORT || 3001;

if (process.env.NODE_ENV !== "test") {
   connectDatabase();
}

const app = express();

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

if (process.env.NODE_ENV !== "test") {
   app.listen(port, () => console.log(`Server running on port: ${port}`));
}

export default app;
