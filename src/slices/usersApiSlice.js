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
    getUserGroups: builder.query({
      query: (token) => ({
        url: `${USERS_URL_HTTPS}/GetUserGroups?userID=1DCE73C0-D266-44D4-9320-DC3C54EA92A9`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
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
  useGetUserGroupsQuery,
} = usersApiSlice;
