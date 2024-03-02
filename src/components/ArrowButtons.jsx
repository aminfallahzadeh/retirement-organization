// library imports
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Button } from "react-bootstrap";

function ArrowButtons() {
  return (
    <div className="dashboard__body--buttomGrid-arrows">
      <Button variant="outline-primary">
        <KeyboardDoubleArrowLeft />
      </Button>
      <Button variant="outline-primary">
        <KeyboardDoubleArrowRight />
      </Button>
    </div>
  );
}

export default ArrowButtons;
