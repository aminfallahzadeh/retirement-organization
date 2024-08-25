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
  }),
});

export const { useLazyDashboardReportQuery } = reportApiSlice;
