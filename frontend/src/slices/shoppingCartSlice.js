import { createSlice } from "@reduxjs/toolkit";
import { updateShoppingCartPricesState } from "../helpers/shoppingCartHelpers.js";
import { DEFAULT_PAYMENT_METHOD } from "../helpers/constants.js";

// Retrieve from localstorage if it was stored
const initialState = localStorage.getItem("shoppingCart")
   ? JSON.parse(localStorage.getItem("shoppingCart"))
   : { productsInCart: [], defaultPaymentMethod: DEFAULT_PAYMENT_METHOD, userDeliveryAddress: {} };

const shoppingCartSlice = createSlice({
   name: "shoppingCart",
   initialState,
   reducers: {
      addProductToCart: (state, action) => {
         const product = action.payload;

         const existingProduct = state.productsInCart.find((p) => p._id === product._id);

         if (existingProduct) {
            state.productsInCart = state.productsInCart.map((prod) =>
               prod._id === existingProduct._id ? product : prod
            );
         } else {
            const updatedProductsInCart = [...state.productsInCart, product];
            state.productsInCart = updatedProductsInCart;
         }

         return updateShoppingCartPricesState(state);
      },
      removeProductFromCart: (state, action) => {
         state.productsInCart = state.productsInCart.filter(
            (prod) => prod._id !== action.payload.id
         );
         return updateShoppingCartPricesState(state);
      },
      setUserDeliveryAddress: (state, action) => {
         state.userDeliveryAddress = action.payload.address;
         return updateShoppingCartPricesState(state);
      },
      setPaymentType: (state, action) => {
         state.paymentType = action.payload.paymentType;
         return updateShoppingCartPricesState(state);
      },
   },
});

export const { addProductToCart, removeProductFromCart, setUserDeliveryAddress, setPaymentType } =
   shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
