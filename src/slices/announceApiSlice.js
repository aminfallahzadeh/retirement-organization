// constant imports
import { ANNOUNCE_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const announceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnnounce: builder.query({
      query: () => ({
        url: `${ANNOUNCE_HTTPS}/GetAnnounce`,
      }),
    }),

    insertAnnounce: builder.mutation({
      query: (data) => ({
        url: `${ANNOUNCE_HTTPS}/InsertAnnounce`,
        method: "POST",
        body: data,
      }),
    }),

    deleteAnnounce: builder.mutation({
      query: (data) => ({
        url: `${ANNOUNCE_HTTPS}/DeleteAnnounce`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAnnounceQuery,
  useInsertAnnounceMutation,
  useDeleteAnnounceMutation,
} = announceApiSlice;
