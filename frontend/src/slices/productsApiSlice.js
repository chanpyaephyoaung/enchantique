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
      giveProductRatingByUser: builder.mutation({
         query: (data) => ({
            url: `${PRODUCTS_BASE_URL}/${data.productId}/rate`,
            method: "POST",
            body: data,
         }),
      }),
      createNewProduct: builder.mutation({
         query: (prodData) => ({
            url: `${PRODUCTS_BASE_URL}/new`,
            method: "POST",
            body: prodData,
         }),
      }),
      deleteSingleProduct: builder.mutation({
         query: (productId) => ({
            url: `${PRODUCTS_BASE_URL}/${productId}`,
            method: "DELETE",
            body: productId,
         }),
      }),
   }),
});

export const {
   useGetAllProductsQuery,
   useGetSingleProductDetailsQuery,
   useCreateNewProductMutation,
   useDeleteSingleProductMutation,
   useGiveProductRatingByUserMutation,
} = productsApiSlice;
