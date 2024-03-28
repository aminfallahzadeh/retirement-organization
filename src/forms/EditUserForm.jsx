// react imports
import { useState, useEffect } from "react";

// redux imports
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

// components import
import UserButton from "../components/UserButton";

// library imports
import { toast } from "react-toastify";

function UserEditForm({ setShowEditUserModal }) {
  const { selectedUserData } = useSelector((state) => state.usersData);

  const [userObject, setUserObject] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    isActive: "",
    email: "",
    tel: "",
    mobile: "",
    sex: "0",
  });

  const handleUserObjectChange = (e) => {
    const { name, value } = e.target;
    setUserObject({ ...userObject, [name]: value });
  };

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("userObject", userObject);
  }, [userObject]);

  const updateUserHandler = async () => {
    try {
      const res = await updateUser({
        token,
        data: {
          ...userObject,
          "sex":
            userObject.sex === "1" || userObject.sex === true ? true : false,
          "isActive": userObject.isActive === "فعال" ? true : false,
          "editDate": "string",
          "editUser": "string",
          "refreshToken": "string",
          "createDate": "string",
          "createUser": "string",
          "isDelete": 0,
        },
      }).unwrap();
      setShowEditUserModal(false);
      toast.success(res.message, {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    setUserObject(selectedUserData);
  }, [selectedUserData]);

  const content = (
    <section className="formContainer flex-col flex-center">
      <form method="POST" className="grid grid--col-3">
        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">نام کاربری</div>
            <div className="inputBox__form--readOnly-content">
              {userObject.username}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            name="password"
            className="inputBox__form--input"
            required
            id="psw"
            value={userObject.password || ""}
            onChange={handleUserObjectChange}
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
            name="firstName"
            value={userObject.firstName}
            onChange={handleUserObjectChange}
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
            name="lastName"
            value={userObject.lastName}
            onChange={handleUserObjectChange}
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
            name="isActive"
            required
            value={userObject.isActive}
            onChange={handleUserObjectChange}
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
            value={userObject.email}
            name="email"
            onChange={handleUserObjectChange}
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
            name="tel"
            value={userObject.tel}
            onChange={handleUserObjectChange}
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
            value={userObject.mobile}
            name="mobile"
            onChange={handleUserObjectChange}
          />
          <label className="inputBox__form--label" htmlFor="cell">
            تلفن همراه
          </label>
        </div>

        <div className="inputBox__form">
          <select
            className="inputBox__form--input"
            id="sex"
            style={{ cursor: "pointer" }}
            value={userObject.sex}
            name="sex"
            onChange={handleUserObjectChange}
          >
            <option value="0">زن</option>
            <option value="1">مرد</option>
          </select>
          <label className="inputBox__form--label" htmlFor="sex">
            جنسیت
          </label>
        </div>
      </form>

      <div>
        <UserButton
          variant={"outline-success"}
          icon={"done"}
          onClickFn={updateUserHandler}
          isLoading={isLoading}
        >
          ذخیره
        </UserButton>
      </div>
    </section>
  );

  return content;
}

export default UserEditForm;
