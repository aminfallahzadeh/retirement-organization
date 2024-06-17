// slice imports
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authSliceReducer from "./slices/authSlice";
import captchaSliceReducer from "./slices/captchaSlice";
import retiredStateSliceReducer from "./slices/retiredStateSlice";
import roleDataSliceReducer from "./slices/roleDataSlice";
import itemsDataSliceReducer from "./slices/itemsDataSlice";
import groupItemsDataSliceReducer from "./slices/groupItemsDataSlice";
import userGroupsDataSliceReducer from "./slices/userGroupsDataSlice";
import groupsUserDataSliceReducer from "./slices/groupsUserDataSlice";
import archiveDataSliceReducer from "./slices/archiveDataSlice";
import heirDataSliceReducer from "./slices/heirDataSlice";
import personDataSliceReducer from "./slices/personDataSlice";
import themeDataSliceReducer from "./slices/themeDataSlice";
import slipsDataSliceReducer from "./slices/slipsDataSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    captcha: captchaSliceReducer,
    retiredState: retiredStateSliceReducer,
    itemsData: itemsDataSliceReducer,
    groupItemsData: groupItemsDataSliceReducer,
    userGroupsData: userGroupsDataSliceReducer,
    groupsUserData: groupsUserDataSliceReducer,
    roleData: roleDataSliceReducer,
    archiveData: archiveDataSliceReducer,
    heirData: heirDataSliceReducer,
    personData: personDataSliceReducer,
    themeData: themeDataSliceReducer,
    slipsData: slipsDataSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
