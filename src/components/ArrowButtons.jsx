// library imports
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  useInsertGroupItemMutation,
  useDeleteGroupItemsMutation,
} from "../slices/usersApiSlice";

// components
import UserButton from "./UserButton";

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

  const { selectedGroupData } = useSelector((state) => state.groupsData);
  const { groupItemsTableData } = useSelector((state) => state.groupItemsData);
  const { token } = useSelector((state) => state.auth);

  const [insertGroupItem] = useInsertGroupItemMutation();
  const [deleteGroupItems, { isLoading: isDeleting }] =
    useDeleteGroupItemsMutation();

  const saveChangesHandler = async () => {
    try {
      const groupID = selectedGroupData?.id;
      console.log(groupID);
      const deleteRes = await deleteGroupItems({
        token,
        groupID,
      }).unwrap();
      console.log(deleteRes);
      toast.success(deleteRes.message, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
      try {
        const data = groupItemsTableData.map((item) => ({
          "id": "",
          "itemID": item.id,
          "itemName": "",
          groupID,
        }));
        console.log(data);
        const insertRes = await insertGroupItem({
          token,
          data,
        }).unwrap();
        console.log(insertRes);
        toast.success(insertRes.message, {
          autoClose: 2000,
          style: {
            fontSize: "18px",
          },
        });
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error, {
          autoClose: 2000,
          style: {
            fontSize: "18px",
          },
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }
  };

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

      <div>
        <UserButton
          variant="outline-success"
          icon={"done"}
          onClickFn={saveChangesHandler}
          isLoading={isDeleting}
        >
          ذخیره
        </UserButton>
      </div>
    </div>
  );
}

export default ArrowButtons;
