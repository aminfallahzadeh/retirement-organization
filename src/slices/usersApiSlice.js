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
      }),
    }),
    getGroup: builder.query({
      query: () => ({
        url: `${USERS_URL_HTTPS}/GetGroup`,
      }),
    }),
    insertGroup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL_HTTPS}/InsertGroup`,
        method: "POST",
        body: data,
      }),
    }),
    deleteGroup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL_HTTPS}/DeleteGroup`,
        method: "POST",
        body: data,
      }),
    }),
    updateGroup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL_HTTPS}/UpdateGroup`,
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: ({ userName, userID }) => {
        let url = `${USERS_URL_HTTPS}/GetUser`;

        const queryParams = [];

        if (userName) {
          queryParams.push(`userName=${userName}`);
        }

        if (userID) {
          queryParams.push(`userID=${userID}`);
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        console.log("params", queryParams);

        return {
          url,
        };
      },
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL_HTTPS}/UpdateUser`,
        method: "POST",
        body: data,
      }),
    }),
    insertUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL_HTTPS}/InsertUser`,
        method: "POST",
        body: data,
      }),
    }),
    getUserGroups: builder.query({
      query: (userID) => ({
        url: `${USERS_URL_HTTPS}/GetGroupUser?userID=${userID}`,
      }),
    }),
    insertGroupUsers: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL_HTTPS}/InsertGroupUser`,
        method: "POST",
        body: data,
      }),
    }),
    getItems: builder.query({
      query: () => ({
        url: `${USERS_URL_HTTPS}/GetItem`,
      }),
    }),
    getGroupItems: builder.query({
      query: (groupID) => ({
        url: `${USERS_URL_HTTPS}/GetGroupItem?groupID=${groupID}`,
      }),
    }),
    insertGroupItem: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL_HTTPS}/InsertGroupItem`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL_HTTPS}/Logout`,
        method: "POST",
        body: data,
      }),
    }),
    updateUserTheme: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL_HTTPS}/UpdateUserTheme`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetGroupQuery,
  useInsertGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useInsertUserMutation,
  useGetItemsQuery,
  useInsertGroupItemMutation,
  useGetGroupItemsQuery,
  useGetUserGroupsQuery,
  useInsertGroupUsersMutation,
  useUpdateUserThemeMutation,
} = usersApiSlice;
