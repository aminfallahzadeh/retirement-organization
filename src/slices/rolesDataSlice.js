import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rolesData: [],
};

const rolesDataSlice = createSlice({
  name: "rolesData",
  initialState,
  reducers: {
    setRolesData: (state, action) => {
      state.rolesData = action.payload;
    },
  },
});

export const { setRolesData } = rolesDataSlice.actions;

export default rolesDataSlice.reducer;
