import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  slipsTableData: [],
  selectedSlipData: null,
};

const slipsDataSlice = createSlice({
  name: "slipsData",
  initialState,
  reducers: {
    setSlipsTableData(state, action) {
      state.slipsTableData = action.payload;
    },
    setSelectedSlipData(state, action) {
      state.selectedSlipData = action.payload;
    },
  },
});

export const { setSlipsTableData, setSelectedSlipData } =
  slipsDataSlice.actions;

export default slipsDataSlice.reducer;
