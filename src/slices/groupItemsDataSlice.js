import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupItemsTableData: [],
  selectedGroupItemData: [],
};

const groupItemsDataSlice = createSlice({
  name: "groupItemsData",
  initialState,
  reducers: {
    setGroupItemsTableData: (state, action) => {
      state.groupItemsTableData = action.payload;
    },
    setSelectedGroupItemData: (state, action) => {
      state.selectedGroupItemData = action.payload;
    },
    addGroupItems: (state, action) => {
      state.groupItemsTableData = [
        ...state.groupItemsTableData,
        action.payload,
      ];
    },
  },
});

export const {
  setGroupItemsTableData,
  setSelectedGroupItemData,
  addGroupItems,
} = groupItemsDataSlice.actions;

export default groupItemsDataSlice.reducer;
