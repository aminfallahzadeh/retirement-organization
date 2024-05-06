// react imports
import { useState, useEffect } from "react";

// rrd imports
import { Link, useLocation } from "react-router-dom";

// redux imports
import {
  useGetUserQuery,
  useUpdateUserThemeMutation,
} from "../slices/usersApiSlice";

// component imports
import ProfilePicure from "./ProfilePicture";
import DateTime from "./DateTime";

// hooks
import useLogout from "../hooks/useLogout";

// mui imports
import {
  Logout as LogoutIcon,
  SpaceDashboardOutlined as DashboardIcon,
} from "@mui/icons-material";
import { IconButton, Box, CircularProgress } from "@mui/material";
import {
  DarkModeOutlined as DarkModeIcon,
  LightModeOutlined as LightModeIcon,
} from "@mui/icons-material";

function TopbarNav({ userName, userID }) {
  const { data: user } = useGetUserQuery(userID);

  const [theme, setTheme] = useState("default");

  const logoutHandler = useLogout();
  const location = useLocation();

  const cartablePath =
    location.pathname === "/retirement-organization/dashboard";

  const [updateUserTheme, { isLoading }] = useUpdateUserThemeMutation();

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

  const content = (
    <nav className="topnav">
      <div className="topnav__container">
        <a className="topnav__container--logo">
          <img
            alt="logo"
            src="./logo.png"
            width="80"
            height="80"
            className="d-inline-block align-top"
          />
        </a>
        <div className="topnav__container--links">
          <ProfilePicure />

          <ul className="topnav__container--links-list">
            <li>{userName}</li>
            <li onClick={logoutHandler}>
              <LogoutIcon sx={{ fontSize: 18 }} /> خروج
            </li>
            <li className={cartablePath ? "topnav__active" : ""}>
              <Link
                to={"/retirement-organization/dashboard"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "3px",
                }}
              >
                <DashboardIcon sx={{ fontSize: 20 }} />
                کارتابل
              </Link>
            </li>
            <li className="topnav__theme">
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  <CircularProgress color="warning" size={20} />
                </Box>
              ) : (
                <IconButton
                  color="warning"
                  onClick={handleThemeChange}
                  disabled={isLoading}
                >
                  {theme === "default" ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
              )}
            </li>
          </ul>
        </div>

        <img
          src="./banner.png"
          className="topnav__container--banner"
          alt="banner"
        />

        <DateTime />
      </div>
    </nav>
  );

  return content;
}

export default TopbarNav;
