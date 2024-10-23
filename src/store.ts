// slice imports
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/slices/apiSlice";
import authSliceReducer from "@/slices/authSlice";
import userPermissionsDataSliceReducer from "@/slices/userPermissionsDataSlice";
import captchaSliceReducer from "@/slices/captchaSlice";
import retiredStateSliceReducer from "@/slices/retiredStateSlice";
import roleDataReducer from "@/slices/roleDataSlice";
import itemsDataSliceReducer from "@/slices/itemsDataSlice";
import groupItemsDataSliceReducer from "@/slices/groupItemsDataSlice";
import userGroupsDataSliceReducer from "@/slices/userGroupsDataSlice";
import groupsUserDataSliceReducer from "@/slices/groupsUserDataSlice";
import archiveDataSliceReducer from "@/slices/archiveDataSlice";
import heirDataSliceReducer from "@/slices/heirDataSlice";
import personDataSliceReducer from "@/slices/personDataSlice";
import themeDataSliceReducer from "@/slices/themeDataSlice";
import slipsDataSliceReducer from "@/slices/slipsDataSlice";
import batchStatementsDataSliceReducer from "@/slices/batchStatementsDataSlice";
import fractionDataSliceReducer from "@/slices/fractionDataSlice";
import calculateFractionDataSliceReducer from "@/slices/calculateFractionDataSlice";
import reportGeneratorDataSliceReducer from "@/slices/reportGeneratorDataSlice";
import payCompareDataSliceReducer from "@/slices/payCompareDataSlice";
import financialDataSliceReducer from "@/slices/financialDataSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    roleData: roleDataReducer,
    userPermissionsData: userPermissionsDataSliceReducer,
    captcha: captchaSliceReducer,
    retiredState: retiredStateSliceReducer,
    itemsData: itemsDataSliceReducer,
    groupItemsData: groupItemsDataSliceReducer,
    userGroupsData: userGroupsDataSliceReducer,
    groupsUserData: groupsUserDataSliceReducer,
    archiveData: archiveDataSliceReducer,
    heirData: heirDataSliceReducer,
    personData: personDataSliceReducer,
    themeData: themeDataSliceReducer,
    slipsData: slipsDataSliceReducer,
    batchStatementsData: batchStatementsDataSliceReducer,
    fractionData: fractionDataSliceReducer,
    calculateFractionData: calculateFractionDataSliceReducer,
    reportGeneratorData: reportGeneratorDataSliceReducer,
    payCompareData: payCompareDataSliceReducer,
    financialData: financialDataSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;
