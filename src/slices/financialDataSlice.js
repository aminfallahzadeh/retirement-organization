import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  financialTableData: [],
  payPersonID: null,
};

const financialDataSlice = createSlice({
  name: "financialData",
  initialState,
  reducers: {
    setFinancialTableData: (state, action) => {
      state.financialTableData = action.payload;
    },

    setPayPersonID: (state, action) => {
      state.payPersonID = action.payload;
    },
  },
});

export const { setFinancialTableData, setPayPersonID } =
  financialDataSlice.actions;

export default financialDataSlice.reducer;
