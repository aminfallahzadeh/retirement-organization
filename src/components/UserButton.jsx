// bootstrap imports
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

// mui imports
import { Done as DonIcon, Close as CloseIcon } from "@mui/icons-material";

function SaveButton({ isLoading, onClickFn, variant, icon, children }) {
  return (
    <>
      {isLoading ? (
        <Button variant="outline-success" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>
        </Button>
      ) : (
        <Button variant={`outline-${variant}`} onClick={onClickFn}>
          {icon === "close" ? <CloseIcon /> : <DonIcon />}
          &nbsp; {children}
        </Button>
      )}
    </>
  );
}

export default SaveButton;
