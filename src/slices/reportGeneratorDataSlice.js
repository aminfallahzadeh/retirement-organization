import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queryCondi: "",
  selectIDs: "",
};

const reportGeneratorDataSlice = createSlice({
  name: "reportGeneratorData",
  initialState,
  reducers: {
    setQueryCondi: (state, action) => {
      state.queryCondi = action.payload;
    },

    setSelectIDs: (state, action) => {
      state.selectIDs = action.payload;
    },
  },
});

export const { setQueryCondi, setSelectIDs } = reportGeneratorDataSlice.actions;

export default reportGeneratorDataSlice.reducer;
