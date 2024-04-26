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
    generateNewRetirementStatement: builder.query({
      query: () => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/GenerateNewRetirementStatement`,
      }),
    }),
    insertRetirementStatement: builder.mutation({
      query: (data) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/InsertRetirementStatement`,
        method: "POST",
        body: data,
      }),
    }),
    updateRetirementStatement: builder.mutation({
      query: (data) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/UpdateRetirementStatement`,
        method: "POST",
        body: data,
      }),
    }),
    addRetiremnetStatementAmount: builder.mutation({
      query: (data) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/AddRetiremnetStatementAmount`,
        method: "POST",
        body: data,
      }),
    }),
    addRetirementStatementRelated: builder.mutation({
      query: (data) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/AddRetirementStatementRelated`,
        method: "POST",
        body: data,
      }),
    }),
    removeRetirementStatementRelated: builder.mutation({
      query: (data) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/RemoveRetirementStatementRelated`,
        method: "POST",
        body: data,
      }),
    }),
    removeRetirementStatementAmount: builder.mutation({
      query: (data) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/RemoveRetirementStatementAmount`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetListOfRetirementStatementsQuery,
  useGenerateNewRetirementStatementQuery,
  useInsertRetirementStatementMutation,
  useUpdateRetirementStatementMutation,
  useAddRetiremnetStatementAmountMutation,
  useAddRetirementStatementRelatedMutation,
  useRemoveRetirementStatementRelatedMutation,
  useRemoveRetirementStatementAmountMutation,
} = retirementStatementApiSlice;
