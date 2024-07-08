// constant imports
import { REPORT_GENERATOR_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const reportGeneratorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTables: builder.query({
      query: () => ({
        url: `${REPORT_GENERATOR_HTTPS}/GetTables`,
      }),
    }),

    getCols: builder.query({
      query: (TableName) => ({
        url: `${REPORT_GENERATOR_HTTPS}/GetCols?TableName=${TableName}`,
      }),
    }),

    getLookupValue: builder.query({
      query: (id) => ({
        url: `${REPORT_GENERATOR_HTTPS}/GetLookupValue?id=${id}`,
      }),
    }),
  }),
});

export const {
  useGetTablesQuery,
  useLazyGetColsQuery,
  useLazyGetLookupValueQuery,
} = reportGeneratorApiSlice;
