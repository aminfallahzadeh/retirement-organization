// library imports
import "bootstrap/dist/css/bootstrap.min.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// component imports
import NavDropdown from "./NavDropdown";
import ProfilePicure from "./ProfilePicture";
import PersianDate from "./PersianDate";

// react imports
import { useState, useRef, useEffect, useCallback } from "react";

// redux imports
import { useDispatch } from "react-redux";
import {
  setGetCartableStatus,
  setGetGroupStatus,
  setGetUserStatus,
  setGetUserGroupsStatus,
  setGetItemsStatus,
  setGetPensionerSectionStatus,
} from "../slices/statusSlice";

function TopbarNav({ userName }) {
  const [dropdown, setDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const dropdownTogglerRef = useRef(null);

  const dispatch = useDispatch();

  const toggleCartable = () => {
    dispatch(setGetCartableStatus(true));
    dispatch(setGetGroupStatus(false));
    dispatch(setGetUserStatus(false));
    dispatch(setGetItemsStatus(false));
    dispatch(setGetPensionerSectionStatus(false));
    dispatch(setGetUserGroupsStatus(false));
  };

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
            src="./images/logo.png"
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
            <li onClick={toggleCartable}>کارتابل</li>
            <li>اعلانات</li>
          </ul>
        </div>

        <img
          src="./images/banner.png"
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
