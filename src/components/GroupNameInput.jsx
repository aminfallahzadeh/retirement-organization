// react imports
import { useState, useEffect } from "react";

// redux imports
import { useSelector } from "react-redux";

function GroupNameInput() {
  const { groupInfo } = useSelector((state) => state.userReq);
  const [groupName, setGroupName] = useState(groupInfo?.name);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  useEffect(() => {
    setGroupName(groupInfo?.name);
  }, [groupInfo]);

  return (
    <form className="inputBox" method="POST">
      <input
        type="text"
        className="input field input--dark"
        required
        id="groupName"
        value={groupName}
        onChange={handleGroupNameChange}
      />
      <label className="label" htmlFor="groupName">
        ویرایش نام گروه
      </label>
    </form>
  );
}

export default GroupNameInput;
