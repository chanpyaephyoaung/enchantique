import { useState, useEffect } from "react";
import axios from "axios";
import ProductPreview from "./ProductPreview.jsx";

const ProductList = () => {
   const [products, setProducts] = useState([]);
   console.log(products);

   useEffect(() => {
      const fetchAllProducts = async () => {
         const { data } = await axios.get("/api/products");
         setProducts(data);
      };

      fetchAllProducts();
   }, []);

   return (
      <div className="grid gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
         {products.map((product) => (
            <ProductPreview
               key={product._id}
               id={product._id}
               name={product.name}
               imagePath={product.image}
               price={product.price}
               rating={product.rating}
               reviewsCount={product.numReviews}
            />
         ))}
      </div>
   );
};
export default ProductList;
