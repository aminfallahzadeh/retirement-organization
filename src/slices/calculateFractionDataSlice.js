import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const calculateFractionDataSlice = createSlice({
  name: "calculateFractionData",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = calculateFractionDataSlice.actions;

export default calculateFractionDataSlice.reducer;
