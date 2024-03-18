import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userGroupsTableData: [],
  selectedUserGroupData: null,
};

const userGroupsDataSlice = createSlice({
  name: "userGroupsData",
  initialState,
  reducers: {
    setUserGroupsTableData: (state, action) => {
      state.userGroupsTableData = action.payload;
    },
    setSelectedUserGroupData: (state, action) => {
      state.selectedUserGroupData = action.payload;
    },
  },
});

export const { setUserGroupsTableData, setSelectedUserGroupData } =
  userGroupsDataSlice.actions;

export default userGroupsDataSlice.reducer;
