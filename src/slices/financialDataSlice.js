import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  financialTableData: [],
};

const financialDataSlice = createSlice({
  name: "financialData",
  initialState,
  reducers: {
    setFinancialTableData: (state, action) => {
      state.financialTableData = action.payload;
    },
  },
});

export const { setFinancialTableData } = financialDataSlice.actions;

export default financialDataSlice.reducer;
