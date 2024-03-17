import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemsTableData: [],
  selectedItemData: [],
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
  },
});

export const { setItemsTableData, setSelectedItemData } =
  itemsDataSlice.actions;

export default itemsDataSlice.reducer;
