// react imports
import { useEffect } from "react";
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
  LockOutlined as LockOutlinIcon,
  PersonOutlined as PersonOutlinedIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

function Login() {
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
    console.log(data);
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

  const style = {
    position: "absolute",
    top: "15px",
    left: "20px",
  };

  useEffect(() => {
    const form = document.getElementById("form");
    form.addEventListener("mouseover", (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 35;
      const y = (window.innerHeight / 2 - e.pageY) / 35;

      form.style.transform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    });

    form.addEventListener("mouseleave", () => {
      form.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  }, []);

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
          <div className="flex-row flex-center">
            {errors.username && (
              <div className="error-form">{errors.username.message}</div>
            )}
            {errors.password && (
              <div className="error-form">{errors.password.message}</div>
            )}
          </div>

          <div className="inputBox__login ">
            <input
              type="text"
              id="username"
              {...register("username", { required: "نام کاربری را وارد کنید" })}
              className="inputBox__login--input"
              required
              disabled={isLoading}
            />
            <label htmlFor="username" className="inputBox__login--label">
              نام کاربری
            </label>
            <PersonOutlinedIcon style={style} />
          </div>

          <div className="inputBox__login">
            <input
              type="password"
              id="password"
              {...register("password", { required: "کلمه عبور را وارد کنید" })}
              className="inputBox__login--input"
              required
              disabled={isLoading}
            />
            <label htmlFor="password" className="inputBox__login--label">
              کلمه عبور
            </label>
            <LockOutlinIcon style={style} />
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
