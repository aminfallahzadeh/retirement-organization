// library imports
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// react imports
import useLogout from "../hooks/useLogout";

function TopbarNav({ userName }) {
  const logoutHandler = useLogout();

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="px-5 py-2 topnav"
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
              <NavDropdown.Item onClick={logoutHandler}>خروج</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopbarNav;
