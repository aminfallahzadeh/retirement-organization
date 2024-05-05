// react imports
import { useState, useEffect } from "react";

// rrd imports
import { Link, useLocation } from "react-router-dom";

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
import { IconButton } from "@mui/material";
import {
  DarkModeOutlined as DarkModeIcon,
  LightModeOutlined as LightModeIcon,
} from "@mui/icons-material";

function TopbarNav({ userName }) {
  const [theme, setTheme] = useState("light");

  const logoutHandler = useLogout();
  const location = useLocation();

  const cartablePath =
    location.pathname === "/retirement-organization/dashboard";

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
  }, [theme]);

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
              <IconButton color="info" onClick={handleThemeChange}>
                {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
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
