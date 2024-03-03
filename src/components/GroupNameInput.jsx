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
    <div className="inputBox">
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
    </div>
  );
}

export default GroupNameInput;
