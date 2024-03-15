import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  retiredData: [],
};

const retiredStateSlice = createSlice({
  name: "retiredState",
  initialState,
  reducers: {
    setRetiredData: (state, action) => {
      state.retiredData = action.payload;
    },
  },
});

export const { setRetiredData } = retiredStateSlice.actions;

export default retiredStateSlice.reducer;
