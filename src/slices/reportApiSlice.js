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
      }) => ({
        url: `${REPORT_HTTPS}/DashboardReport?startDate=${startDate}&finishDate=${finishDate}&applicantTypeIsRetired=${applicantTypeIsRetired}&organizationID=${organizationID}`,
      }),
    }),
  }),
});

export const { useLazyDashboardReportQuery } = reportApiSlice;
