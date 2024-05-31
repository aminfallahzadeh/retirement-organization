// react imports
import { useState, useEffect } from "react";

// redux imports
import { useUpdateGroupMutation } from "../slices/usersApiSlice";

// library imports
import { toast } from "react-toastify";

// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

function GroupNameInput({ setShowEditModal, selectedGroup }) {
  const [groupName, setGroupName] = useState("");

  const [updateGroup, { isLoading }] = useUpdateGroupMutation();

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  useEffect(() => {
    if (selectedGroup) {
      setGroupName(selectedGroup.groupName);
    }
  }, [selectedGroup]);

  const updateGroupHandler = async () => {
    try {
      const res = await updateGroup({
        "id": selectedGroup.id,
        "groupName": groupName,
      }).unwrap();
      setShowEditModal(false);
      toast.success(res.message, {
        autoClose: 2000,
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  const content = (
    <section className="formContainer flex-col flex-center">
      <form method="POST" className="inputBox__form">
        <input
          type="text"
          className="inputBox__form--input inputBox__form--input-height-40"
          required
          id="groupName"
          value={groupName}
          onChange={handleGroupNameChange}
        />
        <label className="inputBox__form--label" htmlFor="groupName">
          نام گروه
        </label>
      </form>

      <LoadingButton
        dir="ltr"
        endIcon={<SaveIcon />}
        loading={isLoading}
        onClick={updateGroupHandler}
        variant="contained"
        color="success"
        disabled={groupName === selectedGroup?.name || !groupName}
        sx={{ fontFamily: "sahel" }}
      >
        <span>ذخیره</span>
      </LoadingButton>
    </section>
  );

  return content;
}

export default GroupNameInput;
