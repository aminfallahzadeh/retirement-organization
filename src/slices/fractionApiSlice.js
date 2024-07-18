// constant imports
import { FRACTION_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const fractionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFractionItemView: builder.query({
      query: ({ personID }) => ({
        url: `${FRACTION_URL_HTTPS}/GetFractionItemView?personID=${personID}`,
      }),
    }),

    getFractionType: builder.query({
      query: () => ({
        url: `${FRACTION_URL_HTTPS}/GetFractionType`,
      }),
    }),
  }),
});

export const { useGetFractionItemViewQuery, useGetFractionTypeQuery } =
  fractionApiSlice;
