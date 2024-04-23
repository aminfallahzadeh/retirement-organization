// react imports
import { useState, useEffect } from "react";

// redux imports
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

// library imports
import { toast } from "react-toastify";

// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

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

  useEffect(() => {
    console.log("userObject", userObject);
  }, [userObject]);

  const updateUserHandler = async () => {
    try {
      const res = await updateUser({
        ...userObject,
        "sex": userObject.sex === "true" ? true : false,
        "isActive": userObject.isActive === "true" ? true : false,
        "editDate": "string",
        "editUser": "string",
        "refreshToken": "string",
        "createDate": "string",
        "createUser": "string",
        "isDelete": 0,
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
    if (selectedUserData) {
      setUserObject({
        ...selectedUserData,
        isActive: selectedUserData.isActive === "فعال" ? true : false,
        sex: selectedUserData.sex === true ? "true" : "false",
      });
    }
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
            value={userObject.sex || ""}
            name="sex"
            onChange={handleUserObjectChange}
          >
            <option value="true">مرد</option>
            <option value="false">زن</option>
          </select>
          <label className="inputBox__form--label" htmlFor="sex">
            جنسیت
          </label>
        </div>
      </form>

      <LoadingButton
        dir="ltr"
        endIcon={<SaveIcon />}
        loading={isLoading}
        onClick={updateUserHandler}
        variant="contained"
        color="success"
        sx={{ fontFamily: "sahel" }}
      >
        <span>ذخیره</span>
      </LoadingButton>
    </section>
  );

  return content;
}

export default UserEditForm;
