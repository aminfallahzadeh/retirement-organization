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
        url: `${USERS_URL_HTTPS}/RefreshToken`,
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    getGroup: builder.query({
      query: (token) => ({
        url: `${USERS_URL_HTTPS}/GetGroup`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    updategroups: builder.mutation({
      query: ({ data, token }) => ({
        url: `${USERS_URL_HTTPS}/UpdateGroup`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    getUser: builder.query({
      query: (token) => ({
        url: `${USERS_URL_HTTPS}/GetUser`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getItems: builder.query({
      query: (token) => ({
        url: `${USERS_URL_HTTPS}/GetItem`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getGroupItems: builder.query({
      query: ({ token, groupId }) => ({
        url: `${USERS_URL_HTTPS}/GetGroupItem?groupID=${groupId}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
      keepUnusedDataFor: 5,
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
  useGetGroupQuery,
  useGetUserQuery,
  useGetItemsQuery,
  useGetGroupItemsQuery,
  useUpdategroupsMutation,
} = usersApiSlice;
