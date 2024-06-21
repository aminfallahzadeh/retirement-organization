import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permissions: sessionStorage.getItem("permissions")
    ? JSON.parse(sessionStorage.getItem("permissions"))
    : null,
};

const userPermissionsDataSlice = createSlice({
  name: ":userPermissionsData",
  initialState,
  reducers: {
    setUserPermissionsData: (state, action) => {
      state.permissions = action.payload;
      sessionStorage.setItem("permissions", JSON.stringify(action.payload));
    },
  },
});

export const { setUserPermissionsData } = userPermissionsDataSlice.actions;

export default userPermissionsDataSlice.reducer;
