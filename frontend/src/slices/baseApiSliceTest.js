import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../helpers/constants.js";

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:3001" });

export const baseApiSlice = createApi({
   baseQuery,
   tagTypes: ["User", "Product", "Order"],
   endpoints: () => ({}),
});
