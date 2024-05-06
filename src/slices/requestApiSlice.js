// constant imports
import { REQUEST_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const requestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRole: builder.query({
      query: () => ({
        url: `${REQUEST_URL_HTTPS}/GetRole`,
      }),
    }),
    getExpert: builder.query({
      query: (data) => ({
        url: `${REQUEST_URL_HTTPS}/GetExpert`,
        body: data,
      }),
    }),
    getRequest: builder.query({
      query: ({
        role,
        personID,
        requestID,
        RequestDateFrom,
        RequestDateTo,
      }) => {
        let url = `${REQUEST_URL_HTTPS}/GetRequest`;

        const queryParams = [];
        if (role) {
          queryParams.push(`Role=${role}`);
        }
        if (personID) {
          queryParams.push(`personID=${personID}`);
        }
        if (requestID) {
          queryParams.push(`requestID=${requestID}`);
        }
        if (RequestDateFrom) {
          queryParams.push(`RequestDateFrom=${RequestDateFrom}`);
        }
        if (RequestDateTo) {
          queryParams.push(`RequestDateTo=${RequestDateTo}`);
        }
        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }
        return {
          url,
        };
      },
    }),
    // getRequest: builder.query({
    //   query: ({
    //     role,
    //     personID,
    //     requestID,
    //     RequestDateFrom,
    //     RequestDateTo,
    //   }) => {
    //     let url = `${REQUEST_URL_HTTPS}/GetRequest?Role=${role}`;

    //     if (personID) {
    //       url += `&personID=${personID}`;
    //     }
    //     if (requestID) {
    //       url += `&requestID=${requestID}`;
    //     }
    //     if (RequestDateFrom) {
    //       url += `&RequestDateFrom=${RequestDateFrom}`;
    //     }
    //     if (RequestDateTo) {
    //       url += `&RequestDateTo=${RequestDateTo}`;
    //     }

    //     return {
    //       url,
    //     };
    //   },
    // }),
    insertRequest: builder.mutation({
      query: (data) => ({
        url: `${REQUEST_URL_HTTPS}/InsertRequest`,
        method: "POST",
        body: data,
      }),
    }),
    sendRequestToNextState: builder.mutation({
      query: (data) => ({
        url: `${REQUEST_URL_HTTPS}/SendRequestToNextState`,
        method: "POST",
        body: data,
      }),
    }),
    getRequestType: builder.query({
      query: () => ({
        url: `${REQUEST_URL_HTTPS}/GetRequestType`,
      }),
    }),
  }),
});

export const {
  useGetRoleQuery,
  useGetExpertQuery,
  useGetRequestQuery,
  useGetRequestTypeQuery,
  useInsertRequestMutation,
  useSendRequestToNextStateMutation,
} = requestApiSlice;
