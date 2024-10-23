// constant imports
import { REPORT_GENERATOR_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const reportGeneratorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTables: builder.query({
      query: (role) => {
        let url = `${REPORT_GENERATOR_HTTPS}/GetTables`;

        if (role) {
          url += `?Role=${role}`;
        }
        // url: `${REPORT_GENERATOR_HTTPS}/GetTables?Role=${role}`,

        return {
          url,
        };
      },
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
        ForSave,
      }) => {
        // Ensure default values
        cmbGroupField0 = cmbGroupField0 ?? "1000";
        cmbGroupFunction0 = cmbGroupFunction0 ?? "none";

        cmbGroupField1 = cmbGroupField1 ?? "1000";
        cmbGroupFunction1 = cmbGroupFunction1 ?? "none";

        cmbGroupField2 = cmbGroupField2 ?? "1000";
        cmbGroupFunction2 = cmbGroupFunction2 ?? "none";

        cmbGroupField3 = cmbGroupField3 ?? "1000";
        cmbGroupFunction3 = cmbGroupFunction3 ?? "none";

        let url = `${REPORT_GENERATOR_HTTPS}/GenerateReport?txtSelectPart=${txtSelectPart}&ConditionsCode=${ConditionsCode}&cmbGroupField0=${cmbGroupField0}&cmbGroupFunction0=${cmbGroupFunction0}&cmbGroupField1=${cmbGroupField1}&cmbGroupFunction1=${cmbGroupFunction1}&cmbGroupField2=${cmbGroupField2}&cmbGroupFunction2=${cmbGroupFunction2}&cmbGroupField3=${cmbGroupField3}&cmbGroupFunction3=${cmbGroupFunction3}&ForSave=${ForSave}`;

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
