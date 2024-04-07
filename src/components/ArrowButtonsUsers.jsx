// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useInsertGroupUsersMutation } from "../slices/usersApiSlice";

// library imports
import { toast } from "react-toastify";

// mui imports
import {
  KeyboardDoubleArrowLeft as DoubleArrowLeftIcon,
  KeyboardDoubleArrowRight as DoubleArrowRightIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

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

  const [insertGroupUsers, { isLoading: isInserting }] =
    useInsertGroupUsersMutation();

  const saveChangesHandler = async () => {
    try {
      const userID = selectedUserData.id;
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
        onClick={() => handleAddGroup(selectedGroupUserData.id)}
        variant="contained"
        color="primary"
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        onClick={() => handleRemoveGroup(selectedUserGroupData.id)}
        variant="contained"
        color="primary"
      >
        <DoubleArrowRightIcon />
      </Button>

      <LoadingButton
        dir="ltr"
        endIcon={<SaveIcon />}
        loading={isInserting}
        onClick={saveChangesHandler}
        variant="contained"
        color="success"
        sx={{ fontFamily: "sahel" }}
      >
        <span>ذخیره</span>
      </LoadingButton>
    </div>
  );

  return content;
}

export default ArrowButtonsUsers;
