// constant imports
import { USERS_URL } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/Login`,
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    refresh: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/RefresToken`,
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/Logout`,
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } =
  usersApiSlice;
