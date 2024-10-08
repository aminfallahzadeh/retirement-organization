// slice imports
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authSliceReducer from "./slices/authSlice";
import userPermissionsDataSliceReducer from "./slices/userPermissionsDataSlice";
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
import batchStatementsDataSliceReducer from "./slices/batchStatementsDataSlice";
import fractionDataSliceReducer from "./slices/fractionDataSlice";
import calculateFractionDataSliceReducer from "./slices/calculateFractionDataSlice";
import reportGeneratorDataSliceReducer from "./slices/reportGeneratorDataSlice";
import payCompareDataSliceReducer from "./slices/payCompareDataSlice";
import financialDataSliceReducer from "./slices/financialDataSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    userPermissionsData: userPermissionsDataSliceReducer,
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
    batchStatementsData: batchStatementsDataSliceReducer,
    fractionData: fractionDataSliceReducer,
    calculateFractionData: calculateFractionDataSliceReducer,
    reportGeneratorData: reportGeneratorDataSliceReducer,
    payCompareData: payCompareDataSliceReducer,
    financialData: financialDataSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
