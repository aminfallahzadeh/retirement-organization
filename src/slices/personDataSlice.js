import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personTableData: [],
  selectedPersonData: null,
};

const personDataSlice = createSlice({
  name: "personData",
  initialState,
  reducers: {
    setPersonTableData: (state, action) => {
      state.personTableData = action.payload;
    },
    setSelectedPersonData: (state, action) => {
      state.selectedPersonData = action.payload;
    },
  },
});

export const { setPersonTableData, setSelectedPersonData } =
  personDataSlice.actions;

export default personDataSlice.reducer;
