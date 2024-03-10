// redux imports
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// constant imports
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  // prepareHeaders: (headers, { getState }) => {
  //   const token = getState().auth.token;
  //   if (token) {
  //     headers.set("Authorization", `Bearer ${token}`);
  //     headers.set("Content-Type", "application/json");
  //   }
  //   return headers;
  // },
});

// parent slice
export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
});
