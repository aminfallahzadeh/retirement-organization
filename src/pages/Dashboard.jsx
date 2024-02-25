// library imports
import { jwtDecode } from "jwt-decode";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

// component imports
import Grid from "../components/Grid";

// rrd imports
import { useNavigate } from "react-router-dom";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { setGetGroupStatus, setGetGroupData } from "../slices/userReqSlice";
import { useGetGroupMutation } from "../slices/usersApiSlice";

// react imports
import { useEffect, useState } from "react";
import useLogout from "../hooks/useLogout";

// react bootstrap
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  // get username from userInfo
  const [userName, setUserName] = useState("");

  const logoutHandler = useLogout();

  const { userInfo, token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [getGroup] = useGetGroupMutation();

  const { getGroupStatus } = useSelector((state) => state.userReq);

  const getGroupHandler = async () => {
    try {
      const res = await getGroup(token);
      dispatch(setGetGroupData(res.data));
      dispatch(setGetGroupStatus(!getGroupStatus));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/retirement-organization/");
    } else {
      setUserName(jwtDecode(userInfo.itemList[0].token).name);
    }
  }, [userInfo, navigate]);

  return (
    <main className="dashboard-body">
      <Navbar
        expand="lg"
        bg="dark"
        variant="dark"
        className="px-5 py-2"
        sticky="top"
      >
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              alt="سازمان بازنشستگی"
              src="./images/logo.png"
              width="80"
              height="80"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">خانه</Nav.Link>
              <Nav.Link href="#link">اعلانات</Nav.Link>
              <NavDropdown
                title={userName}
                id="basic-nav-dropdown"
                menuVariant="dark"
                drop="down-centered"
              >
                <NavDropdown.Item>پروفایل</NavDropdown.Item>
                <NavDropdown.Divider className="devider" />
                <NavDropdown.Item onClick={logoutHandler}>
                  خروج
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Sidebar rtl={true}>
        <Menu>
          <SubMenu label="امور بازنشستان">
            <MenuItem> بازنشسته</MenuItem>
            <MenuItem> احکام گروهی </MenuItem>
            <MenuItem> رویت تعرفه کارمندی </MenuItem>
            <MenuItem> رویت احکام کارمندی </MenuItem>
            <MenuItem> گزارشات </MenuItem>
          </SubMenu>
          <MenuItem>امورمشتریان </MenuItem>
          <MenuItem> حقوق و دستمزد </MenuItem>
          <MenuItem>اجتماعی و رفاهی </MenuItem>
          <MenuItem> مدیریت سیستم </MenuItem>
          <MenuItem onClick={getGroupHandler}> اطلاعات پایه </MenuItem>
          <MenuItem> گزارشات </MenuItem>
        </Menu>
      </Sidebar>
      <Grid />
    </main>
  );
}

export default Dashboard;
