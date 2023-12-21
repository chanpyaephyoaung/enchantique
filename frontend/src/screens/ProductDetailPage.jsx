import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Container from "../components/UI/Container.jsx";
import Rating from "../components/UI/Rating.jsx";

const ProductDetailPage = () => {
   const [currentProduct, setcurrentProduct] = useState({});

   const { productId } = useParams();

   useEffect(() => {
      const fetchCurrentProduct = async () => {
         const { data } = await axios.get(`/api/products/${productId}`);
         setcurrentProduct(data);
      };

      fetchCurrentProduct();
   }, [productId]);

   return (
      <Container type="page">
         <Link
            to="/"
            className="inline-block transition-all rounded-full text-sm md:text-base text-clr-black py-3 px-5 border border-clr-black font-medium hover:bg-clr-primary hover:text-clr-white"
         >
            Go Back
         </Link>

         <div className="grid lg:grid-cols-2 py-8">
            <img src={currentProduct.image} alt={currentProduct.name} className="w-full" />

            <div className="grid self-start gap-y-3">
               <h2 className="text-lg md:text-xl font-medium">{currentProduct.name}</h2>

               <Rating ratingVal={currentProduct.rating} reviewsCount={currentProduct.numReviews} />

               <div>
                  <div className="mt-4 flex justify-between">
                     <div className="grid gap-y-2">
                        <p className="text-sm md:text-base font-medium">PRICE</p>
                        <p className="text-base md:text-xl font-semibold text-clr-primary">
                           ${currentProduct.price}
                        </p>
                     </div>

                     <div className="grid gap-y-2">
                        <p className="text-sm md:text-base font-medium">STATUS</p>
                        <p
                           className={`text-base md:text-xl font-semibold ${
                              currentProduct.countInStock === 0
                                 ? "text-clr-danger"
                                 : "text-clr-primary"
                           } `}
                        >
                           {currentProduct.countInStock === 0 ? "Out Of Stock" : "In Stock"}
                        </p>
                     </div>
                  </div>
                  <div className="mt-3 w-full h-[0.5px] bg-clr-gray">&nbsp;</div>
               </div>

               <div className="grid gap-y-2">
                  <p className="text-sm md:text-base font-medium">DESCRIPTION</p>
                  <p className="text-sm md:text-base font-semibol">{currentProduct.description}</p>
               </div>

               <button
                  type="button"
                  disabled={currentProduct.countInStock === 0}
                  className="mt-4 rounded-full inline-block justify-self-start text-clr-primary text-base md:text-lg font-medium py-2 px-4 border disabled:bg-clr-black-faded disabled:cursor-not-allowed disabled:text-clr-gray disabled:border-clr-gray border-clr-primary hover:bg-clr-primary hover:text-white transition-all"
               >
                  Add to Cart
               </button>
            </div>
         </div>
      </Container>
   );
};
export default ProductDetailPage;
