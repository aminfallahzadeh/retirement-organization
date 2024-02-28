import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getGroupStatus: false,
  getUserStatus: false,
  getGroupData: [],
  getUserData: [],
};

const userReqSlice = createSlice({
  name: "userReq",
  initialState,
  reducers: {
    setGetGroupStatus: (state, action) => {
      state.getGroupStatus = action.payload;
    },
    setGetGroupData: (state, action) => {
      state.getGroupData = action.payload;
    },

    setGetUserStatus: (state, action) => {
      state.getUserStatus = action.payload;
    },
    setGetUserData: (state, action) => {
      state.getUserData = action.payload;
    },
  },
});

export const {
  setGetGroupStatus,
  setGetGroupData,
  setGetUserStatus,
  setGetUserData,
} = userReqSlice.actions;

export default userReqSlice.reducer;
