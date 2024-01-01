import { createSlice } from "@reduxjs/toolkit";
import { updateShoppingCartPricesState } from "../helpers/shoppingCartHelpers.js";

// Retrieve from localstorage if it was stored
const initialState = localStorage.getItem("shoppingCart")
   ? JSON.parse(localStorage.getItem("shoppingCart"))
   : { productsInCart: [] };

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
            state.productsInCart = [...state.productsInCart, product];
         }

         return updateShoppingCartPricesState(state);
      },
      removeProductFromCart: (state, action) => {
         state.productsInCart = state.productsInCart.filter(
            (prod) => prod._id !== action.payload.id
         );
         return updateShoppingCartPricesState(state);
      },
   },
});

export const { addProductToCart, removeProductFromCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
