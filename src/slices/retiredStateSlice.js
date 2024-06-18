import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personDeathDate: null,
  personID: "",
  pensionaryID: "",
  isPensionary: false,
};

const retiredStateSlice = createSlice({
  name: "retiredState",
  initialState,
  reducers: {
    setPersonDeathDate: (state, action) => {
      state.personDeathDate = action.payload;
    },
    setIsPensionary: (state, action) => {
      state.isPensionary = action.payload;
    },
  },
});

export const { setPersonDeathDate, setPensionaryID } =
  retiredStateSlice.actions;

export default retiredStateSlice.reducer;
