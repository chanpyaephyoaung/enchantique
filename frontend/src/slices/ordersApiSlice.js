import { baseApiSlice } from "./baseApiSlice.js";
import { ORDERS_BASE_URL, ADMIN_ORDERS_BASE_URL } from "../helpers/constants.js";

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
      getAllOrdersByUser: builder.query({
         query: () => ({
            url: `${ORDERS_BASE_URL}/my-orders`,
         }),
         keepUnusedDataFor: 10,
      }),
      getSingleOrderById: builder.query({
         query: (orderId) => ({
            url: `${ORDERS_BASE_URL}/${orderId}`,
         }),
         keepUnusedDataFor: 10,
      }),
      cancelOrder: builder.mutation({
         query: (orderId) => ({
            url: `${ORDERS_BASE_URL}/${orderId}/cancel`,
            method: "POST",
            body: orderId,
         }),
      }),
      getAllOrdersByAdmin: builder.query({
         query: () => ({
            url: ADMIN_ORDERS_BASE_URL,
         }),
         keepUnusedDataFor: 10,
      }),
      shipOrder: builder.mutation({
         query: (orderId) => ({
            url: `${ADMIN_ORDERS_BASE_URL}/${orderId}/shipped`,
            method: "PUT",
         }),
      }),
      deliverOrder: builder.mutation({
         query: (orderId) => ({
            url: `${ADMIN_ORDERS_BASE_URL}/${orderId}/delivered`,
            method: "PUT",
         }),
      }),
   }),
});

export const {
   useCreateNewOrderByUserMutation,
   useMakeOrderPaymentMutation,
   useGetAllOrdersByUserQuery,
   useGetSingleOrderByIdQuery,
   useCancelOrderMutation,
   useGetAllOrdersByAdminQuery,
   useShipOrderMutation,
   useDeliverOrderMutation,
} = ordersApiSlice;
