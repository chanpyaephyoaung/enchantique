import { useEffect } from "react";
import { useGetAllProductsQuery } from "../../slices/productsApiSlice.js";
import ProductPreview from "./ProductPreview.jsx";

const ProductList = () => {
   const { data: products, error, isLoading, refetch } = useGetAllProductsQuery();
   console.log("Loading: ", isLoading);

   let contentMarkup = "";

   useEffect(() => {
      refetch();
   }, [refetch]);

   if (isLoading) {
      contentMarkup = <h2>Please wait...</h2>;
   } else if (error) {
      contentMarkup = <h2 className="text-clr-danger">{error?.data?.errMessage || error.error}</h2>;
   } else {
      contentMarkup = (
         <div className="grid gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
               <ProductPreview
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  imagePath={product.image}
                  price={product.price}
                  rating={product.rating}
               />
            ))}
         </div>
      );
   }

   return contentMarkup;
};
export default ProductList;
