// constant imports
import { RELATED_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const relatedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRelatedListByParentPersonID: builder.query({
      query: ({ token, parentPersonID }) => ({
        url: `${RELATED_URL_HTTPS}/GetRelatedListByParentPersonID?parentPersonID=${parentPersonID}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    getRelated: builder.query({
      query: ({ token, personID }) => ({
        url: `${RELATED_URL_HTTPS}/GetRelated?parentPersonID=${personID}`,
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
      query: ({ token, pensionaryID }) => ({
        url: `${RELATED_URL_HTTPS}/RemoveRelated?pensionaryID=${pensionaryID}`,
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
  useGetRelatedListByParentPersonIDQuery,
  useGetRelatedQuery,
  useInsertRelatedMutation,
  useUpdateRelatedMutation,
  useRemoveRelatedMutation,
} = relatedApiSlice;
