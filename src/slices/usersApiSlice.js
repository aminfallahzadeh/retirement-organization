// constant imports
import { USERS_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL_HTTPS}/Login`,
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    refresh: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL_HTTPS}/RefresToken`,
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    getGroup: builder.mutation({
      query: (token) => ({
        url: `${USERS_URL_HTTPS}/GetGroup`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    logout: builder.mutation({
      query: ({ data, token }) => ({
        url: `${USERS_URL_HTTPS}/Logout`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
  useGetGroupMutation,
} = usersApiSlice;
