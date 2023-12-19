import products from "../../dummyProducts.js";
import Container from "../UI/Container.jsx";
import ProductPreview from "./ProductPreview.jsx";

const ProductList = () => {
   return (
      <div className="mt-10">
         <Container>
            <div className="grid gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
               {products.map((product) => (
                  <ProductPreview
                     key={product._id}
                     name={product.name}
                     imagePath={product.image}
                     price={product.price}
                     rating={product.rating}
                     ratingCount={product.numReviews}
                  />
               ))}
            </div>
         </Container>
      </div>
   );
};
export default ProductList;
