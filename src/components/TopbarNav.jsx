// library imports
import "bootstrap/dist/css/bootstrap.min.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// rrd imports
import { Link } from "react-router-dom";

// component imports
import NavDropdown from "./NavDropdown";
import ProfilePicure from "./ProfilePicture";
import PersianDate from "./PersianDate";

// react imports
import { useState, useRef, useEffect, useCallback } from "react";

function TopbarNav({ userName }) {
  const [dropdown, setDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const dropdownTogglerRef = useRef(null);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const closeDropdown = useCallback(
    (e) => {
      if (
        dropdownRef.current &&
        dropdown &&
        !dropdownRef.current.contains(e.target) &&
        !dropdownTogglerRef.current.contains(e.target)
      ) {
        setDropdown(false);
      }
    },
    [dropdown]
  );

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, [closeDropdown]);

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
            <li onClick={toggleDropdown} ref={dropdownTogglerRef}>
              <ArrowDropDownIcon /> {userName}
            </li>
            <li>
              <Link to={"/retirement-organization/dashboard"}>کارتابل</Link>
            </li>
            <li>اعلانات</li>
          </ul>
        </div>

        <img
          src="./banner.png"
          className="topnav__container--banner"
          alt="banner"
        />

        <PersianDate />
      </div>
      {dropdown && <NavDropdown ref={dropdownRef} />}
    </nav>
  );

  return content;
}

export default TopbarNav;
