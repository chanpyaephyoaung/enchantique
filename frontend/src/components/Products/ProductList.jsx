import products from "../../dummyProducts.js";
import ProductPreview from "./ProductPreview.jsx";

const ProductList = () => {
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
