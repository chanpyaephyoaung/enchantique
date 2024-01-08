import { baseApiSlice } from "./baseApiSlice.js";
import { ORDERS_BASE_URL } from "../helpers/constants.js";

export const ordersApiSlice = baseApiSlice.injectEndpoints({
   endpoints: (builder) => ({
      createNewOrderByUser: builder.mutation({
         query: (newOrder) => ({
            url: ORDERS_BASE_URL,
            method: "POST",
            body: { ...newOrder },
         }),
      }),
      makeOrderPayment: builder.mutation({
         query: (orderedProducts) => ({
            url: `${ORDERS_BASE_URL}/pay`,
            method: "POST",
            body: orderedProducts,
         }),
      }),
      getSingleOrderById: builder.query({
         query: (orderId) => ({
            url: `${ORDERS_BASE_URL}/${orderId}`,
         }),
         keepUnusedDataFor: 10,
      }),
   }),
});

export const {
   useCreateNewOrderByUserMutation,
   useMakeOrderPaymentMutation,
   useGetSingleOrderByIdQuery,
} = ordersApiSlice;
