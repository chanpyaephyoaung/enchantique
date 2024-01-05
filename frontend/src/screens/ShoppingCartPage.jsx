import { Link, useNavigate } from "react-router-dom";
import Container from "../components/UI/Container.jsx";
import { useDispatch, useSelector } from "react-redux";
import { generateSeriesOfNums } from "../helpers/mathHelpers.js";
import { addProductToCart, removeProductFromCart } from "../slices/shoppingCartSlice.js";

const ShoppingCartScreen = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { productsInCart, totalAmount } = useSelector((state) => state.shoppingCart);

   // Adding product to cart
   const addProductToShoppingCartHandler = (product, quantity) => {
      const updatedProduct = { ...product, quantity };
      dispatch(addProductToCart(updatedProduct));
   };

   // Removing existing product from cart
   const removeProductFromShoppingCartHandler = (id) => {
      dispatch(removeProductFromCart({ id }));
   };

   // Proceed to checkout handler
   const checkoutHandler = () => {
      navigate("/signin?redirect=/shipping");
   };

   let contentMarkup = "";
   const isCartEmpty = productsInCart.length === 0;

   if (isCartEmpty) {
      contentMarkup = (
         <h2 className="text-clr-black">
            Your Cart is so empty!{" "}
            <Link to={"/"} className="text-clr-primary underline">
               Go Shopping!
            </Link>
         </h2>
      );
   } else {
      contentMarkup = (
         <div className="grid gap-y-6">
            {productsInCart.map((prod) => (
               <div
                  key={prod._id}
                  className="grid grid-cols-3 sm:grid-cols-4 py-4 gap-4 justify-items-center border-b border-clr-black-faded"
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

            <div className="justify-self-center text-center grid gap-y-2">
               <p className="text-sm md:text-xl font-medium text-clr-black">
                  Subtotal ({productsInCart.reduce((acc, product) => acc + product.quantity, 0)})
                  items:
               </p>
               <p className="text-sm md:text-2xl font-semibold text-clr-primary">${totalAmount}</p>
               <button
                  onClick={checkoutHandler}
                  type="button"
                  disabled={productsInCart.length === 0}
                  className="justify-self-center mt-4 rounded-full inline-block text-clr-primary text-base md:text-lg font-medium py-2 px-4 border disabled:bg-clr-black-faded disabled:cursor-not-allowed disabled:text-clr-gray disabled:border-clr-gray border-clr-primary hover:bg-clr-primary hover:text-white transition-all"
               >
                  Proceed to Checkout
               </button>
            </div>
         </div>
      );
   }

   return (
      <Container type="page">
         <h2 className="text-xl text-clr-black md:text-3xl font-medium mb-9">My Shopping Cart</h2>
         {contentMarkup}
      </Container>
   );
};
export default ShoppingCartScreen;
