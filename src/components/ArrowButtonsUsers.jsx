// library imports
import { toast } from "react-toastify";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Button } from "react-bootstrap";
// import { toast } from "react-toastify";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  useDeleteGroupUsersMutation,
  useInsertGroupUsersMutation,
} from "../slices/usersApiSlice";

// components
import UserButton from "./UserButton";

import {
  addGroupsToTable,
  removeGroupsFromTable,
} from "../slices/groupsUserDataSlice";

import { addUserGroup, removeUserGroups } from "../slices/userGroupsDataSlice";

function ArrowButtonsUsers() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { selectedUserGroupData, userGroupsTableData } = useSelector(
    (state) => state.userGroupsData
  );
  const { selectedGroupUserData } = useSelector(
    (state) => state.groupsUserData
  );
  const { selectedUserData } = useSelector((state) => state.usersData);

  const [deleteGroupUsers, { isLoading: isDeleting }] =
    useDeleteGroupUsersMutation();

  const [insertGroupUsers, { isLoading: isInserting }] =
    useInsertGroupUsersMutation();

  const saveChangesHandler = async () => {
    try {
      const userID = selectedUserData.id;
      const deleteRes = await deleteGroupUsers({
        token,
        userID,
      }).unwrap();
      console.log(deleteRes);
      try {
        const data = userGroupsTableData.map((item) => ({
          "id": "",
          userID,
          "groupID": item.id,
          "groupName": "",
        }));
        const insertRes = await insertGroupUsers({
          token,
          data,
        }).unwrap();
        console.log(insertRes);
        toast.success(insertRes.message, {
          autoClose: 2000,
        });
      } catch (err) {
        toast.error(err?.data?.message || err.error, {
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
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
        <UserButton
          variant="outline-success"
          icon={"done"}
          onClickFn={saveChangesHandler}
          isLoading={isDeleting || isInserting}
        >
          ذخیره
        </UserButton>
      </div>
    </div>
  );

  return content;
}

export default ArrowButtonsUsers;
