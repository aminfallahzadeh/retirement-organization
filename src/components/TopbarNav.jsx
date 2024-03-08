// library imports
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// react imports
import useLogout from "../hooks/useLogout";

function TopbarNav({ userName }) {
  const logoutHandler = useLogout();

  const content = (
    <nav className="topnav">
      <div className="topnav__container">
        <a className="topnav__container--logo">
          <img
            alt="logo"
            src="./images/logo.png"
            width="80"
            height="80"
            className="d-inline-block align-top"
          />
        </a>
        <div className="topnav__container--links">
          <div>
            <Button variant="outline-danger" onClick={logoutHandler}>
              خروج
            </Button>
          </div>

          <ul className="topnav__container--links-list">
            <li>{userName}</li>
            <li>خانه</li>
            <li>اعلانات</li>
          </ul>
        </div>

        <img
          src="./images/banner.png"
          className="topnav__container--banner"
          alt="banner"
        />
      </div>
    </nav>
  );

  return content;
}

export default TopbarNav;
