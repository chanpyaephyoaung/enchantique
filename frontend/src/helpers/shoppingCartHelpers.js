import { addTwoDecimals } from "./mathHelpers.js";
import {
   MAX_PRICE_TO_INCLUDE_SHIPPING_PRICE,
   SHIPPING_PRICE,
   TAX_PERCENTAGE,
} from "./constants.js";

export const updateShoppingCartPricesState = (shoppingCartState) => {
   // Calculate total amount for all products in a cart
   shoppingCartState.totalRawProductPrice = addTwoDecimals(
      shoppingCartState.productsInCart.reduce(
         (acc, curProd) => acc + (curProd.price * 100 * curProd.quantity) / 100,
         0
      )
   );

   // Calculate shipping amount
   shoppingCartState.shippingAmount = addTwoDecimals(
      shoppingCartState.totalRawProductPrice < MAX_PRICE_TO_INCLUDE_SHIPPING_PRICE
         ? 0
         : SHIPPING_PRICE
   );

   // Calculate tax amount
   shoppingCartState.taxAmount = addTwoDecimals(
      TAX_PERCENTAGE * shoppingCartState.totalRawProductPrice
   );

   // Calculate total amount
   shoppingCartState.totalAmount = addTwoDecimals(
      +shoppingCartState.totalRawProductPrice +
         +shoppingCartState.shippingAmount +
         +shoppingCartState.taxAmount
   );

   // Save to local storage
   localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartState));

   return shoppingCartState;
};
