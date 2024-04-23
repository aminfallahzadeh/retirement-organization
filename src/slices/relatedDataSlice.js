import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  relatedTableData: [],
  selectedRelatedData: null,
};

const relatedDataSlice = createSlice({
  name: "relatedData",
  initialState,
  reducers: {
    setRelatedTableData: (state, action) => {
      state.relatedTableData = action.payload;
    },
    setSelectedRelatedData: (state, action) => {
      state.selectedRelatedData = action.payload;
    },
  },
});

export const { setRelatedTableData, setSelectedRelatedData } =
  relatedDataSlice.actions;

export default relatedDataSlice.reducer;
