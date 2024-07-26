import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fractionType: "group",
  periodsTableData: [],
};

const fractionDataSlice = createSlice({
  name: "fractionData",
  initialState,
  reducers: {
    setFractionType: (state, action) => {
      state.fractionType = action.payload;
    },

    setPeriodsTableData: (state, action) => {
      state.periodsTableData = [...state.periodsTableData, action.payload];
    },

    removePeriodRecord(state, action) {
      state.periodsTableData = state.periodsTableData.filter(
        (record) => record.id !== action.payload
      );
    },
  },
});

export const { setFractionType, setPeriodsTableData, removePeriodRecord } =
  fractionDataSlice.actions;

export default fractionDataSlice.reducer;
