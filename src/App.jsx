// react imports
import { useState, useEffect } from "react";
import useLogout from "./hooks/useLogout";

// rrd imports
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { setPersonTableData } from "./slices/personDataSlice";
import { setUserID } from "./slices/authSlice";

// mui imports
import { ThemeProvider, createTheme } from "@mui/material/styles";

// library imports
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useIdleTimer } from "react-idle-timer";
import { jwtDecode } from "jwt-decode";

// components
import Header from "./components/Header";

function App() {
  const dispatch = useDispatch();

  const theme = createTheme({
    typography: {
      fontSize: 14,
    },
  });

  // LOGOUT USER AFTER 30mins OF INACTIVITY
  // states for user activity
  const [isActive, setIsActive] = useState(true);
  const [remaining, setRemaining] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { token } = useSelector((state) => state.auth);
  const { navPanelOpen } = useSelector((state) => state.themeData);

  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage =
    location.pathname === "/retirement-organization/" ||
    location.pathname === "/retirement-organization/login";
  const { logoutHandler } = useLogout();

  const onIdle = () => {
    setIsActive(false);
  };

  const onActive = () => {
    setIsActive(true);
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    timeout: 1000 * 60 * 30,
    throttle: 500,
  });

  useEffect(() => {
    if (!token) {
      navigate("/retirement-organization/");
    } else {
      setFirstName(jwtDecode(token).name);
      setLastName(jwtDecode(token).familyName);
      console.log(jwtDecode(token));
      // setUserID(jwtDecode(token).id);
      dispatch(setUserID(jwtDecode(token).id));
    }
  }, [token, navigate, isLoginPage, dispatch]);

  useEffect(() => {
    if (token) {
      const interval = setInterval(() => {
        setRemaining(Math.ceil(getRemainingTime() / 1000));
      }, 500);
      if (!isActive) {
        logoutHandler();
      }
      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRemainingTime, isActive, remaining, token]);

  // CLEAR THE PERSONNEL GRID WHEN USERS NAVIGATE TO OTHER ROUTES
  useEffect(() => {
    const allowedRoutes = [
      "/retirement-organization/personnel-statements",
      "/retirement-organization/personnel-statements/info",
    ];

    if (!allowedRoutes.includes(location.pathname)) {
      dispatch(setPersonTableData([]));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      {!isLoginPage && <Header firstName={firstName} lastName={lastName} />}
      <main
        className={!isLoginPage ? "main" : ""}
        style={{
          marginTop:
            navPanelOpen && !isLoginPage
              ? "220px"
              : !navPanelOpen && !isLoginPage
              ? "170px"
              : "0px",
        }}
      >
        <Outlet />
      </main>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
