import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  archiveStructureData: [],
  selectedArchiveData: [],
};

const archiveDataSlice = createSlice({
  name: "archiveData",
  initialState,
  reducers: {
    setArchiveStructureData: (state, action) => {
      state.archiveStructureData = action.payload;
    },
    setSelectedArchiveData: (state, action) => {
      state.selectedArchiveData = action.payload;
    },
  },
});

export const { setArchiveStructureData, setSelectedArchiveData } =
  archiveDataSlice.actions;

export default archiveDataSlice.reducer;
