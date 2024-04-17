import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personObject: [],
  pensionaryObject: [],
  pensionaryStatusID: "",
  pensionaryID: "",
  personID: "",
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
    setPensionaryStatusID: (state, action) => {
      state.pensionaryStatusID = action.payload;
    },
    setPensionaryID: (state, action) => {
      state.pensionaryID = action.payload;
    },

    setPersonID: (state, action) => {
      state.personID = action.payload;
    },
  },
});

export const {
  setPersonObject,
  setPensionaryObject,
  setPensionaryStatusID,
  setPensionaryID,
  setPersonID,
} = retiredStateSlice.actions;

export default retiredStateSlice.reducer;
