import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getGroupStatus: false,
  getUserStatus: false,
  getItemsStatus: false,
  getUserGroupsStatus: false,
  groupsData: [],
  userData: [],
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
    setGetGroupStatus: (state, action) => {
      state.getGroupStatus = action.payload;
    },

    setGetUserStatus: (state, action) => {
      state.getUserStatus = action.payload;
    },

    setGetItemsStatus: (state, action) => {
      state.getItemsStatus = action.payload;
    },

    setGetUserGroupsStatus: (state, action) => {
      state.getUserGroupsStatus = action.payload;
    },

    setGroupsData: (state, action) => {
      state.groupsData = action.payload;
    },

    setUserData: (state, action) => {
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
