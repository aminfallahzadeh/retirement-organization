// constant imports
import { FRACTION_URL_HTTPS } from "../constants";

// slice imports
import { apiSlice } from "./apiSlice";

export const fractionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFractionItemView: builder.query({
      query: ({ personID }) => ({
        url: `${FRACTION_URL_HTTPS}/GetFractionItemView?personID=${personID}`,
      }),
    }),

    getFractionType: builder.query({
      query: () => ({
        url: `${FRACTION_URL_HTTPS}/GetFractionType`,
      }),
    }),

    insertFractionExcel: builder.mutation({
      query: ({ data, type }) => {
        let url;

        switch (type) {
          case "5":
            url = `${FRACTION_URL_HTTPS}/InsertFractionTakmili`;
            break;
          case "2":
            url = `${FRACTION_URL_HTTPS}/InsertFractionMogharariMaheAval`;
            break;
          case "3":
            url = `${FRACTION_URL_HTTPS}/InsertFractionSanavatMoavaghe`;
            break;
          case "1":
            url = `${FRACTION_URL_HTTPS}/InsertFractionJari`;
            break;
          default:
            throw new Error(`Unsupported type: ${type}`);
        }

        return {
          url,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetFractionItemViewQuery,
  useGetFractionTypeQuery,
  useInsertFractionExcelMutation,
} = fractionApiSlice;
