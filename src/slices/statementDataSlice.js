import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statementTableData: [],
  selectedStatementData: [],
};

const statementDataSlice = createSlice({
  name: "statementData",
  initialState,
  reducers: {
    setStatementTableData: (state, action) => {
      state.statementTableData = action.payload;
    },
    setSelectedStatementData: (state, action) => {
      state.selectedStatementData = action.payload;
    },
  },
});

export const { setStatementTableData, setSelectedStatementData } =
  statementDataSlice.actions;

export default statementDataSlice.reducer;
