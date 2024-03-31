// constant imports
import { RETIREMENT_STATEMENT_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const retirementStatementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRetirementStatement: builder.query({
      query: ({ token, RetirementStatementID }) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/GetRetirementStatement?RetirementStatementID=${RetirementStatementID}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    getListOfRetirementStatement: builder.query({
      query: (token) => ({
        url: `${RETIREMENT_STATEMENT_URL_HTTPS}/GetListOfRetirementStatement`,
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
  useGetRetirementStatementQuery,
  useGetListOfRetirementStatementQuery,
  useGenerateNewRetirementStatementQuery,
  useInsertRetirementStatementMutation,
  useUpdateRetirementStatementMutation,
  useAddRetiremnetStatementAmountMutation,
  useAddRetirementStatementRelatedMutation,
  useRemoveRetirementStatementRelatedMutation,
  useRemoveRetirementStatementAmountMutation,
} = retirementStatementApiSlice;
