import { createSlice } from "@reduxjs/toolkit";
import { updateShoppingCartPricesState } from "../helpers/shoppingCartHelpers.js";

// Retrieve from localstorage if it was stored
const initialState = localStorage.getItem("shoppingCart")
   ? JSON.parse(localStorage.getItem("shoppingCart"))
   : { productsInCart: [], userDeliveryAddress: {} };

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
      removeAllProductsFromCart: (state) => {
         state.productsInCart = [];
         return updateShoppingCartPricesState(state);
      },
      setUserDeliveryAddress: (state, action) => {
         state.userDeliveryAddress = action.payload.address;
         return updateShoppingCartPricesState(state);
      },
      removeShoppingCartInfo: (state) => {
         state.productsInCart = [];
         state.userDeliveryAddress = null;
         localStorage.removeItem("shoppingCart");
      },
   },
});

export const {
   addProductToCart,
   removeProductFromCart,
   removeAllProductsFromCart,
   setUserDeliveryAddress,
   removeShoppingCartInfo,
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
