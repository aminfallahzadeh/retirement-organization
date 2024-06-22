// react imports
import { useState, useEffect } from "react";

// rrd imports
import { Link, useLocation } from "react-router-dom";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { setNavPanelOpen } from "../slices/themeDataSlice";
import {
  useGetUserQuery,
  useUpdateUserThemeMutation,
  useGetItemAccessQuery,
} from "../slices/usersApiSlice";
import { setUserPermissionsData } from "../slices/userPermissionsDataSlice";

// components
import Modal from "./Modal";
import DigitalClock from "./DigitalClock";
import Date from "./Date";

// hooks
import useLogout from "../hooks/useLogout";

// mui iomports
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, Tooltip, Button } from "@mui/material";
import {
  Logout as LogoutIcon,
  DarkModeOutlined as DarkModeIcon,
  LightModeOutlined as LightModeIcon,
  Done as DoneIcon,
  Close as CloseIcon,
  ArrowLeftOutlined as ArrowIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";

function Nav({ userName, userID }) {
  // const [permissions, setPermissions] = useState([]);
  const { data: user } = useGetUserQuery({ userID });

  const dispatch = useDispatch();

  const [activePanel, setActivePanel] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [theme, setTheme] = useState("default");

  const { logoutHandler, logoutLoading } = useLogout();
  const location = useLocation();

  const [updateUserTheme, { isLoading }] = useUpdateUserThemeMutation();

  // ACCESS PERMISSIONS FROM REDUX STORE
  const { permissions } = useSelector((state) => state.userPermissionsData);

  const isActivePath = (path) => location.pathname === path;

  const {
    data: permissionsList,
    isSuccess: isPermissionsSuccess,
    isLoading: isPermissionsLoading,
    isFetching: isPermissionsFetching,
    error: isPermissionError,
  } = useGetItemAccessQuery();

  useEffect(() => {
    if (isPermissionsSuccess) {
      const extractedData = permissionsList.itemList.map((item) => item.url);
      dispatch(setUserPermissionsData(extractedData));
    }
  }, [isPermissionsSuccess, permissionsList, dispatch]);

  useEffect(() => {
    if (isPermissionError) {
      console.log(isPermissionError);
      toast.error(isPermissionError?.data?.message || isPermissionError.error, {
        autoClose: 2000,
      });
    }
  }, [isPermissionError]);

  const handleShowLogoutModalChange = () => {
    setShowLogoutModal(true);
  };

  const handlePanelToggle = (panel) => {
    setActivePanel((prev) => {
      const newPanel = prev === panel ? null : panel;
      setTimeout(() => {
        dispatch(setNavPanelOpen(newPanel !== null));
      }, 0);
      return newPanel;
    });
  };

  const handleThemeChange = async () => {
    try {
      const selectedTheme = theme === "default" ? "chocolate" : "default";
      setTheme(selectedTheme);
      await updateUserTheme({
        userID,
        theme: selectedTheme,
      }).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
      console.log(err);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
  }, [theme]);

  useEffect(() => {
    if (user) {
      setTheme(user.itemList[0].theme);
    }
  }, [user]);

  return (
    <>
      {showLogoutModal && (
        <Modal onClose={() => setShowLogoutModal(false)} title="خروج">
          <p className="paragraph-primary">آیا از خروج اطمینان دارید؟</p>

          <div className="flex-row flex-center">
            <LoadingButton
              dir="ltr"
              endIcon={<DoneIcon />}
              loading={logoutLoading}
              onClick={logoutHandler}
              variant="contained"
              color="success"
              sx={{ fontFamily: "sahel" }}
            >
              <span>بله</span>
            </LoadingButton>
            <Button
              dir="ltr"
              endIcon={<CloseIcon />}
              onClick={() => setShowLogoutModal(false)}
              variant="contained"
              color="error"
              sx={{ fontFamily: "sahel" }}
            >
              <span>خیر</span>
            </Button>
          </div>
        </Modal>
      )}
      <nav className="nav">
        <div className="nav__links">
          <>
            {isPermissionsLoading || isPermissionsFetching ? (
              <div className="nav__links--loading">در حال بارگزاری ...</div>
            ) : (
              <ul className="nav__links--list">
                <li
                  className={
                    isActivePath("/retirement-organization/cartable")
                      ? "active"
                      : ""
                  }
                  onClick={() => handlePanelToggle(null)}
                >
                  <Link to={"/retirement-organization/cartable"}>کارتابل</Link>
                </li>
                <li
                  className={
                    isActivePath("/retirement-organization/create-request")
                      ? "active"
                      : ""
                  }
                  onClick={() => handlePanelToggle(null)}
                >
                  <Link to={"/retirement-organization/create-request"}>
                    ایجاد درخواست
                  </Link>
                </li>
                <li
                  className={
                    isActivePath(
                      "/retirement-organization/personnel-statements"
                    )
                      ? "active"
                      : ""
                  }
                  onClick={() => handlePanelToggle(null)}
                >
                  <Link to={"/retirement-organization/personnel-statements"}>
                    رویت احکام و تعرفه
                  </Link>
                </li>

                {permissions && permissions.includes("Fractions") && (
                  <li
                    className={
                      isActivePath("/retirement-organization/fraction")
                        ? "active"
                        : ""
                    }
                    onClick={() => handlePanelToggle(null)}
                  >
                    <Link to={"/retirement-organization/fraction"}>کسورات</Link>
                  </li>
                )}

                <li onClick={() => handlePanelToggle(null)}>
                  <a>داشبورد مدیریتی</a>
                </li>
                <li
                  onClick={() => handlePanelToggle(null)}
                  className={
                    isActivePath("/retirement-organization/report-creator")
                      ? "active"
                      : ""
                  }
                >
                  <Link to={"/retirement-organization/report-creator"}>
                    گزارش ساز
                  </Link>
                </li>
                <li
                  onClick={() => handlePanelToggle("systemManagement")}
                  className={activePanel === "systemManagement" ? "active" : ""}
                >
                  <a>مدیریت سیستم</a>
                  <ArrowIcon
                    sx={{
                      color: "#fff",
                      transition: "all 0.25s ease",
                      transform:
                        activePanel === "systemManagement"
                          ? "rotate(-90deg)"
                          : "",
                    }}
                  />
                </li>
                {permissions && permissions.includes("BaseInfoManagement") && (
                  <li
                    onClick={() => handlePanelToggle("baseInfo")}
                    className={activePanel === "baseInfo" ? "active" : ""}
                  >
                    <a>مدیریت اطلاعات پایه</a>
                    <ArrowIcon
                      sx={{
                        color: "#fff",
                        transition: "all 0.25s ease",
                        transform:
                          activePanel === "baseInfo" ? "rotate(-90deg)" : "",
                      }}
                    />
                  </li>
                )}
              </ul>
            )}
          </>
        </div>

        <div className="nav__profile">
          <ul className="nav__profile--list">
            <li onClick={handleShowLogoutModalChange}>
              <Tooltip
                title={
                  <span style={{ fontFamily: "sahel", fontSize: "12px" }}>
                    خروج
                  </span>
                }
              >
                <LogoutIcon />
              </Tooltip>
            </li>

            <li>
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress color="warning" size={20} />
                </Box>
              ) : (
                <Tooltip
                  title={
                    <span style={{ fontFamily: "sahel", fontSize: "12px" }}>
                      تغییر تم
                    </span>
                  }
                >
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={handleThemeChange}
                  >
                    {theme === "default" ? <DarkModeIcon /> : <LightModeIcon />}
                  </Box>
                </Tooltip>
              )}
            </li>
            <li>
              <Tooltip title="پنل کاربر">
                <a>{userName}</a>
              </Tooltip>
            </li>

            <li>
              <DigitalClock />

              <Date />
            </li>
          </ul>
        </div>
      </nav>

      <div className={activePanel ? "nav__panel" : "nav__panel--hidden"}>
        {activePanel === "baseInfo" ? (
          <ul className="nav__panel--list">
            <li
              className={
                isActivePath("/retirement-organization/electronic-statement")
                  ? "active"
                  : ""
              }
            >
              <Link to="/retirement-organization/electronic-statement">
                پرونده الکترونیک
              </Link>
            </li>
            <li
              className={
                isActivePath("/retirement-organization/base-info")
                  ? "active"
                  : ""
              }
            >
              <Link to="/retirement-organization/base-info">
                اطلاعات پایه ۱
              </Link>
            </li>
            <li>
              <Link to="/">اطلاعات پایه ۲</Link>
            </li>
          </ul>
        ) : activePanel === "systemManagement" ? (
          <ul className="nav__panel--list">
            {permissions && permissions.includes("Groups") && (
              <li
                className={
                  isActivePath("/retirement-organization/groups") ||
                  isActivePath("/retirement-organization/create-group")
                    ? "active"
                    : ""
                }
              >
                <Link to="/retirement-organization/groups">گروه ها</Link>
              </li>
            )}

            {permissions && permissions.includes("Users") && (
              <li
                className={
                  isActivePath("/retirement-organization/users") ||
                  isActivePath("/retirement-organization/create-user")
                    ? "active"
                    : ""
                }
              >
                <Link to="/retirement-organization/users">کاربران</Link>
              </li>
            )}
          </ul>
        ) : null}
      </div>
    </>
  );
}

export default Nav;
