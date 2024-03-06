import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getPensionerSectionStatus: false,
};

const pensionerSectionSlice = createSlice({
  name: "pensionerSection",
  initialState,
  reducers: {
    setGetPensionerSectionStatus: (state, action) => {
      state.getPensionerSectionStatus = action.payload;
    },
  },
});

export const { setGetPensionerSectionStatus } = pensionerSectionSlice.actions;

export default pensionerSectionSlice.reducer;
