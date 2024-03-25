// constant imports
import { REQUEST_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const requestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRole: builder.query({
      query: (token) => ({
        url: `${REQUEST_URL_HTTPS}/GetRole`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),

      getRequest: builder.query({
        query: ({
          token,
          role,
          personID,
          requestID,
          requestDateFrom,
          requestDateTo,
        }) => {
          let url = `${REQUEST_URL_HTTPS}/GetRequest?role=${role}`;

          if (personID) {
            url += `&personID=${personID}`;
          }
          if (requestID) {
            url += `&requestID=${requestID}`;
          }
          if (requestDateFrom) {
            url += `&RequestDateFrom=${requestDateFrom}`;
          }
          if (requestDateTo) {
            url += `&RequestDateTo=${requestDateTo}`;
          }

          return {
            url,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          };
        },
      }),
    }),
  }),
});

export const { useGetRoleQuery, useLazyGetRequestQuery, useGetRequestQuery } =
  requestApiSlice;
