// constant imports
import { SHARED_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const sharedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLookupData: builder.query({
      query: ({ lookUpType, lookUpID }) => {
        let url = `${SHARED_URL_HTTPS}/GetLookupData?lookUpType=${lookUpType}`;
        if (lookUpID) {
          url += `&lookUpID=${lookUpID}`;
        }
        return {
          url: url,
        };
      },
    }),
    getRelationship: builder.query({
      query: () => ({
        url: `${SHARED_URL_HTTPS}/GetRelationship`,
      }),
    }),
    getPensionaryStatus: builder.query({
      query: ({ pensionaryStatusCategory }) => ({
        url: `${SHARED_URL_HTTPS}/GetPensionaryStatus?pensionaryStatusCategory=${pensionaryStatusCategory}`,
      }),
    }),
  }),
});

export const {
  useGetLookupDataQuery,
  useGetRelationshipQuery,
  useGetPensionaryStatusQuery,
} = sharedApiSlice;
