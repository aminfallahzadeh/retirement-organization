import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupsUserTableData: [],
  selectedGroupUserData: null,
};

const groupsUserDataSlice = createSlice({
  name: "groupsUserData",
  initialState,
  reducers: {
    setGroupsUserTableData: (state, action) => {
      state.groupsUserTableData = action.payload;
    },
    setSelectedGroupUserData: (state, action) => {
      state.selectedGroupUserData = action.payload;
    },
    addGroupsToTable: (state, action) => {
      state.groupsUserTableData = [
        action.payload,
        ...state.groupsUserTableData,
      ];
    },
    removeGroupsFromTable: (state, action) => {
      state.groupsUserTableData = state.groupsUserTableData.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setGroupsUserTableData,
  setSelectedGroupUserData,
  addGroupsToTable,
  removeGroupsFromTable,
} = groupsUserDataSlice.actions;

export default groupsUserDataSlice.reducer;
