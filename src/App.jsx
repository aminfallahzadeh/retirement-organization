// library imports
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useIdleTimer } from "react-idle-timer";

// react imports
import { useState, useEffect } from "react";

// rrd imports
import { Outlet, useNavigate } from "react-router-dom";

// redux imports
import { useRefreshMutation } from "./slices/usersApiSlice";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "./slices/authSlice";

function App() {
  // states for user activity
  const [isActive, setIsActive] = useState(true);
  const [remaining, setRemaining] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  // const [data] = userInfo.itemList;

  const onIdle = () => {
    setIsActive(false);
  };

  const onActive = () => {
    setIsActive(true);
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    timeout: 10_000,
    throttle: 500,
  });

  // useEffect(() => {
  //   if (userInfo) {
  //     const interval = setInterval(() => {
  //       setRemaining(Math.ceil(getRemainingTime() / 1000));
  //     }, 500);

  //     if (!isActive) {
  //       dispatch(logout());
  //       navigate(0);
  //     }
  //     console.log(isActive, remaining);
  //     // console.log(data.token);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  // }, [getRemainingTime, isActive, remaining, navigate, dispatch, userInfo]);

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
