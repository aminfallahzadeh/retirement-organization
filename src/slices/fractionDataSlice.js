import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fractionType: "group",
};

const fractionDataSlice = createSlice({
  name: "fractionData",
  initialState,
  reducers: {
    setFractionType: (state, action) => {
      state.fractionType = action.payload;
    },
  },
});

export const { setFractionType } = fractionDataSlice.actions;

export default fractionDataSlice.reducer;
