// react imports
import { useState } from "react";

// components
import GroupsCreateUserGrid from "../grids/GroupsCreateUserGrid";

function CreateUserScreen() {
  const [userObject, setUserObject] = useState({
    id: "",
    username: "",
    password: "",
    isActive: "",
    firstName: "",
    lastName: "",
    email: "",
    sex: "",
    tel: "",
    mobile: "",
    createDate: "",
    createUser: "",
    isDelete: 0,
    editDate: "",
    editUser: "",
    refreshToken: "",
  });

  const handleUserObjectChange = (e) => {
    const { name, value } = e.target;
    setUserObject({ ...userObject, [name]: value });
  };

  const content = (
    <section className="main">
      <form className="formContainer grid grid--col-4">
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="usrName"
            name="username"
            onChange={handleUserObjectChange}
          />
          <label className="inputBox__form--label" htmlFor="usrName">
            نام کاربری
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="password"
            onChange={handleUserObjectChange}
            title="لطفا یک رمز عبور معتبر وارد کنید"
            id="pssw"
          />
          <label className="inputBox__form--label" htmlFor="pssw">
            رمز عبور
          </label>
        </div>

        <div className="inputBox__form">
          <select
            className="inputBox__form--input"
            id="isActive"
            style={{ cursor: "pointer" }}
            name="isActive"
            required
            onChange={handleUserObjectChange}
            value={userObject.isActive}
          >
            <option>انتخاب</option>
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
            id="nam"
            name="firstName"
            onChange={handleUserObjectChange}
          />
          <label className="inputBox__form--label" htmlFor="nam">
            نام
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="namekh"
            name="lastName"
            onChange={handleUserObjectChange}
          />
          <label className="inputBox__form--label" htmlFor="namekh">
            نام خانوادگی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="postE"
            name="email"
            onChange={handleUserObjectChange}
          />
          <label className="inputBox__form--label" htmlFor="postE">
            پست الکترونیک
          </label>
        </div>

        <div className="inputBox__form">
          <select
            className="inputBox__form--input"
            id="sex"
            style={{ cursor: "pointer" }}
            required
            name="sex"
            value={userObject.sex}
            onChange={handleUserObjectChange}
          >
            <option>انتخاب</option>
            <option value="true">مرد</option>
            <option value="false">زن</option>
          </select>
          <label className="inputBox__form--label" htmlFor="sex">
            جنسیت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="Tell"
            name="tel"
            onChange={handleUserObjectChange}
          />
          <label className="inputBox__form--label" htmlFor="Tell">
            تلفن ثابت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="Cell"
            name="mobile"
            onChange={handleUserObjectChange}
          />
          <label className="inputBox__form--label" htmlFor="Cell">
            تلفن همراه
          </label>
        </div>
      </form>

      <GroupsCreateUserGrid userObject={userObject} />
    </section>
  );

  return content;
}

export default CreateUserScreen;