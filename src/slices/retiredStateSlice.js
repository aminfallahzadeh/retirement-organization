import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personObject: [],
};

const retiredStateSlice = createSlice({
  name: "retiredState",
  initialState,
  reducers: {
    setPersonObject: (state, action) => {
      state.personObject = action.payload;
    },
  },
});

export const { setPersonObject } = retiredStateSlice.actions;

export default retiredStateSlice.reducer;
