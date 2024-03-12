// react imports
import { useState, useEffect } from "react";

// redux imports
import { useSelector } from "react-redux";
import { useUpdateGroupMutation } from "../slices/usersApiSlice";

// bootstrap imports
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

// mui imports
import { Done as DonIcon } from "@mui/icons-material";

function GroupNameInput() {
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
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setGroupName(groupInfo?.name);
  }, [groupInfo]);

  const content = (
    <section className="GroupNameInput">
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

      {isLoading ? (
        <Button variant="outline-success" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>
        </Button>
      ) : (
        <Button variant="outline-success" onClick={updateGroupHandler}>
          <DonIcon />
          &nbsp; ذخیره
        </Button>
      )}
    </section>
  );

  return content;
}

export default GroupNameInput;
