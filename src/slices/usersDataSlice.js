import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersTableData: [],
  selectedUserData: [],
};

const usersDataSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    setUsersTableData: (state, action) => {
      state.usersTableData = action.payload;
    },
    setSelectedUserData: (state, action) => {
      state.selectedUserData = action.payload;
    },
  },
});

export const { setUsersTableData, setSelectedUserData } =
  usersDataSlice.actions;

export default usersDataSlice.reducer;
