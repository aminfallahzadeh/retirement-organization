// constant imports
import { USER_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const archiveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArchiveStructure: builder.query({
      query: (token) => ({
        url: `${USER_URL_HTTPS}/GetArchiveStructure`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetArchiveStructureQuery } = archiveApiSlice;
