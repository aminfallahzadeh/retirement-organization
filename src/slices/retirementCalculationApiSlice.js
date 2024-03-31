// constant imports
import { RETIREMENT_CALCULATION_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const retirementCalculationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateRetirementCalculation: builder.query({
      query: (token) => ({
        url: `${RETIREMENT_CALCULATION_URL_HTTPS}/GenerateRetirementCalculation`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    insertRetirementCalculation: builder.mutation({
      query: ({ token, data }) => ({
        url: `${RETIREMENT_CALCULATION_URL_HTTPS}/InsertRetirementCalculation`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    updateRetiremnentCalculation: builder.mutation({
      query: ({ token, data }) => ({
        url: `${RETIREMENT_CALCULATION_URL_HTTPS}/UpdateRetirementCalculation`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    removeRetirementCalculation: builder.mutation({
      query: ({ token, id }) => ({
        url: `${RETIREMENT_CALCULATION_URL_HTTPS}/RemoveRetirementCalculation?id=${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGenerateRetirementCalculationQuery,
  useInsertRetirementCalculationMutation,
  useUpdateRetiremnentCalculationMutation,
  useRemoveRetirementCalculationMutation,
} = retirementCalculationApiSlice;
