// constant imports
import { PERSON_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const personApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPerson: builder.query({
      query: (token) => ({
        url: `${PERSON_URL_HTTPS}/GetPerson`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }),
      insertPerson: builder.mutation({
        query: ({ token, data }) => ({
          url: `${PERSON_URL_HTTPS}/InsertPerson`,
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }),
      }),
      updatePerson: builder.mutation({
        query: ({ token, data }) => ({
          url: `${PERSON_URL_HTTPS}/UpdatePerson`,
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }),
      }),
      removePerson: builder.mutation({
        query: ({ token, id }) => ({
          url: `${PERSON_URL_HTTPS}/RemovePerson?id=${id}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }),
      }),
    }),
  }),
});

export const {
  useGetPersonQuery,
  useInsertPersonMutation,
  useUpdatePersonMutation,
  useRemovePersonMutation,
} = personApiSlice;
