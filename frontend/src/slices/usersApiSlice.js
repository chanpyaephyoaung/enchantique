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
      }),
      signOut: builder.mutation({
         query: () => ({
            url: `${USERS_BASE_URL}/signout`,
            method: "POST",
         }),
      }),
      signUp: builder.mutation({
         query: (data) => ({
            url: `${USERS_BASE_URL}/signup`,
            method: "POST",
            body: data,
         }),
      }),
   }),
});

export const { useSignInMutation, useSignOutMutation, useSignUpMutation } = usersApiSlice;
