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
      query: ({ currentYear, currentMonth, requestID, payDate }) => ({
        url: `${PAY_URL_HTTPS}/IssuePayForMunicipality?currentYear=${currentYear}&currentMonth=${currentMonth}&requestID=${requestID}&payDate=${payDate}`,
        method: "POST",
      }),
    }),

    insertPay: builder.mutation({
      query: ({ payDate, currentYear, currentMonth, requestID, personID }) => ({
        url: `${PAY_URL_HTTPS}/InsertSinglePayForMunicipality?payDate=${payDate}&currentYear=${currentYear}&currentMonth=${currentMonth}&requestID=${requestID}&personID=${personID}`,
        method: "POST",
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
