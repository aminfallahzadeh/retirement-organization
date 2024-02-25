// library imports
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useIdleTimer } from "react-idle-timer";

// react imports
import { useState, useEffect } from "react";
import useLogout from "./hooks/useLogout";

// rrd imports
import { Outlet } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";

function App() {
  // states for user activity
  const [isActive, setIsActive] = useState(true);
  const [remaining, setRemaining] = useState(0);

  const { userInfo } = useSelector((state) => state.auth);

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
    if (userInfo) {
      const interval = setInterval(() => {
        setRemaining(Math.ceil(getRemainingTime() / 1000));
      }, 500);
      if (!isActive) {
        logoutHandler();
      }
      console.log(isActive, remaining);
      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRemainingTime, isActive, remaining, userInfo]);

  return (
    <>
      <main>
        <Outlet />
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
