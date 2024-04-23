import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personDeathDate: null,
  personID: "",
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
  },
});

export const { setPersonDeathDate, setPersonID } = retiredStateSlice.actions;

export default retiredStateSlice.reducer;
