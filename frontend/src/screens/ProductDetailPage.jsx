import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
   useGetSingleProductDetailsQuery,
   useGiveProductRatingByUserMutation,
} from "../slices/productsApiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/UI/Container.jsx";
import Rating from "../components/UI/Rating.jsx";
import { generateSeriesOfNums } from "../helpers/mathHelpers.js";
import { addProductToCart } from "../slices/shoppingCartSlice.js";

const ProductDetailPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { userAccInfo } = useSelector((state) => state.authUser);
   const { productId } = useParams();

   const [prodQuantity, setProdQuantity] = useState(1);
   const [prodRating, setProdRating] = useState(0);
   const [err, setErr] = useState("");

   const {
      data: currentProduct,
      error: fetchCurProdError,
      isLoading,
      refetch,
   } = useGetSingleProductDetailsQuery(productId);

   const [giveProductRatingByUser, { error: ratingError, isLoading: loadingRating }] =
      useGiveProductRatingByUserMutation();

   const addProductToCartHandler = () => {
      dispatch(addProductToCart({ ...currentProduct, quantity: prodQuantity }));
      navigate("/shopping-cart");
   };

   const submitRatingHandler = async (e) => {
      e.preventDefault();
      if (!prodRating) return;
      try {
         const data = {
            productId,
            prodRating,
         };
         console.log(productId, prodRating, data);
         await giveProductRatingByUser(data);
         refetch();
      } catch (err) {
         setErr(err?.data?.errMessage || err.error);
      }
   };

   let contentMarkup = "";

   if (isLoading) {
      contentMarkup = <h2 className="mt-8">Please wait...</h2>;
   } else if (fetchCurProdError) {
      setErr(fetchCurProdError?.data?.errMessage || fetchCurProdError.error);
      contentMarkup = <h2 className="text-clr-danger mt-8">{err}</h2>;
   } else {
      contentMarkup = (
         <div className="grid lg:grid-cols-2 py-8 gap-6">
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
                              currentProduct.stocksCount === 0
                                 ? "text-clr-danger"
                                 : "text-clr-primary"
                           } `}
                        >
                           {currentProduct.stocksCount === 0 ? "Out Of Stock" : "In Stock"}
                        </p>
                     </div>
                  </div>
                  <div className="mt-3 w-full h-[0.5px] bg-clr-gray">&nbsp;</div>
               </div>

               <div className="grid gap-y-2">
                  <p className="text-sm md:text-base font-medium">DESCRIPTION</p>
                  <p className="text-sm md:text-base font-semibol">{currentProduct.description}</p>
               </div>

               {currentProduct.stocksCount > 0 && (
                  <div className="grid gap-y-2">
                     <p className="text-sm md:text-base font-medium">QUANTITY</p>
                     <select
                        className="justify-self-start p-2 border border-clr-black-faded"
                        name="quantity"
                        id="quantity"
                        value={prodQuantity}
                        onChange={(e) => setProdQuantity(+e.target.value)}
                     >
                        {generateSeriesOfNums(currentProduct.stocksCount).map((i) => (
                           <option key={i + 1} value={i + 1}>
                              {i + 1}
                           </option>
                        ))}
                     </select>
                  </div>
               )}
               {!userAccInfo?.isAdmin && (
                  <>
                     <button
                        data-testid="addToCartBtn"
                        onClick={addProductToCartHandler}
                        type="button"
                        disabled={currentProduct.stocksCount === 0}
                        className="mt-4 rounded-full inline-block justify-self-start text-clr-primary text-base md:text-lg font-medium py-2 px-4 border disabled:bg-clr-black-faded disabled:cursor-not-allowed disabled:text-clr-gray disabled:border-clr-gray border-clr-primary hover:bg-clr-primary hover:text-white transition-all"
                     >
                        Add to Cart
                     </button>
                  </>
               )}

               {userAccInfo && !userAccInfo.isAdmin && (
                  <>
                     <div className="mt-3 w-full h-[0.5px] bg-clr-gray">&nbsp;</div>

                     <form onSubmit={submitRatingHandler}>
                        <div className="grid gap-y-2">
                           <p className="text-sm md:text-base font-medium">Give Rating</p>
                           <select
                              className="justify-self-start p-2 border border-clr-black-faded"
                              name="quantity"
                              id="quantity"
                              value={prodRating}
                              onChange={(e) => setProdRating(+e.target.value)}
                           >
                              <option value="">Select...</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                           </select>
                        </div>

                        <button
                           type="submit"
                           className="mt-4 rounded-full inline-block justify-self-start text-clr-primary text-base md:text-lg font-medium py-2 px-4 border disabled:bg-clr-black-faded disabled:cursor-not-allowed disabled:text-clr-gray disabled:border-clr-gray border-clr-primary hover:bg-clr-primary hover:text-white transition-all"
                        >
                           Submit
                        </button>
                        {loadingRating && (
                           <h2 className="mt-2 text-clr-black">Saving your rating...</h2>
                        )}
                        {ratingError && (
                           <h2 className="mt-2 text-clr-danger">
                              {ratingError?.data?.errMessage || ratingError.error}
                           </h2>
                        )}
                     </form>
                  </>
               )}
            </div>
         </div>
      );
   }

   return (
      <Container type="page">
         <Link
            to="/"
            className="inline-block transition-all rounded-full text-sm md:text-base text-clr-black py-3 px-5 border border-clr-black font-medium hover:bg-clr-primary hover:text-clr-white"
         >
            Go Back
         </Link>

         {contentMarkup}
      </Container>
   );
};
export default ProductDetailPage;
