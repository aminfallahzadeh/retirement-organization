import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requestTableData: [],
  selectedRequestData: [],
  allRequestTableData: [],
  selectedRequestAllRequests: [],
  selectedRole: "",
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

    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
  },
});

export const { setRequestTableData, setSelectedRequestData, setSelectedRole } =
  requestsDataSlice.actions;

export default requestsDataSlice.reducer;
