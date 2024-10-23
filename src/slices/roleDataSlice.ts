import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoleDataState {
  requestTableData: any[];
  selectedRequestData: any[];
  allRequestTableData: any[];
  selectedRequestAllRequests: any[];
  selectedRole: {} | null;
}

const initialState: RoleDataState = {
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
    setSelectedRole: (state, action: PayloadAction<{} | null>) => {
      state.selectedRole = action.payload;
    },
  },
});

export const { setSelectedRole } = roleDataSlice.actions;

export default roleDataSlice.reducer;
