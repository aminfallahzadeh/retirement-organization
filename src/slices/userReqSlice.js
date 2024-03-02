import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getGroupStatus: false,
  getUserStatus: false,
  getItemsStatus: false,
  getGroupInfo: null,
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

    setGetGroupInfo: (state, action) => {
      state.getGroupInfo = action.payload;
    },
  },
});

export const {
  setGetGroupStatus,
  setGetUserStatus,
  setGetItemsStatus,
  setGetGroupInfo,
} = userReqSlice.actions;

export default userReqSlice.reducer;
