import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupsTableData: [],
  selectedGroupData: [],
};

const groupsDataSlice = createSlice({
  name: "groupsData",
  initialState,
  reducers: {
    setGroupsTableData: (state, action) => {
      state.groupsTableData = action.payload;
    },
    setSelectedGroupData: (state, action) => {
      state.selectedGroupData = action.payload;
    },
  },
});

export const { setGroupsTableData, setSelectedGroupData } =
  groupsDataSlice.actions;

export default groupsDataSlice.reducer;
