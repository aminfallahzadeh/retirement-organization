import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getGroupStatus: false,
  getGroupData: [],
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
  },
});

export const { setGetGroupStatus, setGetGroupData } = userReqSlice.actions;

export default userReqSlice.reducer;
