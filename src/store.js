// slice imports
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authSliceReducer from "./slices/authSlice";
import captchaSliceReducer from "./slices/captchaSlice";
import userReqSliceReducer from "./slices/userReqSlice";
import statusSliceReducer from "./slices/statusSlice";
import pensionerSectionSliceReducer from "./slices/pensionerSectionSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    captcha: captchaSliceReducer,
    status: statusSliceReducer,
    userReq: userReqSliceReducer,
    pensionerSection: pensionerSectionSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
