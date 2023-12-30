import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import productRoutes from "./routes/productRoutes.js";
import { resourceNotFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const port = process.env.PORT || 3001;

if (process.env.NODE_ENV !== "test") {
   connectDatabase();
}

const app = express();

app.get("/", (req, res) => {
   res.send("API is now running!!");
});

app.use("/api/products", productRoutes);

app.use(resourceNotFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
   app.listen(port, () => console.log(`Server running on port: ${port}`));
}

export default app;
