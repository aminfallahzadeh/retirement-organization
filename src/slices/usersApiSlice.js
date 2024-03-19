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
      // keepUnusedDataFor: 5,
    }),
    insertGroup: builder.mutation({
      query: ({ token, data }) => ({
        url: `${USERS_URL_HTTPS}/InsertGroup`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    deleteGroup: builder.mutation({
      query: ({ token, data }) => ({
        url: `${USERS_URL_HTTPS}/DeleteGroup`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    updateGroup: builder.mutation({
      query: ({ token, data }) => ({
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
    }),
    getUserGroups: builder.query({
      query: ({ token, userId }) => ({
        url: `${USERS_URL_HTTPS}/GetGroupUser?userID=${userId}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    deleteGroupUsers: builder.mutation({
      query: ({ token, userID }) => ({
        url: `${USERS_URL_HTTPS}/DeleteGroupUser?userID=${userID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    insertGroupUsers: builder.mutation({
      query: ({ token, data }) => ({
        url: `${USERS_URL_HTTPS}/InsertGroupUser`,
        method: "POST",
        body: data,
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
    deleteGroupItems: builder.mutation({
      query: ({ token, groupID }) => ({
        url: `${USERS_URL_HTTPS}/DeleteGroupItem?groupID=${groupID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    insertGroupItem: builder.mutation({
      query: ({ token, data }) => ({
        url: `${USERS_URL_HTTPS}/InsertGroupItem`,
        method: "POST",
        body: data,
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
  useGetGroupQuery,
  useInsertGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
  useGetUserQuery,
  useGetItemsQuery,
  useDeleteGroupItemsMutation,
  useInsertGroupItemMutation,
  useGetGroupItemsQuery,
  useGetUserGroupsQuery,
  useDeleteGroupUsersMutation,
  useInsertGroupUsersMutation,
} = usersApiSlice;
