// constant imports
import { PAY_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const payApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    existPaySlip: builder.query({
      query: ({ payType, currentYear, currentMonth }) => ({
        url: `${PAY_URL_HTTPS}/ExistPaySlip?payType=${payType}&currentYear=${currentYear}&currentMonth=${currentMonth}`,
      }),
    }),
  }),
});

export const { useLazyExistPaySlipQuery } = payApiSlice;
