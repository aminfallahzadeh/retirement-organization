// reduct imports
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// constant imports
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ BASE_URL });

// parent slice
export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
});
