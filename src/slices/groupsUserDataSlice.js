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
  },
});

export const { setGroupsUserTableData, setSelectedGroupUserData } =
  groupsUserDataSlice.actions;

export default groupsUserDataSlice.reducer;
