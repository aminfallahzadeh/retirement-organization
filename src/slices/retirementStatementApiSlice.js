// constant imports
import { RETIREMENT_STATEMENT_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const retirementStatementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListOfRetirementStatements: builder.query({
      query: ({ token, personID }) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/GetListOfRetirementStatements?personID=${personID}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    generateNewRetirementStatement: builder.query({
      query: (token) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/GenerateNewRetirementStatement`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    insertRetirementStatement: builder.mutation({
      query: ({ token, data }) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/InsertRetirementStatement`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    updateRetirementStatement: builder.mutation({
      query: ({ token, data }) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/UpdateRetirementStatement`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    addRetiremnetStatementAmount: builder.mutation({
      query: ({ token, data }) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/AddRetiremnetStatementAmount`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    addRetirementStatementRelated: builder.mutation({
      query: ({ token, data }) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/AddRetirementStatementRelated`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    removeRetirementStatementRelated: builder.mutation({
      query: ({ token, data }) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/RemoveRetirementStatementRelated`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    removeRetirementStatementAmount: builder.mutation({
      query: ({ token, data }) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/RemoveRetirementStatementAmount`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
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
