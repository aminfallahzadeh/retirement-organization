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
  }),
});

export const { useGetAnnounceQuery } = announceApiSlice;
