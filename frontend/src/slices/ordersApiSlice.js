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
   }),
});

export const { useCreateNewOrderByUser } = ordersApiSlice;
