// react imports
import { useState, useEffect } from "react";

// library imports
import { toast } from "react-toastify";

// redux imports
import { useSelector } from "react-redux";
import { useUpdateGroupMutation } from "../slices/usersApiSlice";

// components import
import UserButton from "./UserButton";

function GroupNameInput({ setShowEditModal }) {
  const { groupInfo } = useSelector((state) => state.userReq);
  const [groupName, setGroupName] = useState(groupInfo?.name || "");

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
          "id": groupInfo?._id,
          "groupName": groupName,
        },
      }).unwrap();
      setShowEditModal(false);
      toast.success(res.message, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }
  };

  useEffect(() => {
    setGroupName(groupInfo?.name);
  }, [groupInfo]);

  const content = (
    <section className="GroupEditForm">
      <form className="inputBox">
        <input
          type="text"
          className="input field input--dark"
          required
          id="groupName"
          value={groupName}
          onChange={handleGroupNameChange}
        />
        <label className="label" htmlFor="groupName">
          نام گروه
        </label>
      </form>

      <UserButton
        isLoading={isLoading}
        onClickFn={updateGroupHandler}
        variant={"outline-success"}
      >
        ذخیره
      </UserButton>
    </section>
  );

  return content;
}

export default GroupNameInput;
