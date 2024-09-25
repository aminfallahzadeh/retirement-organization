// constant imports
import { PERSONNEL_STATEMENT_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const personnelStatementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPersonnelStatement: builder.query({
      query: ({ personID, PersonnelStatementID }) => {
        let url = `${PERSONNEL_STATEMENT_URL_HTTPS}/GetPersonnelStatement`;

        let queryParams = [];

        if (personID) {
          queryParams.push(`personID=${personID}`);
        }

        if (PersonnelStatementID) {
          queryParams.push(`PersonnelStatementID=${PersonnelStatementID}`);
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        return {
          url,
        };
      },
    }),
    getPersonnelStatementOff: builder.query({
      query: ({ personID }) => ({
        url: `${PERSONNEL_STATEMENT_URL_HTTPS}/GetPersonnelStatementOff?personID=${personID}`,
      }),
    }),

    getPersonnelStatementOffType: builder.query({
      query: () => ({
        url: `${PERSONNEL_STATEMENT_URL_HTTPS}/GetPersonnelStatementOffType`,
      }),
    }),

    getPersonnelStatementDetail: builder.query({
      query: ({ personnelStatementID }) => ({
        url: `${PERSONNEL_STATEMENT_URL_HTTPS}/GetPersonnelStatementDetail?PersonnelStatementID=${personnelStatementID}`,
      }),
    }),
  }),
});

export const {
  useGetPersonnelStatementQuery,
  useGetPersonnelStatementOffQuery,
  useGetPersonnelStatementOffTypeQuery,
  useGetPersonnelStatementDetailQuery,
} = personnelStatementApiSlice;
