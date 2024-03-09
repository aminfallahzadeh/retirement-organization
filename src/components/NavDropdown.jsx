// library imports
import { Button } from "react-bootstrap";
import React from "react";

// hooks
import useLogout from "../hooks/useLogout";

const NavDropdown = React.forwardRef((props, ref) => {
  const logoutHandler = useLogout();

  const content = (
    <section ref={ref} className="NavDropdown">
      <Button variant="outline-primary">صفحه کاربری</Button>
      <hr className="NavDropdown__line" />
      <Button variant="outline-danger" onClick={logoutHandler}>
        خروج
      </Button>
    </section>
  );
  return content;
});

NavDropdown.displayName = "NavDropdown";

export default NavDropdown;
