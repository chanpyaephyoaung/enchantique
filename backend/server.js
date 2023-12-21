import express from "express";
import products from "./dummyProducts.js";
const port = 3001;

const app = express();

app.get("/", (req, res) => {
   res.send("API is now running!!");
});

app.get("/api/products", (req, res) => {
   res.json(products);
});

app.get("/api/products/:productId", (req, res) => {
   const product = products.find((product) => product._id === req.params.productId);
   res.json(product);
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
