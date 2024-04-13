import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  archiveStructureData: [],
};

const archiveDataSlice = createSlice({
  name: "archiveData",
  initialState,
  reducers: {
    setArchiveStructureData: (state, action) => {
      state.archiveStructureData = action.payload;
    },
  },
});

export const { setArchiveStructureData } = archiveDataSlice.actions;

export default archiveDataSlice.reducer;
