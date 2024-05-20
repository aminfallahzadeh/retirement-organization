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
    getPayList: builder.query({
      query: ({ currentYear, currentMonth, payType }) => ({
        url: `${PAY_URL_HTTPS}/GetPayList?currentYear=${currentYear}&currentMonth=${currentMonth}&payType=${payType}`,
      }),
    }),
    getPay: builder.query({
      query: ({ payID }) => ({
        url: `${PAY_URL_HTTPS}/GetPay?payID=${payID}`,
      }),
    }),

    issuePay: builder.mutation({
      query: ({ currentYear, currentMonth }) => ({
        url: `${PAY_URL_HTTPS}/IssuePayForMunicipality?&currentYear=${currentYear}&currentMonth=${currentMonth}`,
        method: "POST",
      }),
    }),

    insertPay: builder.mutation({
      query: (data) => ({
        url: `${PAY_URL_HTTPS}/InsertPay`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLazyExistPaySlipQuery,
  useLazyGetPayListQuery,
  useGetPayQuery,
  useIssuePayMutation,
  useInsertPayMutation,
} = payApiSlice;
