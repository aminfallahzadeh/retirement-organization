import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requestTableData: [],
  selectedRequestData: [],
};

const requestsDataSlice = createSlice({
  name: "requestsData",
  initialState,
  reducers: {
    setRequestTableData: (state, action) => {
      state.requestTableData = action.payload;
    },

    setSelectedRequestData: (state, action) => {
      state.selectedRequestData = action.payload;
    },
  },
});

export const { setRequestTableData, setSelectedRequestData } =
  requestsDataSlice.actions;

export default requestsDataSlice.reducer;
