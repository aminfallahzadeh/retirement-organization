// react imports
import { useState } from "react";
import { useForm } from "react-hook-form";

// component imports
import Captcha from "../components/Captcha";

// helpers
import { generateCaptcha } from "../helper.js";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import {
  setCaptchaInput,
  setCaptcha,
  setCaptchaText,
} from "../slices/captchaSlice";

// rrd imports
import { useNavigate } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// mui imports
import {
  PersonOutlined as PersonOutlinedIcon,
  Login as LoginIcon,
  RemoveRedEyeOutlined as EyeOpenIcon,
  VisibilityOffOutlined as EyeClosIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";

function Login() {
  const [showPssword, setShowPssword] = useState(false);

  const { captcha } = useSelector((state) => state.captcha);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    // user authentication logic
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials({ ...res }));
      setValue("username", "");
      setValue("password", "");
      if (captcha) {
        navigate("/retirement-organization/dashboard");
        toast.success(res.message, {
          fontSize: "18px",
          autoClose: 2000,
        });
      } else if (!captcha) {
        // reset captcha after invalid input
        dispatch(setCaptchaText(generateCaptcha(4)));
        dispatch(setCaptchaInput(""));
        dispatch(setCaptcha(false));
        setValue("username", "");
        setValue("password", "");
        toast.error("! کد امنیتی اشتباه است", {
          fontSize: "18px",
          autoClose: 2000,
        });
      }
    } catch (err) {
      dispatch(setCaptchaText(generateCaptcha(4)));
      dispatch(setCaptchaInput(""));
      setValue("username", "");
      setValue("password", "");
      toast.error(err?.data?.message || err.error, {
        fontSize: "18px",
        autoClose: 2000,
      });
    }
  };

  // 3D EFFECT
  // useEffect(() => {
  //   const form = document.getElementById("form");
  //   form.addEventListener("mouseover", (e) => {
  //     const x = (window.innerWidth / 2 - e.pageX) / 35;
  //     const y = (window.innerHeight / 2 - e.pageY) / 35;

  //     form.style.transform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
  //   });

  //   form.addEventListener("mouseleave", () => {
  //     form.style.transform = "rotateX(0deg) rotateY(0deg)";
  //   });
  // }, []);

  const handleShowPasswordChange = () => {
    setShowPssword(!showPssword);
  };

  const content = (
    <>
      <img src="./images/login-bg.jpg" className="bg" />
      <form
        className="loginContainer"
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        noValidate
      >
        <div className="loginContainer__box" id="form">
          <div className="loginContainer__box--header">
            <span>ورود به صفحه کاربری</span>
          </div>
          <div className="flex-row flex-center"></div>

          <div className="inputBox__login">
            {errors.username && (
              <span className="error-form">{errors.username.message}</span>
            )}
            <input
              type="text"
              id="usr"
              {...register("username", { required: "نام کاربری را وارد کنید" })}
              className="inputBox__login--input"
              required
              disabled={isLoading}
            />
            <label htmlFor="usr" className="inputBox__login--label">
              نام کاربری
            </label>
            <div className="inputBox__login--icon" style={{ padding: "8px" }}>
              <PersonOutlinedIcon />
            </div>
          </div>
          <div className="inputBox__login">
            {errors.password && (
              <span className="error-form">{errors.password.message}</span>
            )}
            <input
              type={showPssword ? "text" : "password"}
              id="psw"
              {...register("password", { required: "کلمه عبور را وارد کنید" })}
              className="inputBox__login--input"
              required
              disabled={isLoading}
            />
            <label htmlFor="psw" className="inputBox__login--label">
              کلمه عبور
            </label>

            <div className="inputBox__login--icon">
              <IconButton onClick={handleShowPasswordChange} color="inherit">
                {showPssword ? <EyeClosIcon /> : <EyeOpenIcon />}
              </IconButton>
            </div>
          </div>
          <div className="loginContainer__box--inputBox">
            <Captcha />
          </div>

          <LoadingButton
            dir="ltr"
            onClick={handleSubmit}
            type="submit"
            endIcon={<LoginIcon />}
            loading={isLoading}
            variant="contained"
            color="primary"
            sx={{ width: "100%", fontFamily: "sahel" }}
          >
            <span>ورود</span>
          </LoadingButton>

          <div className="loginContainer__box--rememberForgot">
            <div className="loginContainer__box--rememberForgot--forgot">
              <a href="#">کلمه عبور را فراموش کرده اید ؟</a>
            </div>
          </div>
        </div>
      </form>
    </>
  );

  return content;
}

export default Login;
