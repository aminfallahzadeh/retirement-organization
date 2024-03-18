// bootstrap imports
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

// mui imports
import {
  Done as DoneIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Login as LoginIcon,
} from "@mui/icons-material";

function SaveButton({
  isLoading,
  onClickFn,
  variant,
  disabled,
  fullWidth,
  icon,
  size,
  children,
}) {
  return (
    <>
      {isLoading ? (
        <Button
          variant={variant}
          disabled
          style={fullWidth ? { width: "100%" } : {}}
          size={size}
        >
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
        <Button
          variant={variant}
          onClick={onClickFn}
          disabled={disabled}
          style={fullWidth ? { width: "100%" } : {}}
          size={size}
        >
          {icon === "close" ? (
            <>
              <CloseIcon />
            </>
          ) : icon === "refresh" ? (
            <>
              <RefreshIcon />
            </>
          ) : icon === "add" ? (
            <>
              <AddIcon />
            </>
          ) : icon === "done" ? (
            <>
              <DoneIcon />
            </>
          ) : icon === "search" ? (
            <>
              <SearchIcon />
            </>
          ) : icon === "login" ? (
            <>
              <LoginIcon />
            </>
          ) : null}
          {children}
        </Button>
      )}
    </>
  );
}

export default SaveButton;
