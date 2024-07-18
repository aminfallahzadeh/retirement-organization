// redux imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo")).token
    : null,
  refreshToken: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo")).refreshToken
    : null,
  error: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo")).error
    : null,
  expiredate: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo")).expiredate
    : null,

  userID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, refreshToken, error, expiredate } =
        action.payload.itemList[0];
      state.token = token;
      state.refreshToken = refreshToken;
      state.error = error;
      state.expiredate = expiredate;
      sessionStorage.setItem(
        "userInfo",
        JSON.stringify({
          token,
          refreshToken,
          error,
          expiredate,
        })
      );
    },

    setNewCredentials: (state, action) => {
      const { token, expiredate } = action.payload.itemList[0];
      const oldCredentials = JSON.parse(sessionStorage.getItem("userInfo"));
      state.token = token;
      state.expiredate = expiredate;
      sessionStorage.clear();
      sessionStorage.setItem(
        "userInfo",
        JSON.stringify({ ...oldCredentials, token, expiredate })
      );
    },

    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.error = null;
      state.expiredate = null;
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("permissions");
    },

    setUserID: (state, action) => {
      state.userID = action.payload;
    },
  },
});

export const { setCredentials, setNewCredentials, logout, setUserID } =
  authSlice.actions;

export default authSlice.reducer;
