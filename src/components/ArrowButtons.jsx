// library imports
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Button } from "react-bootstrap";

// redux imports
import { useSelector, useDispatch } from "react-redux";

import {
  removeItemsFromTable,
  addItemsToTable,
} from "../slices/itemsDataSlice";
import { addGroupItems, removeGroupItems } from "../slices/groupItemsDataSlice";

function ArrowButtons() {
  const dispatch = useDispatch();

  const { selectedItemData } = useSelector((state) => state.itemsData);
  const { selectedGroupItemData } = useSelector(
    (state) => state.groupItemsData
  );

  const handleAddGroupItem = (id) => {
    dispatch(addGroupItems(selectedItemData));
    dispatch(removeItemsFromTable(id));
  };

  const handleRemoveGroupItem = (id) => {
    dispatch(addItemsToTable(selectedGroupItemData));
    dispatch(removeGroupItems(id));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        rowGap: "10px",
      }}
    >
      <Button
        variant="outline-primary"
        onClick={() => handleAddGroupItem(selectedItemData.id)}
      >
        <KeyboardDoubleArrowLeft />
      </Button>
      <Button
        variant="outline-primary"
        onClick={() => handleRemoveGroupItem(selectedGroupItemData.id)}
      >
        <KeyboardDoubleArrowRight />
      </Button>
    </div>
  );
}

export default ArrowButtons;
