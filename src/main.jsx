// react imports
import ReactDOM from "react-dom/client";
import React from "react";

// rrd imports
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

// styles imports
import "./assets/styles/main.scss";

// redux imports
import { Provider } from "react-redux";
import store from "./store";

// component imports
import App from "./App.jsx";

// pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login.jsx";
import Error from "./pages/Error";

// screens
import CreateGroupScreen from "./screens/CreateGroupScreen";
import CreateUserScreen from "./screens/CreateUserScreen";
import RetiredScreen from "./screens/RetiredScreen";
import GroupsScreen from "./screens/GroupsScreen";
import UsersScreen from "./screens/UsersScreen";
import RequestScreen from "./screens/RequestScreen";
import BatchStatementsScreen from "./screens/BatchStatementsScreen";
import SlipsScreen from "./screens/SlipsScreen";
import StaffStatementsScreen from "./screens/StaffStatementsScreen";
import ElectronicStatementScreen from "./screens/ElectronicStatementScreen";
import CreateRequestScreen from "./screens/CreateRequestScreen";
import StaffInfoScreen from "./screens/StaffInfoScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/retirement-organization/" element={<App />}>
        <Route index path="/retirement-organization/" element={<Login />} />

        <Route
          path="/retirement-organization/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/retirement-organization/retired"
          element={<RetiredScreen />}
        />

        <Route
          path="/retirement-organization/groups"
          element={<GroupsScreen />}
        />

        <Route
          path="/retirement-organization/users"
          element={<UsersScreen />}
        />

        <Route
          path="/retirement-organization/create-group"
          element={<CreateGroupScreen />}
        />

        <Route
          path="/retirement-organization/create-user"
          element={<CreateUserScreen />}
        />

        <Route
          path="/retirement-organization/request"
          element={<RequestScreen />}
        />

        <Route
          path="/retirement-organization/batch-statements"
          element={<BatchStatementsScreen />}
        />

        <Route
          path="/retirement-organization/slips"
          element={<SlipsScreen />}
        />

        <Route
          path="/retirement-organization/staff-statements"
          element={<StaffStatementsScreen />}
        />

        <Route
          path="/retirement-organization/staff-statements/info"
          element={<StaffInfoScreen />}
        />

        <Route
          path="/retirement-organization/electronic-statement"
          element={<ElectronicStatementScreen />}
        />

        <Route
          path="/retirement-organization/create-request"
          element={<CreateRequestScreen />}
        />
      </Route>
      <Route path="*" element={<Error />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
