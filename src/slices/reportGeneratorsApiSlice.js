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
    generateReport: builder.query({
      query: ({
        txtSelectPart,
        ConditionsCode,
        cmbGroupField0,
        cmbGroupField1,
        cmbGroupField2,
        cmbGroupField3,
        cmbGroupFunction0,
        cmbGroupFunction1,
        cmbGroupFunction2,
        cmbGroupFunction3,
      }) => {
        let url = `${REPORT_GENERATOR_HTTPS}/GenerateReport?txtSelectPart=${txtSelectPart}&ConditionsCode=${ConditionsCode}`;

        if (cmbGroupField0) {
          url += `&cmbGroupField0=${cmbGroupField0}`;
        }

        if (cmbGroupFunction0) {
          url += `&cmbGroupFunction0=${cmbGroupFunction0}`;
        }

        if (cmbGroupField1) {
          url += `&cmbGroupField1=${cmbGroupField1}`;
        }

        if (cmbGroupFunction1) {
          url += `&cmbGroupFunction1=${cmbGroupFunction1}`;
        }

        if (cmbGroupField2) {
          url += `&cmbGroupField2=${cmbGroupField2}`;
        }

        if (cmbGroupFunction2) {
          url += `&cmbGroupFunction2=${cmbGroupFunction2}`;
        }

        if (cmbGroupField3) {
          url += `&cmbGroupField3=${cmbGroupField3}`;
        }

        if (cmbGroupFunction3) {
          url += `&cmbGroupFunction3=${cmbGroupFunction3}`;
        }

        return {
          url,
        };
      },
    }),
  }),
});

export const {
  useGetTablesQuery,
  useLazyGetColsQuery,
  useLazyGetLookupValueQuery,
  useLazyGenerateReportQuery,
} = reportGeneratorApiSlice;
