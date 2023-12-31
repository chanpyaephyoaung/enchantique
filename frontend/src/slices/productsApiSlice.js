import { PRODUCTS_BASE_URL } from "../helpers/constants.js";
import { apiSlice } from "./apiSlice.js";

export const productsApiSlice = apiSlice.injectEndpoints({
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
