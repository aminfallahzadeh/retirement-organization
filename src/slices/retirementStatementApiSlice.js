// constant imports
import { RETIREMENT_STATEMENT_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const retirementStatementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListOfRetirementStatements: builder.query({
      query: ({ personID, requestID }) => {
        let url = `${RETIREMENT_STATEMENT_URL_HTTPS}/GetListOfRetirementStatements`;

        if (personID) {
          url += `?personID=${personID}`;
        }
        if (requestID) {
          url += `&requestID=${requestID}`;
        }

        return {
          url,
        };
      },
    }),
    generateNewRetirementStatement: builder.mutation({
      query: (data) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/GenerateNewRetirementStatement`,
        method: "POST",
        body: data,
      }),
    }),
    removeRetirementStatement: builder.mutation({
      query: ({ rsID, requestID }) => {
        let url = `${RETIREMENT_STATEMENT_URL_HTTPS}/RemoveRetirementStatement`;

        if (rsID) {
          url += `?rsID=${rsID}`;
        }
        if (requestID) {
          url += `&requestID=${requestID}`;
        }
        return {
          method: "POST",
          url,
        };
      },
    }),
    getRetirementStatement: builder.query({
      query: ({ RetirementStatementID }) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/GetRetirementStatement?RetirementStatementID=${RetirementStatementID}`,
      }),
    }),

    getStatementListFromFilters: builder.mutation({
      query: (data) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/GetStatementListFromFilters`,
        method: "POST",
        body: data,
      }),
    }),

    getStatementListFromExcel: builder.mutation({
      query: (data) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/GetStatementListFromExcel`,
        method: "POST",
        body: data,
      }),
    }),

    getListOfFormulaGroupSetting: builder.query({
      query: ({ retirementStatementItemID }) => {
        let url = `${RETIREMENT_STATEMENT_URL_HTTPS}/GetListOfFormulaGroupSetting`;
        const queryParams = [];

        if (retirementStatementItemID) {
          queryParams.push(
            `retirementStatementItemID=${retirementStatementItemID}`
          );
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        return {
          url,
        };
      },
    }),
  }),
});

export const {
  useGetListOfRetirementStatementsQuery,
  useGenerateNewRetirementStatementMutation,
  useRemoveRetirementStatementMutation,
  useGetRetirementStatementQuery,
  useLazyGetRetirementStatementQuery,
  useGetStatementListFromFiltersMutation,
  useGetStatementListFromExcelMutation,
  useGetListOfFormulaGroupSettingQuery,
} = retirementStatementApiSlice;
