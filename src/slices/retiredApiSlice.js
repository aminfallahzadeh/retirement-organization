// constant imports
import { RETIRED_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const retiredApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRetired: builder.query({
      query: ({ token, nationalCode }) => ({
        url: `${RETIRED_URL_HTTPS}/GetRetired?nationalCode=${nationalCode}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    getRetiredAccountByNationalCode: builder.query({
      query: ({ token, nationalcode }) => ({
        url: `${RETIRED_URL_HTTPS}/GetRetiredAccountByNationalCode?nationalcode=${nationalcode}`,
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
  useGetRetiredAccountByNationalCodeQuery,
  useUpdateRetiredPensionaryComplementaryMutation,
  useUpdateRetiredMutation,
  useUpdateRetiredAccountMutation,
} = retiredApiSlice;
