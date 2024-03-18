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
    addUserGroup: (state, action) => {
      state.userGroupsTableData = [
        action.payload,
        ...state.userGroupsTableData,
      ];
    },
    removeUserGroups: (state, action) => {
      state.userGroupsTableData = state.userGroupsTableData.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setUserGroupsTableData,
  setSelectedUserGroupData,
  addUserGroup,
  removeUserGroups,
} = userGroupsDataSlice.actions;

export default userGroupsDataSlice.reducer;
