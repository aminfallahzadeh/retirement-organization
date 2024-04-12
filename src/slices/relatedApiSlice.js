// constant imports
import { RELATED_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const relatedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRelated: builder.query({
      query: ({ token, personID }) => ({
        url: `${RELATED_URL_HTTPS}/GetRelated?personID=${personID}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    insertRelated: builder.mutation({
      query: ({ token, data }) => ({
        url: `${RELATED_URL_HTTPS}/InsertRelated`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    updateRelated: builder.mutation({
      query: ({ token, data }) => ({
        url: `${RELATED_URL_HTTPS}/UpdateRelated`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    removeRelated: builder.mutation({
      query: ({ token, pensionaryiD }) => ({
        url: `${RELATED_URL_HTTPS}/RemoveRelated?pensionaryiD=${pensionaryiD}`,
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
  useGetRelatedQuery,
  useInsertRelatedMutation,
  useUpdateRelatedMutation,
  useRemoveRelatedMutation,
} = relatedApiSlice;
