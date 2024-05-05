import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "default",
};

const themeDataSlice = createSlice({
  name: "themeData",
  initialState,
  reducers: {
    setThemeGlobal: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setThemeGlobal } = themeDataSlice.actions;

export default themeDataSlice.reducer;
