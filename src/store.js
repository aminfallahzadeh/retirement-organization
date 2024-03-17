// slice imports
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authSliceReducer from "./slices/authSlice";
import captchaSliceReducer from "./slices/captchaSlice";
import userReqSliceReducer from "./slices/userReqSlice";
import statusSliceReducer from "./slices/statusSlice";
import retiredStateSliceReducer from "./slices/retiredStateSlice";
import groupsDataSliceReducer from "./slices/groupsDataSlice";
import itemsDataSliceReducer from "./slices/itemsDataSlice";
import groupItemsDataSliceReducer from "./slices/groupItemsDataSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    captcha: captchaSliceReducer,
    status: statusSliceReducer,
    userReq: userReqSliceReducer,
    retiredState: retiredStateSliceReducer,
    groupsData: groupsDataSliceReducer,
    itemsData: itemsDataSliceReducer,
    groupItemsData: groupItemsDataSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
