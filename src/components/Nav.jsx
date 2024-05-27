// react imports
import { useState, useEffect } from "react";

// rrd imports
import { Link, useLocation } from "react-router-dom";

// redux imports
import {
  useGetUserQuery,
  useUpdateUserThemeMutation,
} from "../slices/usersApiSlice";

// hooks
import useLogout from "../hooks/useLogout";

// mui iomports
import { Box, CircularProgress, Tooltip } from "@mui/material";
import {
  Logout as LogoutIcon,
  DarkModeOutlined as DarkModeIcon,
  LightModeOutlined as LightModeIcon,
  PersonOutlined as PersonIcon,
} from "@mui/icons-material";

function Nav({ userName, userID }) {
  const { data: user } = useGetUserQuery({ userID });

  const [theme, setTheme] = useState("default");

  const logoutHandler = useLogout();
  const location = useLocation();

  const [updateUserTheme, { isLoading }] = useUpdateUserThemeMutation();

  const dashboardPath =
    location.pathname === "/retirement-organization/dashboard";

  const createRequestPath =
    location.pathname === "/retirement-organization/create-request";

  const personnelStatementsPath = location.pathname.startsWith(
    "/retirement-organization/personnel-statements"
  );

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
    <nav className="nav">
      <div className="nav__links">
        <ul className="nav__links--list">
          <li className={dashboardPath ? "active" : ""}>
            <Link to={"/retirement-organization/dashboard"}>کارتابل</Link>
          </li>
          <li className={createRequestPath ? "active" : ""}>
            <Link to={"/retirement-organization/create-request"}>
              ایجات درخواست
            </Link>
          </li>
          <li className={personnelStatementsPath ? "active" : ""}>
            <Link to={"/retirement-organization/personnel-statements"}>
              رویت احکام و تعرفه
            </Link>
          </li>
          <li>
            <a href="#contact">کسورات</a>
          </li>
          <li>
            <a href="#contact">گزارشات</a>
          </li>
          <li>
            <a href="#contact">داشبورد مدیریتی</a>
          </li>
          <li>
            <a href="#contact">گزارش ساز</a>
          </li>
          <li>
            <a href="#contact">مدیریت سیستم</a>
          </li>
          <li>
            <a href="#contact">اطلاعات پایه</a>
          </li>
        </ul>
      </div>

      <div className="nav__profile">
        <ul className="nav__profile--list">
          <li onClick={logoutHandler}>
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
  );
}

export default Nav;
