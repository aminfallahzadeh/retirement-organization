// redux imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  captcha: false,
  captchaText: "",
  userInput: "",
};

const captchaSlice = createSlice({
  name: "captcha",
  initialState,
  reducers: {
    setCaptcha: (state, action) => {
      state.captcha = action.payload;
    },

    setCaptchaText: (state, action) => {
      state.captchaText = action.payload;
    },

    setCaptchaInput: (state, action) => {
      state.userInput = action.payload;
    },
  },
});

export const { setCaptcha, setCaptchaInput, setCaptchaText } =
  captchaSlice.actions;

export default captchaSlice.reducer;
