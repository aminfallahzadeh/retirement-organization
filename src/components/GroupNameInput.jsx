// react imports
import { useState, useEffect } from "react";

// redux imports
import { useSelector } from "react-redux";

function GroupNameInput() {
  const { getGroupInfo } = useSelector((state) => state.userReq);
  const [groupName, setGroupName] = useState(getGroupInfo?.name);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  useEffect(() => {
    setGroupName(getGroupInfo?.name);
  }, [getGroupInfo]);

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
