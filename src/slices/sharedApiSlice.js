// constant imports
import { SHARED_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const sharedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLookupData: builder.query({
      query: ({ lookUpType, lookUpID, lookUpParentID }) => {
        let url = `${SHARED_URL_HTTPS}/GetLookupData?lookUpType=${lookUpType}`;

        if (lookUpID) {
          url += `&lookUpID=${lookUpID}`;
        }

        if (lookUpParentID) {
          url += `&lookUpParentID=${lookUpParentID}`;
        }
        return {
          url,
        };
      },
    }),
    getRelationship: builder.query({
      query: () => ({
        url: `${SHARED_URL_HTTPS}/GetRelationship`,
      }),
    }),
    getPensionaryStatus: builder.query({
      query: ({ pensionaryStatusCategory, pensionaryStatusIsDead }) => ({
        url: `${SHARED_URL_HTTPS}/GetPensionaryStatus?pensionaryStatusCategory=${pensionaryStatusCategory}&pensionaryStatusIsDead=${pensionaryStatusIsDead}`,
      }),
    }),

    getRetirementStatementType: builder.query({
      query: ({ RetirementStatementTypeID }) => {
        let url = `${SHARED_URL_HTTPS}/GetRetirementStatementType`;

        if (RetirementStatementTypeID) {
          url += `?RetirementStatementTypeID=${RetirementStatementTypeID}`;
        }

        return {
          url,
        };
      },
    }),
  }),
});

export const {
  useGetLookupDataQuery,
  useLazyGetLookupDataQuery,
  useGetRelationshipQuery,
  useGetPensionaryStatusQuery,
  useGetRetirementStatementTypeQuery,
  useLazyGetRetirementStatementTypeQuery,
} = sharedApiSlice;
