// constant imports
import { PERSON_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const personApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPersons: builder.query({
      query: ({
        personID,
        personFirstName,
        personLastName,
        personNationalCode,
      }) => {
        let url = `${PERSON_URL_HTTPS}/GetPersons`;

        const queryParams = [];

        if (personID) {
          queryParams.push(`personID=${personID}`);
        }
        if (personFirstName) {
          queryParams.push(`personFirstName=${personFirstName}`);
        }
        if (personLastName) {
          queryParams.push(`personLastName=${personLastName}`);
        }
        if (personNationalCode) {
          queryParams.push(`personNationalCode=${personNationalCode}`);
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        return {
          url,
        };
      },
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
  useLazyGetPersonsQuery,
  useGetPersonsQuery,
  useInsertPersonMutation,
  useUpdatePersonMutation,
  useRemovePersonMutation,
} = personApiSlice;
