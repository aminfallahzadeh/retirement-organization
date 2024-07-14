import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredPersonsTableData: [],
  filteredByExcelTableData: [],
};

const batchStatementsDataSlice = createSlice({
  name: "batchStatementsData",
  initialState,
  reducers: {
    setFilteredPersonsTableData: (state, action) => {
      state.filteredPersonsTableData = action.payload;
    },

    setFilteredByExcelTableData: (state, action) => {
      state.filteredByExcelTableData = action.payload;
    },
  },
});

export const { setFilteredPersonsTableData, setFilteredByExcelTableData } =
  batchStatementsDataSlice.actions;

export default batchStatementsDataSlice.reducer;
