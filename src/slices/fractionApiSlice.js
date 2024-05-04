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
  }),
});

export const { useGetFractionItemViewQuery } = fractionApiSlice;
