// CONSTANT
import { FINANCIAL_URL_HTTPS } from "../constants";

// SLICES
import { apiSlice } from "./apiSlice";

export const financialItemApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialItems: builder.query({
      query: (personID) => ({
        url: `${FINANCIAL_URL_HTTPS}/GetFinancialItems?personID=${personID}`,
      }),
    }),
  }),
});

export const { useLazyGetFinancialItemsQuery } = financialItemApiSlice;
