// react imports
import { useState } from "react";
import { useForm } from "react-hook-form";

// rrd imports
import { useNavigate } from "react-router-dom";

// redux imports
import {
  useInsertUserMutation,
  useInsertGroupUsersMutation,
} from "../slices/usersApiSlice";

// mui imports
import { IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  Save as SaveIcon,
  RemoveRedEyeOutlined as EyeOpenIcon,
  VisibilityOffOutlined as EyeClosIcon,
} from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";

// helpers
import { convertToPersianNumber, convertToEnglishNumber } from "../helper";

function CreateUserForm({ addedGroups }) {
  const [showPssword, setShowPssword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // recive api reducers
  const [insertUser, { isLoading: isCreating }] = useInsertUserMutation();
  const [insertGroupUsers, { isLoading: isInserting }] =
    useInsertGroupUsersMutation();

  const handleShowPasswordChange = () => {
    setShowPssword(!showPssword);
  };

  // handle create user
  const onSubmit = async (data) => {
    if (addedGroups.length === 0) {
      try {
        const createUserRes = await insertUser({
          ...data,
          mobile: convertToEnglishNumber(data.mobiel),
          tel: convertToEnglishNumber(data.tel),
          password: convertToEnglishNumber(data.password),
          isActive: data.isActive === "true" ? true : false,
          sex: data.sex === "true" ? true : false,
        }).unwrap();
        toast.success(createUserRes.message, {
          autoClose: 2000,
        });
        navigate("/retirement-organization/users");
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error, {
          autoClose: 2000,
        });
      }
    } else {
      try {
        const createUserRes = await insertUser({
          ...data,
          mobile: convertToEnglishNumber(data.mobiel),
          tel: convertToEnglishNumber(data.tel),
          password: convertToEnglishNumber(data.password),
          isActive: data.isActive === "true" ? true : false,
          sex: data.sex === "true" ? true : false,
        }).unwrap();

        try {
          const userID = createUserRes.itemList[0].userID;
          const data = addedGroups.map((item) => ({
            "id": "",
            userID,
            "groupID": item.id,
            "groupName": "",
          }));
          const insertRes = await insertGroupUsers(data).unwrap();
          toast.success(insertRes.message, {
            autoClose: 2000,
          });
          navigate("/retirement-organization/users");
        } catch (err) {
          console.log(err);
          toast.error(err?.data?.message || err.error, {
            autoClose: 2000,
          });
        }
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error, {
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <section className="formContainer">
      <form
        method="POST"
        className="flex-col"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid--col-4">
          <div className="inputBox__form">
            {errors.username && (
              <span className="error-form">{errors.username.message}</span>
            )}
            <input
              type="text"
              autoComplete="new-username"
              className="inputBox__form--input"
              required
              {...register("username", { required: "نام کاربری را وارد کنید" })}
              id="usrName"
            />
            <label className="inputBox__form--label" htmlFor="usrName">
              <span>*</span> نام کاربری
            </label>
          </div>

          <div className="inputBox__form">
            <div className="inputBox__form--icon">
              <IconButton onClick={handleShowPasswordChange}>
                {showPssword ? <EyeClosIcon /> : <EyeOpenIcon />}
              </IconButton>
            </div>

            {errors.password && (
              <span className="error-form">{errors.password.message}</span>
            )}
            <input
              type={showPssword ? "text" : "password"}
              className="inputBox__form--input"
              autoComplete="new-password"
              required
              {...register("password", {
                required: "رمز عبور را وارد کنید",
                onChange: (e) => {
                  let value = convertToPersianNumber(e.target.value);
                  setValue("password", value);
                },
              })}
              id="pssw"
            />
            <label className="inputBox__form--label" htmlFor="pssw">
              <span>*</span> رمز عبور
            </label>
          </div>

          <div className="inputBox__form">
            {errors.isActive && (
              <span className="error-form">{errors.isActive.message}</span>
            )}

            <select
              className="inputBox__form--input"
              id="isActive"
              {...register("isActive", { required: "وضعیت را انتخاب کنید" })}
              required
              defaultValue=""
            >
              <option disabled value="">
                انتخاب
              </option>
              <option value="true">فعال</option>
              <option value="false">غیر فعال</option>
            </select>
            <label className="inputBox__form--combo-label" htmlFor="isActive">
              <span>*</span> وضعیت
            </label>
          </div>

          <div className="inputBox__form">
            {errors.firstName && (
              <span className="error-form">{errors.firstName.message}</span>
            )}

            <input
              type="text"
              className="inputBox__form--input"
              {...register("firstName", { required: "نام را وارد کنید" })}
              required
              id="nam"
            />
            <label className="inputBox__form--label" htmlFor="nam">
              <span>*</span> نام
            </label>
          </div>

          <div className="inputBox__form">
            {errors.lastName && (
              <span className="error-form">{errors.lastName.message}</span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              required
              {...register("lastName", {
                required: "نام خانوادگی را وارد کنید",
              })}
              id="namekh"
            />
            <label className="inputBox__form--label" htmlFor="namekh">
              <span>*</span> نام خانوادگی
            </label>
          </div>

          <div className="inputBox__form">
            {errors.email && (
              <span className="error-form">ایمیل معتبر نیست</span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              {...register("email", {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
              required
              id="postE"
            />
            <label className="inputBox__form--label" htmlFor="postE">
              پست الکترونیک
            </label>
          </div>

          <div className="inputBox__form">
            {errors.sex && (
              <span className="error-form">{errors.sex.message}</span>
            )}

            <select
              className="inputBox__form--input"
              id="sex"
              required
              defaultValue=""
              {...register("sex", { required: "جنسیت را انتخاب کنید" })}
            >
              <option value="" disabled>
                انتخاب
              </option>
              <option value="true">مرد</option>
              <option value="false">زن</option>
            </select>
            <label className="inputBox__form--combo-label" htmlFor="sex">
              <span>*</span> جنسیت
            </label>
          </div>

          <div className="inputBox__form">
            {errors.tel && (
              <span className="error-form">{errors.tel.message}</span>
            )}

            <input
              type="text"
              className="inputBox__form--input"
              required
              {...register("tel", {
                required: "تلفن را وارد کنید",
                onChange: (e) => {
                  let value = convertToPersianNumber(e.target.value);
                  setValue("tel", value);
                },
              })}
              id="Tell"
            />
            <label className="inputBox__form--label" htmlFor="Tell">
              <span>*</span> تلفن ثابت
            </label>
          </div>

          <div className="inputBox__form">
            {errors.mobile && (
              <span className="error-form">{errors.mobile.message}</span>
            )}

            <input
              type="text"
              className="inputBox__form--input"
              required
              id="Cell"
              {...register("mobile", {
                required: "تلفن همراه را وارد کنید",
                onChange: (e) => {
                  let value = convertToPersianNumber(e.target.value);
                  setValue("mobile", value);
                },
              })}
            />
            <label className="inputBox__form--label" htmlFor="Cell">
              <span>*</span> تلفن همراه
            </label>
          </div>
        </div>

        <div style={{ marginRight: "auto" }}>
          <LoadingButton
            dir="ltr"
            endIcon={<SaveIcon />}
            loading={isCreating || isInserting}
            onClick={handleSubmit}
            variant="contained"
            type="submit"
            color="success"
            sx={{ fontFamily: "sahel" }}
          >
            <span>ذخیره</span>
          </LoadingButton>
        </div>
      </form>
    </section>
  );
}

export default CreateUserForm;
