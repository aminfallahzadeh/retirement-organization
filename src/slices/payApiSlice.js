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
      query: ({ personID, currentYear, currentMonth }) => ({
        url: `${PAY_URL_HTTPS}/GetPayListByPersonID?personID=${personID}&currentYear=${currentYear}&currentMonth=${currentMonth}`,
      }),
    }),
    getPay: builder.query({
      query: ({ payID }) => ({
        url: `${PAY_URL_HTTPS}/GetPay?payID=${payID}`,
      }),
    }),

    issuePay: builder.mutation({
      query: ({ personID, currentYear, currentMonth }) => ({
        url: `${PAY_URL_HTTPS}/IssuePayForMunicipality?personID=${personID}&currentYear=${currentYear}&currentMonth=${currentMonth}&requestID=null&payDate=null`,
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
} = payApiSlice;
