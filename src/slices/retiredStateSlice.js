import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personObject: [],
  pensionaryObject: [],
};

const retiredStateSlice = createSlice({
  name: "retiredState",
  initialState,
  reducers: {
    setPersonObject: (state, action) => {
      state.personObject = action.payload;
    },

    setPensionaryObject: (state, action) => {
      state.pensionaryObject = action.payload;
    },
  },
});

export const { setPersonObject, setPensionaryObject } =
  retiredStateSlice.actions;

export default retiredStateSlice.reducer;
