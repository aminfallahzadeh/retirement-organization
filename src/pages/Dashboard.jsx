// redux imports
import { useSelector } from "react-redux";

// rrd imports
import { useNavigate } from "react-router-dom";

// react imports
import { useEffect } from "react";

// react bootstrap
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate("/retirement-organization/");
    }
  }, [userInfo, navigate]);

  return (
    <main className="dashboard-body">
      <Navbar expand="lg" bg="dark" variant="dark" className="px-5 py-3">
        <Container fluid>
          <Navbar.Brand href="#home" className="me-auto">
            محل لوگو
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">خانه</Nav.Link>
              <Nav.Link href="#link">اعلانات</Nav.Link>
              <NavDropdown
                title="نام کاربر"
                id="basic-nav-dropdown"
                menuVariant="dark"
                drop="down-centered"
              >
                <NavDropdown.Item href="#action/3.1">پروفایل</NavDropdown.Item>
                <NavDropdown.Divider className="devider" />
                <NavDropdown.Item href="#action/3.2">خروج</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </main>
  );
}

export default Dashboard;
