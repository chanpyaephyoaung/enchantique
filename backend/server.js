import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
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

app.get("/", (req, res) => {
   res.send("API is now running!!");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users/admin", adminUserRoutes);

app.use(resourceNotFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
   app.listen(port, () => console.log(`Server running on port: ${port}`));
}

export default app;
