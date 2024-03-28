// slice imports
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authSliceReducer from "./slices/authSlice";
import captchaSliceReducer from "./slices/captchaSlice";
import retiredStateSliceReducer from "./slices/retiredStateSlice";
import groupsDataSliceReducer from "./slices/groupsDataSlice";
import itemsDataSliceReducer from "./slices/itemsDataSlice";
import groupItemsDataSliceReducer from "./slices/groupItemsDataSlice";
import usersDataSliceReducer from "./slices/usersDataSlice";
import userGroupsDataSliceReducer from "./slices/userGroupsDataSlice";
import groupsUserDataSliceReducer from "./slices/groupsUserDataSlice";
import requestDataSlice from "./slices/requestDataSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    captcha: captchaSliceReducer,
    retiredState: retiredStateSliceReducer,
    groupsData: groupsDataSliceReducer,
    itemsData: itemsDataSliceReducer,
    groupItemsData: groupItemsDataSliceReducer,
    usersData: usersDataSliceReducer,
    userGroupsData: userGroupsDataSliceReducer,
    groupsUserData: groupsUserDataSliceReducer,
    requestData: requestDataSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
