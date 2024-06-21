import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userPermissionsTableData: [],
};

const userPermissionsDataSlice = createSlice({
  name: ":userPermissionsData",
  initialState,
  reducers: {
    setUserPermissionsData: (state, action) => {
      state.userPermissionsTableData = action.payload;
    },
  },
});

export const { setUserPermissionsData } = userPermissionsDataSlice.actions;

export default userPermissionsDataSlice.reducer;
