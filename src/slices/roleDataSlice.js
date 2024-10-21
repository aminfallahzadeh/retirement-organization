import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requestTableData: [],
  selectedRequestData: [],
  allRequestTableData: [],
  selectedRequestAllRequests: [],
  selectedRole: null,
};

const roleDataSlice = createSlice({
  name: "requestsData",
  initialState,
  reducers: {
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
  },
});

export const { setSelectedRole } = roleDataSlice.actions;

export default roleDataSlice.reducer;
