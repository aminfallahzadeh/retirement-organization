// react imports
import { useState, useEffect } from "react";

// redux imports
import { useSelector } from "react-redux";

function UserEditForm() {
  const { userInfo } = useSelector((state) => state.userReq);
  const [userName, setUserName] = useState(userInfo?.username);
  const [fname, setFname] = useState(userInfo?.fname);
  const [lname, setLname] = useState(userInfo?.lname);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleFnameChange = (e) => {
    setFname(e.target.value);
  };

  const handleLnameChange = (e) => {
    setLname(e.target.value);
  };

  useEffect(() => {
    setUserName(userInfo?.username);
    setFname(userInfo?.fname);
    setLname(userInfo?.lname);
  }, [userInfo]);

  const content = (
    <form method="POST" className="UserEditForm">
      <div className="inputBox">
        <input
          type="text"
          className="input field input--dark"
          required
          id="userName"
          value={userName}
          onChange={handleUserNameChange}
        />
        <label className="label" htmlFor="userName">
          نام کاربری
        </label>
      </div>

      <div className="inputBox">
        <input
          type="text"
          className="input field input--dark"
          required
          id="fname"
          value={fname}
          onChange={handleFnameChange}
        />
        <label className="label" htmlFor="fname">
          نام
        </label>
      </div>

      <div className="inputBox">
        <input
          type="text"
          className="input field input--dark"
          required
          id="lname"
          value={lname}
          onChange={handleLnameChange}
        />
        <label className="label" htmlFor="lname">
          نام خانوادگی
        </label>
      </div>
    </form>
  );

  return content;
}

export default UserEditForm;
