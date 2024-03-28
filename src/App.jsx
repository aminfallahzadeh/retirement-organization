// bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// library imports
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useIdleTimer } from "react-idle-timer";
import { jwtDecode } from "jwt-decode";

// components
import SidebarNav from "./components/SidebarNav";
import TopbarNav from "./components/TopbarNav";

// react imports
import { useState, useEffect } from "react";
import useLogout from "./hooks/useLogout";

// rrd imports
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";

function App() {
  // states for user activity
  const [isActive, setIsActive] = useState(true);
  const [remaining, setRemaining] = useState(0);
  const [userName, setUserName] = useState("");

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const location = useLocation();
  const isLoginPage = location.pathname === "/retirement-organization/";
  const logoutHandler = useLogout();

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
      setUserName(jwtDecode(token).name);
    }
  }, [token, navigate, isLoginPage]);

  useEffect(() => {
    if (token) {
      const interval = setInterval(() => {
        setRemaining(Math.ceil(getRemainingTime() / 1000));
      }, 500);
      if (!isActive) {
        logoutHandler();
      }
      // console.log(isActive, remaining);
      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRemainingTime, isActive, remaining, token]);

  return (
    <>
      {!isLoginPage && <TopbarNav userName={userName} />}
      {!isLoginPage && <SidebarNav />}
      <main style={{ height: "100%" }}>
        <Outlet />
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
