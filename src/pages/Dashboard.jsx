// redux imports
import { useSelector } from "react-redux";
import { logout } from "../slices/authSlice";

// library imports
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

// rrd imports
import { useNavigate } from "react-router-dom";

// redux imports
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";

// react imports
import { useEffect, useState } from "react";

// react bootstrap
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const [userName, setUserName] = useState(" ");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo?.itemList[0].token;
  const refreshToken = userInfo?.itemList[0].refreshToken;
  const expiredate = userInfo?.itemList[0].expiredate;

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      const res = await logoutApiCall({
        data: {
          token,
          refreshToken,
          error: "<string>",
          expiredate,
        },
        token: token,
      });
      console.log(res);
      dispatch(logout());
      // navigate(0);
      toast.success(res.data.message, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
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
      <Navbar expand="lg" bg="dark" variant="dark" className="px-5 py-2">
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
                <NavDropdown.Item href="#action/3.1">پروفایل</NavDropdown.Item>
                <NavDropdown.Divider className="devider" />
                <NavDropdown.Item href="#action/3.2" onClick={logoutHandler}>
                  خروج
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Sidebar>
          <Menu>
            <SubMenu label="Charts">
              <MenuItem> Pie charts </MenuItem>
              <MenuItem> Line charts </MenuItem>
            </SubMenu>
            <MenuItem> Documentation </MenuItem>
            <MenuItem> Calendar </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </main>
  );
}

export default Dashboard;
