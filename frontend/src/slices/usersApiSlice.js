import { baseApiSlice } from "./baseApiSlice.js";
import { USERS_BASE_URL } from "../helpers/constants.js";

export const usersApiSlice = baseApiSlice.injectEndpoints({
   endpoints: (builder) => ({
      signIn: builder.mutation({
         query: (authData) => ({
            url: `${USERS_BASE_URL}/signin`,
            method: "POST",
            body: authData,
         }),
         keepUnusedDataFor: 10,
      }),
   }),
});

export const { useSignInMutation } = usersApiSlice;
