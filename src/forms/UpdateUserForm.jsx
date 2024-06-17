// react imports
import { useState, useEffect } from "react";

// redux imports
import {
  useUpdateUserMutation,
  useGetUserQuery,
} from "../slices/usersApiSlice";

// library imports
import { toast } from "react-toastify";

// mui imports
import { Box, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// helpers
import { convertToPersianNumber, convertToEnglishNumber } from "../helper";

function UpdateUserForm({ setShowEditUserModal, userID }) {
  const [userObject, setUserObject] = useState(null);

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const {
    data: user,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
    error,
  } = useGetUserQuery({ userID });

  useEffect(() => {
    refetch();
    if (isSuccess) {
      setUserObject(user.itemList[0]);
    }

    return () => {
      setUserObject(null);
    };
  }, [isSuccess, user, refetch]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const updateUserHandler = async () => {
    try {
      const res = await updateUser({
        ...userObject,
        sex:
          userObject.sex === "true"
            ? true
            : userObject.sex === true
            ? true
            : false,
        isActive:
          userObject.isActive === "true"
            ? true
            : userObject.isActive === true
            ? true
            : false,
        tel: convertToEnglishNumber(userObject.tel),
        mobile: convertToEnglishNumber(userObject.mobile),
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

  const handleUserObjectChange = (e) => {
    const { name, value } = e.target;
    setUserObject({ ...userObject, [name]: value });
  };

  const content = (
    <>
      {isLoading || isFetching || !userObject ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem 10rem",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <section className="formContainer flex-col flex-center">
          <form method="POST" className="grid grid--col-3">
            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">نام کاربری</div>
                <div className="inputBox__form--readOnly-content">
                  {userObject.username || "-"}
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
                value={userObject.password || "-"}
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
                value={userObject.firstName || "-"}
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
                value={userObject.lastName || "-"}
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
                value={
                  userObject.isActive === false
                    ? "false"
                    : userObject.isActive === "false"
                    ? "false"
                    : "true" || " "
                }
                onChange={handleUserObjectChange}
              >
                <option value=" " disabled>
                  انتخاب کنید
                </option>
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
                value={userObject.email || "-"}
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
                value={convertToPersianNumber(userObject.tel) || "-"}
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
                value={convertToPersianNumber(userObject.mobile) || "-"}
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
                value={
                  userObject.sex === false
                    ? "false"
                    : userObject.sex === "false"
                    ? "false"
                    : "true" || " "
                }
                name="sex"
                onChange={handleUserObjectChange}
              >
                <option value=" " disabled>
                  انتخاب کنید
                </option>
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
            loading={isUpdating}
            onClick={updateUserHandler}
            variant="contained"
            color="success"
            sx={{ fontFamily: "sahel" }}
          >
            <span>ذخیره</span>
          </LoadingButton>
        </section>
      )}
    </>
  );

  return content;
}

export default UpdateUserForm;
