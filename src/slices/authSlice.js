// redux imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo"))
    : null,
  token: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo")).itemList[0].token
    : null,
  refreshToken: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo")).itemList[0].refreshToken
    : null,
  expDate: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo")).itemList[0].expiredate
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
      sessionStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    setNewCredentials: (state, action) => {
      const { token, expiredate } = action.payload.itemList[0];
      state.userInfo.itemList[0].token = token;
      state.userInfo.itemList[0].expiredate = expiredate;
      state.token = token;
      state.refreshToken = state.userInfo.itemList[0].refreshToken;
      state.expDate = expiredate;
      console.log(state.userInfo);
      sessionStorage.clear();
      sessionStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },

    logout: (state) => {
      state.userInfo = null;
      sessionStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, setNewCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
