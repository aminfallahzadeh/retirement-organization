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
  }),
});

export const { useLazyGetRetiredQuery } = retiredApiSlice;
