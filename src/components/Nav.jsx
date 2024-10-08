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
import { Box, Tooltip, Button } from "@mui/material";
import {
  Logout as LogoutIcon,
  ColorLensRounded as ThemeIcon,
  Done as DoneIcon,
  Close as CloseIcon,
  ArrowLeftOutlined as ArrowIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";

function Nav({ firstName, lastName }) {
  const { userID } = useSelector((state) => state.auth);

  const shouldFetch = !!userID;

  const { data: user, refetch: userRefetch } = useGetUserQuery(
    { userID },
    {
      skip: !shouldFetch,
    }
  );

  const dispatch = useDispatch();

  // GET THEME WHENEVERN PAGE LOADS
  useEffect(() => {
    if (shouldFetch) {
      userRefetch();
    }
  }, [userRefetch, shouldFetch]);

  const [activePanel, setActivePanel] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [theme, setTheme] = useState("default");

  const { logoutHandler, logoutLoading } = useLogout();
  const location = useLocation();

  const [updateUserTheme] = useUpdateUserThemeMutation();

  // ACCESS PERMISSIONS FROM REDUX STORE
  const { permissions } = useSelector((state) => state.userPermissionsData);

  const baseURL = "/retirement-organization/";
  const isActivePath = (path) => location.pathname === baseURL + path;

  const {
    data: permissionsList,
    isSuccess: isPermissionsSuccess,
    isLoading: isPermissionsLoading,
    isFetching: isPermissionsFetching,
    error: isPermissionError,
    refetch,
  } = useGetItemAccessQuery();

  useEffect(() => {
    refetch();
    if (isPermissionsSuccess) {
      const extractedData = permissionsList.itemList.map((item) => item.url);
      dispatch(setUserPermissionsData(extractedData));
    }
  }, [isPermissionsSuccess, permissionsList, dispatch, refetch]);

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

  const handleThemeChange = async (value) => {
    if (theme === value) return;
    try {
      const selectedTheme = value;
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
                  className={isActivePath("cartable") ? "active" : ""}
                  onClick={() => handlePanelToggle(null)}
                >
                  <Link to={"/retirement-organization/cartable"}>کارتابل</Link>
                </li>
                <li
                  className={isActivePath("create-request") ? "active" : ""}
                  onClick={() => handlePanelToggle(null)}
                >
                  <Link to={"/retirement-organization/create-request"}>
                    ایجاد درخواست
                  </Link>
                </li>
                {permissions && permissions.includes("Fractions") && (
                  <li
                    className={isActivePath("fraction") ? "active" : ""}
                    onClick={() => handlePanelToggle(null)}
                  >
                    <Link to={"/retirement-organization/fraction"}>کسورات</Link>
                  </li>
                )}
                <li
                  className={isActivePath("dashboard") ? "active" : ""}
                  onClick={() => handlePanelToggle(null)}
                >
                  <Link to={"/retirement-organization/dashboard"}>
                    داشبورد مدیریتی
                  </Link>
                </li>
                <li
                  onClick={() => handlePanelToggle("reports")}
                  className={activePanel === "reports" ? "active" : ""}
                >
                  <a>گزارشات</a>
                  <ArrowIcon
                    sx={{
                      color: "#fff",
                      transition: "all 0.25s ease",
                      transform:
                        activePanel === "reports" ? "rotate(-90deg)" : "",
                    }}
                  />
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

            <li className="nav__profile--theme">
              <div className="nav__profile--theme-icon">
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ThemeIcon />
                </Box>
              </div>

              <div className="nav__profile--theme-dropdown">
                <div
                  className={
                    "theme-choice" +
                    (theme === "default" ? " selectedTheme" : "")
                  }
                  onClick={() => handleThemeChange("default")}
                >
                  <div className="theme-choice__color" data-theme="a"></div>
                </div>

                <div
                  className={
                    "theme-choice" +
                    (theme === "chocolate" ? " selectedTheme" : "")
                  }
                  onClick={() => handleThemeChange("chocolate")}
                >
                  <div className="theme-choice__color" data-theme="b"></div>
                </div>

                <div
                  className={
                    "theme-choice" + (theme === "green" ? " selectedTheme" : "")
                  }
                  onClick={() => handleThemeChange("green")}
                >
                  <div className="theme-choice__color" data-theme="c"></div>
                </div>
              </div>
            </li>

            <li>
              <Tooltip title="پنل کاربر">
                <a
                  className="flex flex-col flex-center"
                  style={{
                    rowGap: "0",
                    fontSize: "12px",
                  }}
                >
                  <span>{firstName}</span>
                  <span>{lastName}</span>
                </a>
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
        {activePanel === "reports" ? (
          <ul className="nav__panel--list">
            <li className={isActivePath("report-creator") ? "active" : ""}>
              <Link to={"/retirement-organization/report-creator"}>
                گزارش ساز
              </Link>
            </li>

            <li
              className={isActivePath("personnel-statements") ? "active" : ""}
            >
              <Link to={"/retirement-organization/personnel-statements"}>
                رویت احکام و تعرفه
              </Link>
            </li>

            <li className={isActivePath("salary") ? "active" : ""}>
              <Link to={"/retirement-organization/salary"}>حقوق و دستمزد</Link>
            </li>
          </ul>
        ) : null}

        {activePanel === "baseInfo" ? (
          <ul className="nav__panel--list">
            <li
              className={isActivePath("electronic-statement") ? "active" : ""}
            >
              <Link to="/retirement-organization/electronic-statement">
                پرونده الکترونیک
              </Link>
            </li>
            <li className={isActivePath("base-info") ? "active" : ""}>
              <Link to="/retirement-organization/base-info">
                اطلاعات پایه ۱
              </Link>
            </li>
            <li className={isActivePath("base-info-2") ? "active" : ""}>
              <Link to="/retirement-organization/base-info-2">
                اطلاعات پایه ۲
              </Link>
            </li>
            <li className={isActivePath("insert-announce") ? "active" : ""}>
              <Link to="/retirement-organization/insert-announce">
                ثبت اطلاعیه
              </Link>
            </li>
          </ul>
        ) : activePanel === "systemManagement" ? (
          <ul className="nav__panel--list">
            {permissions && permissions.includes("Groups") && (
              <li
                className={
                  isActivePath("groups") || isActivePath("create-group")
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
                  isActivePath("users") || isActivePath("create-user")
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
