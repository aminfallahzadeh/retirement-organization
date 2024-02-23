// redux imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  token: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).itemList[0].token
    : null,
  refreshToken: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).itemList[0].refreshToken
    : null,
  expDate: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).itemList[0].expiredate
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.token = action.payload.itemList[0].token;
      state.refreshToken = action.payload.itemList[0].refreshToken;
      state.expDate = action.payload.itemList[0].expiredate;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
