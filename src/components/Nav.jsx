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
} from "@mui/icons-material";

function Nav({ userName, userID }) {
  const { data: user } = useGetUserQuery({ userID });

  const [showLogoutModal, setShowLogoutModal] = useState(false);

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

  const handleShowLogoutModalChange = () => {
    setShowLogoutModal(true);
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
            <li className={dashboardPath ? "active" : ""}>
              <Link to={"/retirement-organization/dashboard"}>کارتابل</Link>
            </li>
            <li className={createRequestPath ? "active" : ""}>
              <Link to={"/retirement-organization/create-request"}>
                ایجاد درخواست
              </Link>
            </li>
            <li className={personnelStatementsPath ? "active" : ""}>
              <Link to={"/retirement-organization/personnel-statements"}>
                رویت احکام و تعرفه
              </Link>
            </li>
            <li>
              <a>کسورات</a>
            </li>
            <li>
              <a>گزارشات</a>
            </li>
            <li>
              <a>داشبورد مدیریتی</a>
            </li>
            <li>
              <a>گزارش ساز</a>
            </li>
            <li>
              <a>مدیریت سیستم</a>
            </li>
            <li>
              <a>اطلاعات پایه</a>
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
                <LogoutIcon
                  sx={[
                    { color: "#fff", transition: "all 0.25s ease" },
                    {
                      "&:hover": {
                        color: "#ff6700",
                      },
                    },
                  ]}
                />
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
                    {theme === "default" ? (
                      <DarkModeIcon
                        sx={[
                          { color: "#fff", transition: "all 0.25s ease" },
                          {
                            "&:hover": {
                              color: "#ff6700",
                            },
                          },
                        ]}
                      />
                    ) : (
                      <LightModeIcon
                        sx={[
                          { color: "#fff", transition: "all 0.25s ease" },
                          {
                            "&:hover": {
                              color: "#ff6700",
                            },
                          },
                        ]}
                      />
                    )}
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
                <PersonIcon
                  sx={[
                    { color: "#fff", transition: "all 0.25s ease" },
                    {
                      "&:hover": {
                        color: "#ff6700",
                      },
                    },
                  ]}
                />
              </Tooltip>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Nav;
