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
  const [itemList, setItemList] = useState([]);

  const { logoutHandler, logoutLoading } = useLogout();
  const location = useLocation();

  const [updateUserTheme] = useUpdateUserThemeMutation();

  // ACCESS PERMISSIONS FROM REDUX STORE
  // const { permissions } = useSelector((state) => state.userPermissionsData);

  // FUNCTION TO CREATE DATA TREE
  const createTree = (items) => {
    const itemMap = {};
    const nestedItems = [];

    // Create a mapping of items by their ID
    items.forEach((item) => {
      itemMap[item.itemID] = { ...item, children: [] };
    });

    // Build the nested structure
    items.forEach((item) => {
      const parentID = item.parentID;
      if (parentID === "0") {
        // This is a top-level item
        nestedItems.push(itemMap[item.itemID]);
      } else if (itemMap[parentID]) {
        // If the parent exists, add the item to its parent's children
        itemMap[parentID].children.push(itemMap[item.itemID]);
      }
    });

    return nestedItems;
  };

  const renderChildren = (itemList, activePanel) => {
    const activeItem = itemList.find((item) => item.itemID === activePanel);

    if (activeItem && activeItem.children.length > 0) {
      return (
        <ul className="nav__panel--list">
          {activeItem.children.map((child) => (
            <li
              key={child.itemID}
              className={isActivePath(child.url) ? "active" : ""}
            >
              <Link to={`/retirement-organization/${child.url}`}>
                {child.itemName}
              </Link>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

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
      const tree = createTree(permissionsList.itemList);
      setItemList(tree);
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
                {itemList.map((item) =>
                  item.children.length === 0 ? (
                    <li
                      key={item.itemID}
                      className={isActivePath(item.url) ? "active" : ""}
                      onClick={() => handlePanelToggle(null)}
                    >
                      <Link to={baseURL + item.url}>{item.itemName}</Link>
                    </li>
                  ) : (
                    <li
                      key={item.itemID}
                      className={isActivePath(item.itemID) ? "active" : ""}
                      onClick={() => handlePanelToggle(item.itemID)}
                    >
                      <a>{item.itemName}</a>
                      <ArrowIcon
                        sx={{
                          color: "#fff",
                          transition: "all 0.25s ease",
                          transform:
                            activePanel === item.itemID ? "rotate(-90deg)" : "",
                        }}
                      />
                    </li>
                  )
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
        {renderChildren(itemList, activePanel)}
      </div>
    </>
  );
}

export default Nav;
