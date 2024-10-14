import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  financialTableData: [],
  payPersonID: null,
  canAddNewItem: false,
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

    setCanAddNewItem: (state, action) => {
      state.canAddNewItem = action.payload;
    },
  },
});

export const { setFinancialTableData, setPayPersonID, setCanAddNewItem } =
  financialDataSlice.actions;

export default financialDataSlice.reducer;
