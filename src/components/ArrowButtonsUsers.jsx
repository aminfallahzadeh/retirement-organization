// library imports
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Button } from "react-bootstrap";
// import { toast } from "react-toastify";

// redux imports
import { useSelector, useDispatch } from "react-redux";

// components
import UserButton from "./UserButton";

import {
  addGroupsToTable,
  removeGroupsFromTable,
} from "../slices/groupsUserDataSlice";

import { addUserGroup, removeUserGroups } from "../slices/userGroupsDataSlice";

function ArrowButtonsUsers() {
  const dispatch = useDispatch();

  const { selectedUserGroupData } = useSelector(
    (state) => state.userGroupsData
  );
  const { selectedGroupUserData } = useSelector(
    (state) => state.groupsUserData
  );

  // const { selectedGroupData } = useSelector((state) => state.groupsData);
  // const { groupItemsTableData } = useSelector((state) => state.groupItemsData);
  // const { token } = useSelector((state) => state.auth);

  // const [insertGroupItem] = useInsertGroupItemMutation();
  // const [deleteGroupItems, { isLoading: isDeleting }] =
  //   useDeleteGroupItemsMutation();

  // const saveChangesHandler = async () => {
  //   try {
  //     const groupID = selectedGroupData?.id;
  //     console.log(groupID);
  //     const deleteRes = await deleteGroupItems({
  //       token,
  //       groupID,
  //     }).unwrap();
  //     console.log(deleteRes);
  //     toast.success(deleteRes.message, {
  //       autoClose: 2000,
  //       style: {
  //         fontSize: "18px",
  //       },
  //     });
  //     try {
  //       const data = groupItemsTableData.map((item) => ({
  //         "id": "",
  //         "itemID": item.id,
  //         "itemName": "",
  //         groupID,
  //       }));
  //       console.log(data);
  //       const insertRes = await insertGroupItem({
  //         token,
  //         data,
  //       }).unwrap();
  //       console.log(insertRes);
  //       toast.success(insertRes.message, {
  //         autoClose: 2000,
  //         style: {
  //           fontSize: "18px",
  //         },
  //       });
  //     } catch (err) {
  //       console.log(err);
  //       toast.error(err?.data?.message || err.error, {
  //         autoClose: 2000,
  //         style: {
  //           fontSize: "18px",
  //         },
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err?.data?.message || err.error, {
  //       autoClose: 2000,
  //       style: {
  //         fontSize: "18px",
  //       },
  //     });
  //   }
  // };

  const handleAddGroup = (id) => {
    dispatch(addUserGroup(selectedGroupUserData));
    dispatch(removeGroupsFromTable(id));
  };

  const handleRemoveGroup = (id) => {
    dispatch(addGroupsToTable(selectedUserGroupData));
    dispatch(removeUserGroups(id));
  };

  const content = (
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
        onClick={() => handleAddGroup(selectedGroupUserData.id)}
      >
        <KeyboardDoubleArrowLeft />
      </Button>
      <Button
        variant="outline-primary"
        onClick={() => handleRemoveGroup(selectedUserGroupData.id)}
      >
        <KeyboardDoubleArrowRight />
      </Button>

      <div>
        <UserButton variant="outline-success" icon={"done"}>
          ذخیره
        </UserButton>
      </div>
    </div>
  );

  return content;
}

export default ArrowButtonsUsers;
