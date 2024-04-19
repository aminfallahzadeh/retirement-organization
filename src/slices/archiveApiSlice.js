// constant imports
import { USERS_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const archiveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArchiveStructure: builder.query({
      query: (token) => ({
        url: `${USERS_URL_HTTPS}/GetArchiveStructure`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    insertArchiveStructure: builder.mutation({
      query: ({ token, data }) => ({
        url: `${USERS_URL_HTTPS}/InsertArchiveStructure`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    deleteArchiveStructure: builder.mutation({
      query: ({ token, data }) => ({
        url: `${USERS_URL_HTTPS}/DeleteArchiveStructure`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
    updateArchiveStructure: builder.mutation({
      query: ({ token, data }) => ({
        url: `${USERS_URL_HTTPS}/UpdateArchiveStructure`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetArchiveStructureQuery,
  useInsertArchiveStructureMutation,
  useDeleteArchiveStructureMutation,
  useUpdateArchiveStructureMutation,
} = archiveApiSlice;
