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
      query: ({ personID, currentYear, currentMonth, payType }) => {
        let url = `${PAY_URL_HTTPS}/GetPayList?payType=${payType}`;

        if (personID) {
          url += `&personID=${personID}`;
        }
        if (currentYear) {
          url += `&currentYear=${currentYear}`;
        }
        if (currentMonth) {
          url += `&currentMonth=${currentMonth}`;
        }

        return {
          url,
        };
      },
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

    removePayItem: builder.mutation({
      query: ({ payItemID }) => ({
        url: `${PAY_URL_HTTPS}/RemovePayItem?payItemID=${payItemID}`,
        method: "POST",
      }),
    }),

    insertPayItem: builder.mutation({
      query: (data) => ({
        url: `${PAY_URL_HTTPS}/InsertPayItem`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLazyExistPaySlipQuery,
  useLazyGetPayListQuery,
  useGetPayListQuery,
  useGetPayQuery,
  useIssuePayMutation,
  useInsertPayMutation,
  useRemovePayItemMutation,
  useInsertPayItemMutation,
} = payApiSlice;
