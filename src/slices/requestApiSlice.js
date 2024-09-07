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
      query: ({ RequestID, conditionValue, Role }) => ({
        url: `${REQUEST_URL_HTTPS}/GetExpert?Requestid=${RequestID}&conditionValue=${conditionValue}&Role=${Role}`,
      }),
    }),
    getRequest: builder.query({
      query: ({
        Role,
        personID,
        requestID,
        RequestDateFrom,
        RequestDateTo,
      }) => {
        let url = `${REQUEST_URL_HTTPS}/GetRequest?Role=${Role}`;

        if (personID) {
          url += `&personID=${personID}`;
        }
        if (requestID) {
          url += `&requestID=${requestID}`;
        }
        if (RequestDateFrom) {
          url += `&RequestDateFrom=${RequestDateFrom}`;
        }
        if (RequestDateTo) {
          url += `&RequestDateTo=${RequestDateTo}`;
        }

        return {
          url,
        };
      },
    }),
    insertRequest: builder.mutation({
      query: (data) => ({
        url: `${REQUEST_URL_HTTPS}/InsertRequest`,
        method: "POST",
        body: data,
      }),
    }),
    insertRequestByNationalCode: builder.mutation({
      query: (data) => ({
        url: `${REQUEST_URL_HTTPS}/InsertRequestByNationalCode`,
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

    getRequestHistory: builder.query({
      query: (requestID) => ({
        url: `${REQUEST_URL_HTTPS}/GetRequestHistory?requestID=${requestID}`,
      }),
    }),

    getRequestAttachment: builder.query({
      query: (requestID) => ({
        url: `${REQUEST_URL_HTTPS}/GetRequestAttachment?requestID=${requestID}`,
      }),
    }),

    insertRequestAttachment: builder.mutation({
      query: (data) => ({
        url: `${REQUEST_URL_HTTPS}/InsertRequestAttachment`,
        method: "POST",
        body: data,
      }),
    }),
    getRequestTypeAttachment: builder.query({
      query: (requestTypeID) => ({
        url: `${REQUEST_URL_HTTPS}/GetRequestTypeAttachment?requestTypeID=${requestTypeID}`,
      }),
    }),

    deleteRequestAttachment: builder.mutation({
      // VIEW MODEL
      /*
        {
          "requestAttachmentID": "string",
          "requestID": "string",
          "attachementTypeID": "string",
          "attachementDesc": "string",
          "attachment": "string",
          "contentType": "string",
          "insertUserID": "string",
          "insertTime": "2024-07-31T18:32:23.781Z",
          "updateUserID": "string",
          "updateTime": "2024-07-31T18:32:23.781Z"
        }     
      */
      query: (data) => ({
        url: `${REQUEST_URL_HTTPS}/DeleteRequestAttachment`,
        method: "POST",
        body: data,
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
  useGetRequestHistoryQuery,
  useGetRequestAttachmentQuery,
  useInsertRequestAttachmentMutation,
  useGetRequestTypeAttachmentQuery,
  useDeleteRequestAttachmentMutation,
  useInsertRequestByNationalCodeMutation,
} = requestApiSlice;
