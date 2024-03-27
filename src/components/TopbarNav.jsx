// rrd imports
import { Link } from "react-router-dom";

// component imports
import ProfilePicure from "./ProfilePicture";
import DateTime from "./DateTime";

// hooks
import useLogout from "../hooks/useLogout";

// mui imports
import { Logout as LogoutIcon } from "@mui/icons-material";

function TopbarNav({ userName }) {
  const logoutHandler = useLogout();

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
              <LogoutIcon sx={{ fontSize: 20 }} /> خروج
            </li>
            <li>
              <Link to={"/retirement-organization/dashboard"}>کارتابل</Link>
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
