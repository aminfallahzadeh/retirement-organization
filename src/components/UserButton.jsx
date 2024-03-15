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
        <Button variant={variant} disabled style={{ width: "100%" }}>
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
          style={{ width: "100%" }}
        >
          {icon === "close" ? (
            <>
              <CloseIcon />
              &nbsp;
            </>
          ) : icon === "refresh" ? (
            <>
              <RefreshIcon />
              &nbsp;
            </>
          ) : icon === "add" ? (
            <>
              <AddIcon />
              &nbsp;
            </>
          ) : icon === "done" ? (
            <>
              <DoneIcon />
              &nbsp;
            </>
          ) : icon === "search" ? (
            <>
              <SearchIcon />
              &nbsp;
            </>
          ) : null}
          {children}
        </Button>
      )}
    </>
  );
}

export default SaveButton;
