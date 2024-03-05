// redux imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  captcha: false,
  userInput: "",
};

const captchaSlice = createSlice({
  name: "captcha",
  initialState,
  reducers: {
    setCaptcha: (state, action) => {
      state.captcha = action.payload;
    },

    setCaptchaInput: (state, action) => {
      state.userInput = action.payload;
    },
  },
});

export const { setCaptcha, setCaptchaInput } = captchaSlice.actions;

export default captchaSlice.reducer;
