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

    getListOfRetirementStatementItem: builder.query({
      query: () => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/GetListOfRetirementStatementItem`,
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

    updateRetirementStatementFormulaGroupSetting: builder.mutation({
      // VIEW MODEL
      // {
      // "retirementStatementFormulaGroupSettingID": "string",
      // "retirementStatementItemID": "string",
      // "description": "string",
      // "value": 0
      // }

      query: (data) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/UpdateRetirementStatementFormulaGroupSetting`,
        method: "POST",
        body: data,
      }),
    }),

    generateGroupStatement: builder.mutation({
      query: ({
        runDate,
        retirementStatementTypeID,
        retirementStatementDesc,
        insertUserID,
        requestID,
      }) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/GenerateGroupStatement?runDate=${runDate}&retirementStatementTypeID=${retirementStatementTypeID}&retirementStatementDesc=${retirementStatementDesc}&insertUserID=${insertUserID}&requestID=${requestID}`,
        method: "POST",
      }),
    }),

    confirmRetirementStatement: builder.mutation({
      query: ({ retirementStatementID, requestID, confirmDate }) => {
        let url = `${RETIREMENT_STATEMENT_URL_HTTPS}/ConfirmRetirementStatement?confirmDate=${confirmDate}`;
        if (retirementStatementID) {
          url += `&retirementStatementID=${retirementStatementID}`;
        }

        if (requestID) {
          url += `&requestID=${requestID}`;
        }
        return {
          url,
          method: "POST",
        };
      },
    }),

    updateRetirementStatementAmount: builder.mutation({
      query: ({
        retirementStatementItemID,
        retirementStatementID,
        retirementStatementItemAmount,
      }) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/UpdateRetirementStatementAmount?retirementStatementItemID=${retirementStatementItemID}&retirementStatementID=${retirementStatementID}&retirementStatementItemAmount=${retirementStatementItemAmount}`,
        method: "POST",
      }),
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
  useGetListOfRetirementStatementItemQuery,
  useLazyGetListOfFormulaGroupSettingQuery,
  useUpdateRetirementStatementFormulaGroupSettingMutation,
  useGenerateGroupStatementMutation,
  useConfirmRetirementStatementMutation,
  useUpdateRetirementStatementAmountMutation,
} = retirementStatementApiSlice;
