// constant imports
import { RETIRED_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const retiredApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRetiredPerson: builder.query({
      query: (personID) => ({
        url: `${RETIRED_URL_HTTPS}/GetRetiredPerson?personID=${personID}`,
      }),
    }),
    updateRetiredPerson: builder.mutation({
      query: (data) => ({
        url: `${RETIRED_URL_HTTPS}/UpdateRetiredPerson`,
        method: "POST",
        body: data,
      }),
    }),
    getRetiredPensionary: builder.query({
      query: (personID) => ({
        url: `${RETIRED_URL_HTTPS}/GetRetiredPensionary?personID=${personID}`,
      }),
    }),
    getRetiredAccount: builder.query({
      query: (personID) => ({
        url: `${RETIRED_URL_HTTPS}/GetRetiredAccount?personID=${personID}`,
      }),
    }),
    updateRetiredPensionary: builder.mutation({
      query: (data) => ({
        url: `${RETIRED_URL_HTTPS}/UpdateRetiredPensionary`,
        method: "POST",
        body: data,
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
      query: (data) => ({
        url: `${RETIRED_URL_HTTPS}/UpdateRetiredAccount`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetRetiredPersonQuery,
  useUpdateRetiredPersonMutation,
  useGetRetiredPensionaryQuery,
  useGetRetiredAccountQuery,
  useUpdateRetiredPensionaryMutation,
  useUpdateRetiredMutation,
  useUpdateRetiredAccountMutation,
} = retiredApiSlice;
