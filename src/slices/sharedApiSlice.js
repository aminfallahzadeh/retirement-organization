// constant imports
import { SHARED_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const sharedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLookupData: builder.query({
      query: ({ token, lookUpType }) => ({
        url: `${SHARED_URL_HTTPS}/GetLookupData?lookUpType=${lookUpType}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    insertLookUp: builder.mutation({
      query: ({ token, data }) => ({
        url: `${SHARED_URL_HTTPS}/InsertLookUp`,
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

export const { useGetLookupDataQuery, useInsertLookUpMutation } =
  sharedApiSlice;
