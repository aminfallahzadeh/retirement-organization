// CONSTANT
import { FINANCIAL_URL_HTTPS } from "../constants";

// SLICES
import { apiSlice } from "./apiSlice";

export const financialItemApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialItems: builder.query({
      query: (personID) => ({
        url: `${FINANCIAL_URL_HTTPS}/GetFinancialItems?personID=${personID}`,
      }),
    }),

    getFinancialItem: builder.query({
      query: (FinancialItemID) => ({
        url: `${FINANCIAL_URL_HTTPS}/GetFinancialItem?FinancialItemID=${FinancialItemID}`,
      }),
    }),

    insertFinancialItem: builder.mutation({
      /* 
        SCHEMA
        {
  "financialItemID": "string",
  "personID": "string",
  "payItemTypeID": "string",
  "payItemTypeName": "string",
  "financialItemAmount": 0,
  "instalementAmount": 0,
  "instalementCount": 0,
  "remainedAmount": 0,
  "executeYear": 0,
  "executeMonth": 0,
  "expireDate": "2024-10-11T09:10:17.242Z"
          }
      */
      query: (data) => ({
        url: `${FINANCIAL_URL_HTTPS}/InsertFinancialItem`,
        method: "POST",
        body: data,
      }),
    }),

    removeFinancialItem: builder.mutation({
      query: (ID) => ({
        url: `${FINANCIAL_URL_HTTPS}/RemoveFinancialItem?ID=${ID}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLazyGetFinancialItemsQuery,
  useLazyGetFinancialItemQuery,
  useGetFinancialItemQuery,
  useInsertFinancialItemMutation,
  useRemoveFinancialItemMutation,
} = financialItemApiSlice;
