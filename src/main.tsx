// REACT IMPORTS
import ReactDOM from "react-dom/client";

// RRD
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

// STYLES
import "@/assets/styles/main.scss";

// REDUX
import { Provider } from "react-redux";
import store from "@/store";
import { useAppStore } from "@/hooks/usePreTypesHooks";

// COMPONENTS
import App from "@/App";

// PAGES
import Login from "@/pages/Login.jsx";
import Error from "@/pages/Error";

// SCREENS
import CartableScreen from "@/screens/CartableScreen";
import CreateGroupScreen from "@/screens/CreateGroupScreen";
import CreateUserScreen from "@/screens/CreateUserScreen";
import RetiredScreen from "@/screens/RetiredScreen";
import GroupsScreen from "@/screens/GroupsScreen";
import UsersScreen from "@/screens/UsersScreen";
import RequestScreen from "@/screens/RequestScreen";
import BatchStatementsScreen from "@/screens/BatchStatementsScreen";
import PersonnelStatementsScreen from "@/screens/PersonnelStatementsScreen";
import ElectronicStatementScreen from "@/screens/ElectronicStatementScreen";
import CreateRequestScreen from "@/screens/CreateRequestScreen";
import PersonnelInfoScreen from "@/screens/PersonnelInfoScreen";
import FractionScreen from "@/screens/FractionScreen.jsx";
import ReportGeneratorScreen from "@/screens/ReportGeneratorScreen.jsx";
import BaseInfoScreen from "@/screens/BaseInfoScreen.jsx";
import BaseInfoScreen2 from "@/screens/BaseInfoScreen2.jsx";
import InsertAnnounceScreen from "@/screens/InsertAnnounceScreen.jsx";
import DashboardScreen from "@/screens/DashboardScreen.jsx";
import GroupSlipsScreen from "@/screens/GroupSlipsScreen.jsx";
import SalaryScreen from "@/screens/SalaryScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/retirement-organization/" element={<App />}>
        <Route index path="/retirement-organization/" element={<Login />} />

        <Route
          path="/retirement-organization/cartable"
          element={<CartableScreen />}
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
          path="/retirement-organization/group-slips"
          element={<GroupSlipsScreen />}
        />

        <Route
          path="/retirement-organization/personnel-statements"
          element={<PersonnelStatementsScreen />}
        />

        <Route
          path="/retirement-organization/personnel-statements/info"
          element={<PersonnelInfoScreen />}
        />

        <Route
          path="/retirement-organization/electronic-statement"
          element={<ElectronicStatementScreen />}
        />

        <Route
          path="/retirement-organization/create-request"
          element={<CreateRequestScreen />}
        />

        <Route
          path="/retirement-organization/fraction"
          element={<FractionScreen />}
        />

        <Route
          path="/retirement-organization/report-creator"
          element={<ReportGeneratorScreen />}
        />

        <Route
          path="/retirement-organization/base-info"
          element={<BaseInfoScreen />}
        />

        <Route
          path="/retirement-organization/base-info-2"
          element={<BaseInfoScreen2 />}
        />

        <Route
          path="/retirement-organization/insert-announce"
          element={<InsertAnnounceScreen />}
        />

        <Route
          path="/retirement-organization/dashboard"
          element={<DashboardScreen />}
        />

        <Route
          path="/retirement-organization/salary"
          element={<SalaryScreen />}
        />
      </Route>
      <Route path="*" element={<Error />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  //     <React.StrictMode>
  // </React.StrictMode>
);
