import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupsData: [],
  userData: [],
  userGroupsData: [],
  itemsData: [],
  groupItemsData: [],
  groupInfo: null,
  itemInfo: null,
  groupItemInfo: null,
};

const userReqSlice = createSlice({
  name: "userReq",
  initialState,
  reducers: {
    setGroupsData: (state, action) => {
      state.groupsData = action.payload;
    },

    setUserData: (state, action) => {
      state.userData = action.payload;
    },

    setUserGroupsData: (state, action) => {
      state.userData = action.payload;
    },

    setItemsData: (state, action) => {
      state.itemsData = action.payload;
    },

    setGroupItemsData: (state, action) => {
      state.groupItemsData = action.payload;
    },

    setGroupInfo: (state, action) => {
      state.groupInfo = action.payload;
    },

    setItemInfo: (state, action) => {
      state.itemInfo = action.payload;
    },

    setGroupItemInfo: (state, action) => {
      state.groupItemInfo = action.payload;
    },

    addGroupItemsDataById: (state, action) => {
      state.groupItemsData = [action.payload, ...state.groupItemsData];
    },

    removeItemsDataById: (state, action) => {
      state.itemsData = state.itemsData.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const {
  setGetGroupStatus,
  setGetUserStatus,
  setGetItemsStatus,
  setGroupsData,
  setUserData,
  setUserGroupsData,
  setItemsData,
  setGroupItemsData,
  setGetUserGroupsStatus,
  setGroupInfo,
  setItemInfo,
  setGroupItemInfo,
  addGroupItemsDataById,
  removeItemsDataById,
} = userReqSlice.actions;

export default userReqSlice.reducer;
