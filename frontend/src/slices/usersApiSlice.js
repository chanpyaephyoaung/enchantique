import { baseApiSlice } from "./baseApiSlice.js";
import { USERS_BASE_URL, ADMIN_USER_BASE_URL } from "../helpers/constants.js";

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
      updateUserAccProfile: builder.mutation({
         query: (newProfileData) => ({
            url: `${USERS_BASE_URL}/account-profile`,
            method: "PUT",
            body: newProfileData,
         }),
      }),
      getAllUsersByAdmin: builder.query({
         query: () => ({
            url: ADMIN_USER_BASE_URL,
         }),
         keepUnusedDataFor: 10,
      }),
      deleteSingleUser: builder.mutation({
         query: (userId) => ({
            url: `${ADMIN_USER_BASE_URL}/${userId}`,
            method: "DELETE",
            body: userId,
         }),
      }),
      getAllUsersNotifications: builder.query({
         query: (userId) => ({
            url: `${USERS_BASE_URL}/${userId}/notifications`,
         }),
         keepUnusedDataFor: 10,
      }),
      createNewNoti: builder.mutation({
         query: (notiData) => ({
            url: `${USERS_BASE_URL}/notifications/new`,
            method: "POST",
            body: notiData,
         }),
      }),
   }),
});

export const {
   useSignInMutation,
   useSignOutMutation,
   useSignUpMutation,
   useUpdateUserAccProfileMutation,
   useGetAllUsersByAdminQuery,
   useDeleteSingleUserMutation,
   useGetAllUsersNotificationsQuery,
   useCreateNewNotiMutation,
} = usersApiSlice;
