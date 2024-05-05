import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heirTableData: [],
  selectedHeirData: null,
};

const heirDataSlice = createSlice({
  name: "heirData",
  initialState,
  reducers: {
    setHeirTableData: (state, action) => {
      state.heirTableData = action.payload;
    },
    setSelectedHeirData: (state, action) => {
      state.selectedHeirData = action.payload;
    },
  },
});

export const { setHeirTableData, setSelectedHeirData } = heirDataSlice.actions;

export default heirDataSlice.reducer;
