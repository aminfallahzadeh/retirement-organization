import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupItemsTableData: [],
  selectedGroupItemData: null,
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
        action.payload,
        ...state.groupItemsTableData,
      ];
    },
    removeGroupItems: (state, action) => {
      state.groupItemsTableData = state.groupItemsTableData.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setGroupItemsTableData,
  setSelectedGroupItemData,
  addGroupItems,
  removeGroupItems,
} = groupItemsDataSlice.actions;

export default groupItemsDataSlice.reducer;
