// redux imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  captcha: false,
};

const captchaSlice = createSlice({
  name: "captcha",
  initialState,
  reducers: {
    setCaptcha: (state, action) => {
      state.captcha = action.payload;
    },
  },
});

export const { setCaptcha } = captchaSlice.actions;

export default captchaSlice.reducer;
