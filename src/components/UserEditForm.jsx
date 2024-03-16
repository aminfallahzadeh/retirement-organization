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
    <section className="formContainer flex-col flex-center">
      <form method="POST" className="grid grid--col-3">
        <div className="inputBox__form">
          <div
            className="inputBox__form--input"
            style={{ backgroundColor: "#a0a0a0" }}
          >
            <div className="inputBox__form--readOnly-label">نام کاربری</div>
            <div className="inputBox__form--readOnly-content">{userName}</div>
          </div>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="psw"
            value={fname}
            onChange={handleFnameChange}
          />
          <label className="inputBox__form--label" htmlFor="psw">
            رمز عبور
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="fname"
            value={fname}
            onChange={handleFnameChange}
          />
          <label className="inputBox__form--label" htmlFor="fname">
            نام
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="family"
            value={lname}
            onChange={handleLnameChange}
          />
          <label className="inputBox__form--label" htmlFor="familly">
            نام خانوادگی
          </label>
        </div>

        <div className="inputBox__form">
          <select
            className="inputBox__form--input"
            id="isActive"
            style={{ cursor: "pointer" }}
            value={isActive}
            onChange={handleIsActiveChange}
          >
            <option value="true">فعال</option>
            <option value="false">غیر فعال</option>
          </select>
          <label className="inputBox__form--label" htmlFor="isActive">
            وضعیت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="mail"
            value={lname}
            onChange={handleLnameChange}
          />
          <label className="inputBox__form--label" htmlFor="mail">
            پست الکترونیکی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="tel"
            value={lname}
            onChange={handleLnameChange}
          />
          <label className="inputBox__form--label" htmlFor="tel">
            تلفن ثابت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="cell"
            value={lname}
            onChange={handleLnameChange}
          />
          <label className="inputBox__form--label" htmlFor="cell">
            تلفن همراه
          </label>
        </div>

        <div className="inputBox__form">
          <select
            className="inputBox__form--input"
            id="isActive"
            style={{ cursor: "pointer" }}
            value={isActive}
            onChange={handleIsActiveChange}
          >
            <option value="0">زن</option>
            <option value="1">مرد</option>
          </select>
          <label className="inputBox__form--label" htmlFor="isActive">
            وضعیت
          </label>
        </div>
      </form>

      <div>
        <UserButton variant={"outline-success"} icon={"done"}>
          ذخیره
        </UserButton>
      </div>
    </section>
  );

  return content;
}

export default UserEditForm;
