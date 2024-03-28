import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requestData: [],
};

const requestDataSlice = createSlice({
  name: "requestData",
  initialState,
  reducers: {
    setRequestData: (state, action) => {
      state.requestData = action.payload;
    },
  },
});

export const { setRequestData } = requestDataSlice.actions;

export default requestDataSlice.reducer;
