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
      query: ({ pensionaryStatusCategory, pensionaryStatusIsDead }) => {
        let url = `${SHARED_URL_HTTPS}/GetPensionaryStatus`;

        const queryParams = [];

        if (pensionaryStatusCategory) {
          queryParams.push(
            `pensionaryStatusCategory=${pensionaryStatusCategory}`
          );
        }

        if (
          pensionaryStatusIsDead !== undefined &&
          pensionaryStatusIsDead !== null
        ) {
          queryParams.push(`pensionaryStatusIsDead=${pensionaryStatusIsDead}`);
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        return {
          url,
        };
      },
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

    getRetiredOrganization: builder.query({
      query: ({ organizationID }) => {
        let url = `${SHARED_URL_HTTPS}/GetRetiredOrganization`;
        if (organizationID) {
          url += `?organizationID=${organizationID}`;
        }
        return {
          url,
        };
      },
    }),

    getPayItemType: builder.query({
      query: (payItemtypeID) => {
        let url = `${SHARED_URL_HTTPS}/GetPayItemType`;
        if (payItemtypeID) {
          url += `?payItemtypeID=${payItemtypeID}`;
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
  useGetRetiredOrganizationQuery,
  useGetPayItemTypeQuery,
} = sharedApiSlice;
