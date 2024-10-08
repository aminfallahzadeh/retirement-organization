// CONSTANT
import { FRACTION_URL_HTTPS } from "../constants";

// SLICES
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
          case "728":
            url = `${FRACTION_URL_HTTPS}/InsertFractionTakmili`;
            break;
          case "725":
            url = `${FRACTION_URL_HTTPS}/InsertFractionMogharariMaheAval`;
            break;
          case "767":
            url = `${FRACTION_URL_HTTPS}/InsertFractionSanavatMoavaghe`;
            break;
          case "723":
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

    calculateFraction: builder.mutation({
      query: (data) => ({
        url: `${FRACTION_URL_HTTPS}/CalculateFraction`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetFractionItemViewQuery,
  useGetFractionTypeQuery,
  useInsertFractionExcelMutation,
  useCalculateFractionMutation,
} = fractionApiSlice;
