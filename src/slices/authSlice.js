// redux imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).token
    : null,
  refreshToken: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).refreshToken
    : null,
  error: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).error
    : null,
  expiredate: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).expiredate
    : null,
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
      localStorage.setItem(
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
      const oldCredentials = JSON.parse(localStorage.getItem("userInfo"));
      state.token = token;
      state.expiredate = expiredate;
      localStorage.clear();
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...oldCredentials, token, expiredate })
      );
    },

    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.error = null;
      state.expiredate = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, setNewCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
