// constant imports
import { USERS_URL } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/Login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
