// constant imports
import { RETIRED_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const retiredApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRetired: builder.query({
      query: ({ token, personId }) => ({
        url: `${RETIRED_URL_HTTPS}/GetRetired?personId=${personId}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    getRetiredAccount: builder.query({
      query: ({ token, personID }) => ({
        url: `${RETIRED_URL_HTTPS}/GetRetiredAccount?personID=${personID}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    updateRetiredPensionaryComplementary: builder.mutation({
      query: ({ token, data }) => ({
        url: `${RETIRED_URL_HTTPS}/UpdateRetiredPensionaryComplementary`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    updateRetired: builder.mutation({
      query: ({ token, data }) => ({
        url: `${RETIRED_URL_HTTPS}/UpdateRetired`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    updateRetiredAccount: builder.mutation({
      query: ({ token, data }) => ({
        url: `${RETIRED_URL_HTTPS}/UpdateRetiredAccount`,
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
  useGetRetiredQuery,
  useGetRetiredAccountQuery,
  useUpdateRetiredPensionaryComplementaryMutation,
  useUpdateRetiredMutation,
  useUpdateRetiredAccountMutation,
} = retiredApiSlice;
