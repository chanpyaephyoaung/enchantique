import { useGetAllProductsQuery } from "../../slices/productsApiSlice.js";
import ProductPreview from "./ProductPreview.jsx";

const ProductList = () => {
   const { data: products, error, isLoading } = useGetAllProductsQuery();

   return (
      <>
         {isLoading ? (
            <h2>Please wait...</h2>
         ) : error ? (
            <h2>{error?.data?.message || error.error}</h2>
         ) : (
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
         )}
      </>
   );
};
export default ProductList;
