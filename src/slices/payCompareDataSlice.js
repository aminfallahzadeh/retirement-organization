import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payCompareTableData: [],
};

const payCompareDataSlice = createSlice({
  name: "payCompareData",
  initialState,
  reducers: {
    setPayCompareTableData: (state, action) => {
      state.payCompareTableData = action.payload;
    },
  },
});

export const { setPayCompareTableData } = payCompareDataSlice.actions;

export default payCompareDataSlice.reducer;
