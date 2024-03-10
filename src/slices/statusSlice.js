import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getGroupStatus: false,
  getUserStatus: false,
  getUserGroupsStatus: false,
  getItemsStatus: false,
  getPensionerSectionStatus: false,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setGetGroupStatus: (state, action) => {
      state.getGroupStatus = action.payload;
    },
    setGetUserStatus: (state, action) => {
      state.getUserStatus = action.payload;
    },
    setGetItemsStatus: (state, action) => {
      state.getItemsStatus = action.payload;
    },
    setGetUserGroupsStatus: (state, action) => {
      state.getUserGroupsStatus = action.payload;
    },
    setGetPensionerSectionStatus: (state, action) => {
      state.getPensionerSectionStatus = action.payload;
    },
  },
});

export const {
  setGetGroupStatus,
  setGetUserStatus,
  setGetItemsStatus,
  setGetUserGroupsStatus,
  setGetPensionerSectionStatus,
} = statusSlice.actions;

export default statusSlice.reducer;
