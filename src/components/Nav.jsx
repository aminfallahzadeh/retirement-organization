// react imports
import { useState, useEffect } from "react";

// rrd imports
import { Link, useLocation } from "react-router-dom";

// redux imports
import {
  useGetUserQuery,
  useUpdateUserThemeMutation,
} from "../slices/usersApiSlice";

// components
import Modal from "./Modal";

// hooks
import useLogout from "../hooks/useLogout";

// mui iomports
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, Tooltip, Button } from "@mui/material";
import {
  Logout as LogoutIcon,
  DarkModeOutlined as DarkModeIcon,
  LightModeOutlined as LightModeIcon,
  PersonOutlined as PersonIcon,
  Done as DoneIcon,
  Close as CloseIcon,
  ArrowLeftOutlined as ArrowIcon,
} from "@mui/icons-material";

function Nav({ userName, userID }) {
  const { data: user } = useGetUserQuery({ userID });

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showBaseInfoPannel, setShowBaseInfoPannel] = useState(false);

  const [theme, setTheme] = useState("default");

  const { logoutHandler, logoutLoading } = useLogout();
  const location = useLocation();

  const [updateUserTheme, { isLoading }] = useUpdateUserThemeMutation();

  const dashboardPath =
    location.pathname === "/retirement-organization/dashboard";

  const createRequestPath =
    location.pathname === "/retirement-organization/create-request";

  const personnelStatementsPath = location.pathname.startsWith(
    "/retirement-organization/personnel-statements"
  );

  const groupsPath = location.pathname === "/retirement-organization/groups";
  const createGroupPath =
    location.pathname === "/retirement-organization/create-group";
  const userPath = location.pathname === "/retirement-organization/users";
  const createUserPath =
    location.pathname === "/retirement-organization/create-user";
  const electronicStatementPath =
    location.pathname === "/retirement-organization/electronic-statement";

  const handleShowLogoutModalChange = () => {
    setShowLogoutModal(true);
  };

  const handleShowBaseInfoPannelChange = () => {
    setShowBaseInfoPannel(!showBaseInfoPannel);
  };

  const handleThemeChange = async () => {
    try {
      const selectedTheme = theme === "default" ? "chocolate" : "default";
      setTheme(selectedTheme);
      const res = await updateUserTheme({
        userID,
        theme: selectedTheme,
      }).unwrap();
      console.log(res);
    } catch (err) {
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
          <ul className="nav__links--list">
            <li
              className={dashboardPath ? "active" : ""}
              onClick={() => setShowBaseInfoPannel(false)}
            >
              <Link to={"/retirement-organization/dashboard"}>کارتابل</Link>
            </li>
            <li
              className={createRequestPath ? "active" : ""}
              onClick={() => setShowBaseInfoPannel(false)}
            >
              <Link to={"/retirement-organization/create-request"}>
                ایجاد درخواست
              </Link>
            </li>
            <li
              className={personnelStatementsPath ? "active" : ""}
              onClick={() => setShowBaseInfoPannel(false)}
            >
              <Link to={"/retirement-organization/personnel-statements"}>
                رویت احکام و تعرفه
              </Link>
            </li>
            <li onClick={() => setShowBaseInfoPannel(false)}>
              <a>کسورات</a>
            </li>
            <li onClick={() => setShowBaseInfoPannel(false)}>
              <a>گزارشات</a>
            </li>
            <li onClick={() => setShowBaseInfoPannel(false)}>
              <a>داشبورد مدیریتی</a>
            </li>
            <li onClick={() => setShowBaseInfoPannel(false)}>
              <a>گزارش ساز</a>
            </li>
            <li onClick={() => setShowBaseInfoPannel(false)}>
              <a>مدیریت سیستم</a>
            </li>
            <li
              onClick={handleShowBaseInfoPannelChange}
              className={
                userPath ||
                createUserPath ||
                groupsPath ||
                electronicStatementPath ||
                createGroupPath ||
                showBaseInfoPannel
                  ? "active"
                  : ""
              }
            >
              <a>اطلاعات پایه</a>
              <ArrowIcon
                sx={{
                  color: "#fff",
                  transition: "all 0.25s ease",
                  transform: showBaseInfoPannel ? "rotate(-90deg)" : "",
                }}
              />
            </li>
          </ul>
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
              <Tooltip
                title={
                  <span style={{ fontFamily: "sahel", fontSize: "12px" }}>
                    پروفایل {userName}
                  </span>
                }
              >
                <PersonIcon />
              </Tooltip>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={
          showBaseInfoPannel ? "nav__baseInfo" : "nav__baseInfo--hidden"
        }
      >
        <ul className="nav__baseInfo--list">
          <li className={groupsPath || createGroupPath ? "active" : ""}>
            <Link to="/retirement-organization/groups">گروه ها</Link>
          </li>
          <li className={userPath || createUserPath ? "active" : ""}>
            <Link to="/retirement-organization/users">کارمندان</Link>
          </li>
          <li className={electronicStatementPath ? "active" : ""}>
            <Link to="/retirement-organization/electronic-statement">
              پرونده الکترونیک
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Nav;
