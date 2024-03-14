// bootstrap imports
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

// mui imports
import {
  Done as DonIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
} from "@mui/icons-material";

function SaveButton({
  isLoading,
  onClickFn,
  variant,
  disabled,
  icon,
  children,
}) {
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
        <Button variant={variant} onClick={onClickFn} disabled={disabled}>
          {icon === "close" ? (
            <CloseIcon />
          ) : icon === "refresh" ? (
            <RefreshIcon />
          ) : icon === "add" ? (
            <AddIcon />
          ) : (
            <DonIcon />
          )}
          &nbsp; {children}
        </Button>
      )}
    </>
  );
}

export default SaveButton;
