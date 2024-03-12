// react imports
import { useState, useEffect } from "react";

// redux imports
import { useSelector } from "react-redux";

// components import
import UserButton from "./UserButton";

function UserEditForm() {
  const { userInfo } = useSelector((state) => state.userReq);
  const [userName, setUserName] = useState(userInfo?.username);
  const [fname, setFname] = useState(userInfo?.fname);
  const [lname, setLname] = useState(userInfo?.lname);
  const [isActive, setIsActive] = useState(userInfo?.isActive);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleFnameChange = (e) => {
    setFname(e.target.value);
  };

  const handleLnameChange = (e) => {
    setLname(e.target.value);
  };

  const handleIsActiveChange = (e) => {
    setIsActive(e.target.checked);
  };

  useEffect(() => {
    setUserName(userInfo?.username);
    setFname(userInfo?.fname);
    setLname(userInfo?.lname);
    setIsActive(userInfo?.isActive);
  }, [userInfo]);

  const content = (
    <section className="UserEditForm">
      <form method="POST">
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

        <div className="inputBox">
          <select
            className="input field input--dark"
            id="isActive"
            style={{ cursor: "pointer" }}
            value={isActive}
            onChange={handleIsActiveChange}
          >
            <option value="true">فعال</option>
            <option value="false">غیر فعال</option>
          </select>
          <label className="label" htmlFor="isActive">
            وضعیت
          </label>
        </div>
      </form>

      <UserButton variant={"success"}>ذخیره</UserButton>
    </section>
  );

  return content;
}

export default UserEditForm;
