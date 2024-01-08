import { Link, useNavigate } from "react-router-dom";
import Container from "../components/UI/Container.jsx";
import { useDispatch, useSelector } from "react-redux";
import { generateSeriesOfNums } from "../helpers/mathHelpers.js";
import {
   addProductToCart,
   removeProductFromCart,
   removeAllProductsFromCart,
} from "../slices/shoppingCartSlice.js";
import {
   useCreateNewOrderByUserMutation,
   useMakeOrderPaymentMutation,
} from "../slices/ordersApiSlice.js";

const CheckoutPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const {
      productsInCart,
      shippingAmount,
      taxAmount,
      totalRawProductPrice,
      totalAmount,
      userDeliveryAddress,
   } = useSelector((state) => state.shoppingCart);

   const [createNewOrderByUser] = useCreateNewOrderByUserMutation();
   const [makeOrderPayment] = useMakeOrderPaymentMutation();

   // Adding product to cart
   const addProductToShoppingCartHandler = (product, quantity) => {
      const updatedProduct = { ...product, quantity };
      dispatch(addProductToCart(updatedProduct));
   };

   // Removing existing product from cart
   const removeProductFromShoppingCartHandler = (id) => {
      dispatch(removeProductFromCart({ id }));
   };

   const checkoutHandler = async () => {
      if (!userDeliveryAddress || Object.keys(userDeliveryAddress).length === 0) {
         navigate("/shipping");
         return;
      }
      const order = {
         orderedProducts: productsInCart,
         userDeliveryAddress,
         shippingAmount,
         taxAmount,
         totalRawProductPrice,
         totalAmount,
      };

      const res = await createNewOrderByUser(order).unwrap();
      const { url } = await makeOrderPayment({
         ...order,
         orderId: res._id,
      }).unwrap();

      // Open stripe pre-built checkout
      window.open(url, "_self");

      // Remove all products from cart
      dispatch(removeAllProductsFromCart());
   };

   return (
      <Container type="page">
         <h2 className="text-xl text-clr-black md:text-3xl font-medium mb-9">Checkout Page</h2>

         <div className="grid grid-cols-3 sm:grid-cols-4 py-4 gap-4 justify-items-center border-b border-clr-black-faded">
            <h2 className="w-full col-span-1 text-sm md:text-xl font-semibold text-clr-black">
               1 - Delivery
            </h2>
            <div className="w-full grid col-span-2 sm:col-span-3 self-start">
               {!userDeliveryAddress ? (
                  <p className="grid gap-y-2 text-sm md:text-lg font-normal text-clr-black">
                     Please set your delivery address using the link below.
                     <Link
                        to="/shipping"
                        className="text-sm md:text-base font-light text-clr-primary hover:underline"
                     >
                        Set delivery address
                     </Link>
                  </p>
               ) : (
                  <>
                     <p className="text-sm md:text-lg font-normal text-clr-black">
                        {userDeliveryAddress.firstLineAddress}
                     </p>
                     <p className="text-sm md:text-lg font-normal text-clr-black">
                        {userDeliveryAddress.secondLineAddress}
                     </p>
                     <p className="text-sm md:text-lg font-normal text-clr-black">
                        {userDeliveryAddress.postalCode}
                     </p>
                     <p className="text-sm md:text-lg font-normal text-clr-black">
                        {userDeliveryAddress.city}
                     </p>
                     <Link
                        to="/shipping"
                        className="mt-2 text-sm md:text-base font-light text-clr-primary hover:underline"
                     >
                        Update delivery address
                     </Link>
                  </>
               )}
            </div>
         </div>

         <div className="grid gap-y-6">
            <h2 className="mt-4 w-full col-span-1 text-sm md:text-xl font-semibold text-clr-black">
               2 - Review Items
            </h2>
            {productsInCart.map((prod) => (
               <div
                  key={prod._id}
                  className="grid grid-cols-3 sm:grid-cols-4 py-4 gap-y-4 gap-x-8 justify-items-center border-b border-clr-black-faded"
               >
                  <Link to={`/product/${prod._id}`} className="w-full col-span-1 mx-auto block">
                     <img src={prod.image} alt={prod.name} />
                  </Link>
                  <div className="w-full grid col-span-2 sm:col-span-3 self-start">
                     <div className="grid gap-y-2">
                        <Link
                           to={`/product/${prod._id}`}
                           className="text-sm md:text-lg font-medium text-clr-black"
                        >
                           {prod.name}
                        </Link>
                        <p className="text-sm md:text-lg font-semibold text-clr-primary">
                           ${prod.price}
                        </p>
                        {prod.stocksCount > 0 && (
                           <div className="grid">
                              <select
                                 className="justify-self-start p-1 border border-clr-black-faded"
                                 name="quantity"
                                 id="quantity"
                                 value={prod.quantity}
                                 onChange={(e) =>
                                    addProductToShoppingCartHandler(prod, +e.target.value)
                                 }
                              >
                                 {generateSeriesOfNums(prod.stocksCount).map((i) => (
                                    <option key={i + 1} value={i + 1}>
                                       {i + 1}
                                    </option>
                                 ))}
                              </select>
                           </div>
                        )}
                        <Link
                           onClick={() => removeProductFromShoppingCartHandler(prod._id)}
                           className="text-sm md:text-lg font-light text-clr-black hover:text-clr-primary hover:underline"
                        >
                           Remove
                        </Link>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         <div className="grid gap-y-6 mt-6">
            <div className="justify-self-center text-center grid gap-y-2">
               <p className="text-sm md:text-xl font-medium text-clr-black">
                  Total Products Price:
               </p>
               <p className="text-sm md:text-2xl font-semibold text-clr-primary">
                  ${totalRawProductPrice}
               </p>
            </div>

            <div className="justify-self-center text-center grid gap-y-2">
               <p className="text-sm md:text-xl font-medium text-clr-black">Tax Amount:</p>
               <p className="text-sm md:text-2xl font-semibold text-clr-primary">${taxAmount}</p>
            </div>

            <div className="justify-self-center text-center grid gap-y-2">
               <p className="text-sm md:text-xl font-medium text-clr-black">Shipping Amount:</p>
               <p className="text-sm md:text-2xl font-semibold text-clr-primary">
                  ${shippingAmount}
               </p>
            </div>

            <div className="justify-self-center text-center pb-4 grid gap-y-2">
               <p className="text-sm md:text-xl font-medium text-clr-black">
                  Subtotal ({productsInCart.reduce((acc, product) => acc + product.quantity, 0)})
                  items:
               </p>
               <p className="text-sm md:text-2xl font-semibold text-clr-primary">${totalAmount}</p>
               <button
                  onClick={checkoutHandler}
                  type="button"
                  disabled={productsInCart.length === 0}
                  className="justify-self-center mt-4 rounded-full inline-block text-clr-primary text-base md:text-lg font-medium py-2 px-8 border disabled:bg-clr-black-faded disabled:cursor-not-allowed disabled:text-clr-gray disabled:border-clr-gray border-clr-primary hover:bg-clr-primary hover:text-white transition-all"
               >
                  Place Order
               </button>
            </div>
         </div>
      </Container>
   );
};
export default CheckoutPage;
