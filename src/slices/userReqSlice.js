import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getGroupStatus: false,
  getUserStatus: false,
  getItemsStatus: false,
  getGroupId: "",
};

const userReqSlice = createSlice({
  name: "userReq",
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

    setGetGroupId: (state, action) => {
      state.getGroupId = action.payload;
    },
  },
});

export const {
  setGetGroupStatus,
  setGetUserStatus,
  setGetItemsStatus,
  setGetGroupId,
} = userReqSlice.actions;

export default userReqSlice.reducer;
