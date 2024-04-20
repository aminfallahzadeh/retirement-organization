import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  archiveStructureData: [],
  selectedArchiveData: [],
  selectedImageData: [],
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
    setSelectedImageData: (state, action) => {
      state.selectedImageData = action.payload;
    },
  },
});

export const {
  setArchiveStructureData,
  setSelectedArchiveData,
  setSelectedImageData,
} = archiveDataSlice.actions;

export default archiveDataSlice.reducer;
