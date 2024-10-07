// CONSTANT IMPORTS
import { REPORT_HTTPS } from "../constants";

// SLICE IMPORTS
import { apiSlice } from "./apiSlice";

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    dashboardReport: builder.query({
      query: ({
        startDate,
        finishDate,
        applicantTypeIsRetired,
        organizationID,
      }) => {
        let url = `${REPORT_HTTPS}/DashboardReport?startDate=${startDate}&finishDate=${finishDate}&organizationID=${organizationID}`;

        if (applicantTypeIsRetired) {
          url += `&applicantTypeIsRetired=${applicantTypeIsRetired}`;
        }

        return {
          url,
        };
      },
    }),

    getPayCompareReport: builder.query({
      // 1 = retired 0 = heir -1 = both
      query: ({
        CurrentYear,
        CurrentMonth,
        PayItemTypeID,
        PreviousMonth,
        pensionaryIsRetired,
      }) => ({
        url: `${REPORT_HTTPS}/GetPayCompareReport?CurrentYear=${CurrentYear}&CurrentMonth=${CurrentMonth}&PayItemTypeID=${PayItemTypeID}&PreviousMonth=${PreviousMonth}&pensionaryIsRetired=${pensionaryIsRetired}`,
      }),
    }),
  }),
});

export const { useLazyDashboardReportQuery, useLazyGetPayCompareReportQuery } =
  reportApiSlice;
