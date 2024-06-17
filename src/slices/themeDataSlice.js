import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "default",
  navPanelOpen: false,
};

const themeDataSlice = createSlice({
  name: "themeData",
  initialState,
  reducers: {
    setThemeGlobal: (state, action) => {
      state.theme = action.payload;
    },

    setNavPanelOpen: (state, action) => {
      state.navPanelOpen = action.payload;
    },
  },
});

export const { setThemeGlobal, setNavPanelOpen } = themeDataSlice.actions;

export default themeDataSlice.reducer;
