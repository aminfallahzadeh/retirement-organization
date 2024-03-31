// react imports
import { useState, useEffect } from "react";

// redux imports
import { useSelector } from "react-redux";
import { useUpdateGroupMutation } from "../slices/usersApiSlice";

// library imports
import { toast } from "react-toastify";

// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

function GroupNameInput({ setShowEditModal }) {
  const { selectedGroupData } = useSelector((state) => state.groupsData);
  const [groupName, setGroupName] = useState(selectedGroupData?.name || "");

  const [updateGroup, { isLoading }] = useUpdateGroupMutation();
  const { token } = useSelector((state) => state.auth);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const updateGroupHandler = async () => {
    try {
      const res = await updateGroup({
        token,
        data: {
          "id": selectedGroupData?.id,
          "groupName": groupName,
        },
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

  useEffect(() => {
    setGroupName(selectedGroupData.name);
  }, [selectedGroupData]);

  const content = (
    <section className="formContainer flex-col flex-center">
      <form className="inputBox__form">
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
        disabled={groupName === selectedGroupData?.name || !groupName}
        color="success"
        sx={{ fontFamily: "sahel" }}
      >
        <span>ذخیره</span>
      </LoadingButton>
    </section>
  );

  return content;
}

export default GroupNameInput;
