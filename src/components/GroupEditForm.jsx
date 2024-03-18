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

      <div>
        <UserButton
          isLoading={isLoading}
          onClickFn={updateGroupHandler}
          variant={"outline-success"}
          icon={"done"}
          disabled={groupName === selectedGroupData?.name || !groupName}
        >
          ذخیره
        </UserButton>
      </div>
    </section>
  );

  return content;
}

export default GroupNameInput;
