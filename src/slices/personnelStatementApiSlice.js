// constant imports
import { PERSONNEL_STATEMENT_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const personnelStatementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPersonnelStatement: builder.query({
      query: ({ personID }) => ({
        url: `${PERSONNEL_STATEMENT_URL_HTTPS}/GetPersonnelStatement?personID=${personID}`,
      }),
    }),
    getPersonnelStatementOff: builder.query({
      query: ({ personID }) => ({
        url: `${PERSONNEL_STATEMENT_URL_HTTPS}/GetPersonnelStatementOff?personID=${personID}`,
      }),
    }),
  }),
});

export const {
  useGetPersonnelStatementQuery,
  useGetPersonnelStatementOffQuery,
} = personnelStatementApiSlice;
