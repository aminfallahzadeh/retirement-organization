import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personDeathDate: null,
  personID: "",
  pensionaryID: "",
};

const retiredStateSlice = createSlice({
  name: "retiredState",
  initialState,
  reducers: {
    setPersonDeathDate: (state, action) => {
      state.personDeathDate = action.payload;
    },
    setPersonID: (state, action) => {
      state.personID = action.payload;
    },
    setPensionaryID: (state, action) => {
      state.pensionaryID = action.payload;
    },
  },
});

export const { setPersonDeathDate, setPersonID, setPensionaryID } =
  retiredStateSlice.actions;

export default retiredStateSlice.reducer;
