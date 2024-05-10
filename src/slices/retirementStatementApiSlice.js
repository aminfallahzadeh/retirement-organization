// constant imports
import { RETIREMENT_STATEMENT_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const retirementStatementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListOfRetirementStatements: builder.query({
      query: (personID) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/GetListOfRetirementStatements?personID=${personID}`,
      }),
    }),
    generateNewRetirementStatement: builder.mutation({
      query: (data) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/GenerateNewRetirementStatement`,
        method: "POST",
        body: data,
      }),
    }),
    removeRetirementStatement: builder.mutation({
      query: ({ rsID }) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/RemoveRetirementStatement?rsID=${rsID}`,
        method: "POST",
      }),
    }),
    getRetirementStatement: builder.query({
      query: ({ RetirementStatementID }) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/GetRetirementStatement?RetirementStatementID=${RetirementStatementID}`,
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
} = retirementStatementApiSlice;
