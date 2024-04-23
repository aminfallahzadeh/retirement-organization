import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pensionaryObject: [],
  pensionaryStatusID: "",
};

const retiredStateSlice = createSlice({
  name: "retiredState",
  initialState,
  reducers: {
    setPensionaryObject: (state, action) => {
      state.pensionaryObject = action.payload;
    },

    setPensionaryStatusID: (state, action) => {
      state.pensionaryStatusID = action.payload;
    },
  },
});

export const { setPensionaryObject, setPensionaryStatusID } =
  retiredStateSlice.actions;

export default retiredStateSlice.reducer;
