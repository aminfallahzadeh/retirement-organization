// constant imports
import { HEIR_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const heirApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeirListByParentPersonID: builder.query({
      query: ({ parentPersonID }) => ({
        url: `${HEIR_URL_HTTPS}/GetHeirListByParentPersonID?parentPersonID=${parentPersonID}`,
      }),
    }),
    getHeir: builder.query({
      query: (personID) => ({
        url: `${HEIR_URL_HTTPS}/GetHeir?personID=${personID}`,
      }),
    }),
    insertHeir: builder.mutation({
      query: (data) => ({
        url: `${HEIR_URL_HTTPS}/InsertHeir`,
        method: "POST",
        body: data,
      }),
    }),
    updateHeir: builder.mutation({
      query: (data) => ({
        url: `${HEIR_URL_HTTPS}/UpdateHeir`,
        method: "POST",
        body: data,
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
      query: ({ pensionaryID }) => ({
        url: `${HEIR_URL_HTTPS}/RemoveHeir?pensionaryID=${pensionaryID}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetHeirListByParentPersonIDQuery,
  useLazyGetHeirListByParentPersonIDQuery,
  useGetHeirQuery,
  useRemoveHeirMutation,
  useUpdateHeirMutation,
  useInsertHeirMutation,
} = heirApiSlice;
