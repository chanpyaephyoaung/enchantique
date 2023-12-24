import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const port = process.env.PORT || 3001;

connectDatabase();

const app = express();

app.get("/", (req, res) => {
   res.send("API is now running!!");
});

app.use("/api/products", productRoutes);

app.listen(port, () => console.log(`Server running o0n port: ${port}`));
