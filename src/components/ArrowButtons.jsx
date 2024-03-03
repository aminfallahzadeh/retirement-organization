// library imports
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Button } from "react-bootstrap";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemsDataById,
  addGroupItemsDataById,
} from "../slices/userReqSlice";

function ArrowButtons() {
  const { itemInfo } = useSelector((state) => state.userReq);
  const dispatch = useDispatch();

  const removeHandler = async (id) => {
    dispatch(removeItemsDataById(id));
    dispatch(addGroupItemsDataById(itemInfo));
  };

  return (
    <div className="dashboard__body--buttomGrid-arrows">
      <Button
        variant="outline-primary"
        onClick={() => removeHandler(itemInfo._id)}
      >
        <KeyboardDoubleArrowLeft />
      </Button>
      <Button variant="outline-primary">
        <KeyboardDoubleArrowRight />
      </Button>
    </div>
  );
}

export default ArrowButtons;
