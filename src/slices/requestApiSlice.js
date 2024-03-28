// constant imports
import { REQUEST_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const requestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRole: builder.query({
      query: (token) => ({
        url: `${REQUEST_URL_HTTPS}/GetRole`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    getRequest: builder.query({
      query: (token) => ({
        url: `${REQUEST_URL_HTTPS}/GetRequest?Role=asd`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetRoleQuery, useGetRequestQuery } = requestApiSlice;
