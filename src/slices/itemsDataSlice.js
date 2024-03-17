import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemsTableData: [],
  selectedItemData: null,
};

const itemsDataSlice = createSlice({
  name: "itemsData",
  initialState,
  reducers: {
    setItemsTableData: (state, action) => {
      state.itemsTableData = action.payload;
    },
    setSelectedItemData: (state, action) => {
      state.selectedItemData = action.payload;
    },
    addItemsToTable: (state, action) => {
      state.itemsTableData = [action.payload, ...state.itemsTableData];
    },
    removeItemsFromTable: (state, action) => {
      state.itemsTableData = state.itemsTableData.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setItemsTableData,
  setSelectedItemData,
  addItemsToTable,
  removeItemsFromTable,
} = itemsDataSlice.actions;

export default itemsDataSlice.reducer;
