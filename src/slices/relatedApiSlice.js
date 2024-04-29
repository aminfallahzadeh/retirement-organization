// constant imports
import { RELATED_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const relatedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRelatedListByParentPersonID: builder.query({
      query: (parentPersonID) => ({
        url: `${RELATED_URL_HTTPS}/GetRelatedListByParentPersonID?parentPersonID=${parentPersonID}`,
      }),
    }),
    getRelated: builder.query({
      query: (personID) => ({
        url: `${RELATED_URL_HTTPS}/GetRelated?personID=${personID}`,
      }),
    }),
    insertRelated: builder.mutation({
      query: (data) => ({
        url: `${RELATED_URL_HTTPS}/InsertRelated`,
        method: "POST",
        body: data,
      }),
    }),
    updateRelated: builder.mutation({
      query: (data) => ({
        url: `${RELATED_URL_HTTPS}/UpdateRelated`,
        method: "POST",
        body: data,
      }),
    }),
    removeRelated: builder.mutation({
      query: (pensionaryID) => ({
        url: `${RELATED_URL_HTTPS}/RemoveRelated?pensionaryID=${pensionaryID}`,
        method: "POST",
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
