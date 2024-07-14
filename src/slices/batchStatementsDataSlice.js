import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredPersonsTableData: [],
};

const batchStatementsDataSlice = createSlice({
  name: "batchStatementsData",
  initialState,
  reducers: {
    setFilteredPersonsTableData: (state, action) => {
      state.filteredPersonsTableData = action.payload;
    },
  },
});

export const { setFilteredPersonsTableData } = batchStatementsDataSlice.actions;

export default batchStatementsDataSlice.reducer;
