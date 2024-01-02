import { baseApiSlice } from "./baseApiSlice.js";
import { PRODUCTS_BASE_URL } from "../helpers/constants.js";

export const productsApiSlice = baseApiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllProducts: builder.query({
         query: () => ({
            url: PRODUCTS_BASE_URL,
         }),
         keepUnusedDataFor: 10,
      }),
      getSingleProductDetails: builder.query({
         query: (productId) => ({
            url: `${PRODUCTS_BASE_URL}/${productId}`,
         }),
         keepUnusedDataFor: 10,
      }),
   }),
});

export const { useGetAllProductsQuery, useGetSingleProductDetailsQuery } = productsApiSlice;
