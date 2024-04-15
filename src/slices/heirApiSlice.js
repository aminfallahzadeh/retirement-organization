// constant imports
import { HEIR_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const heirApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeirListByParentPersonID: builder.query({
      query: ({ token, parentPersonID }) => ({
        url: `${HEIR_URL_HTTPS}/GetHeirListByParentPersonID?parentPersonID=${parentPersonID}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    getHeir: builder.query({
      query: (token) => ({
        url: `${HEIR_URL_HTTPS}/GetHeir`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    insertHeir: builder.mutation({
      query: ({ token, data }) => ({
        url: `${HEIR_URL_HTTPS}/InsertHeir`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    updateHeir: builder.mutation({
      query: ({ token, data }) => ({
        url: `${HEIR_URL_HTTPS}/UpdateHeir`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    updateHeirAccount: builder.mutation({
      query: ({ token, data }) => ({
        url: `${HEIR_URL_HTTPS}/UpdateHeirAccount`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    removeHeir: builder.mutation({
      query: ({ token, pensionaryiD }) => ({
        url: `${HEIR_URL_HTTPS}/RemovHeir?pensionaryiD=${pensionaryiD}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetHeirListByParentPersonIDQuery,
  useGetHeirQuery,
  useRemoveHeirMutation,
  useUpdateHeirMutation,
  useInsertHeirMutation,
} = heirApiSlice;
