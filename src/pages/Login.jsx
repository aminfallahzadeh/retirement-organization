// react imports
import { useEffect, useState } from "react";

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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // user authentication logic

    try {
      const res = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      setUsername("");
      setPassword("");
      console.log(res);

      if (captcha) {
        navigate("/retirement-organization/dashboard");
        /* console.log(res); */
        toast.success(res.message, {
          autoClose: 2000,
        });
      } else if (!captcha) {
        // reset captcha after invalid input
        dispatch(setCaptchaText(generateCaptcha(6)));
        dispatch(setCaptchaInput(""));
        dispatch(setCaptcha(false));
        toast.error("! کد امنیتی اشتباه است", {
          autoClose: 2000,
        });
      }
    } catch (err) {
      setUsername("");
      setPassword("");
      dispatch(setCaptchaText(generateCaptcha(6)));
      dispatch(setCaptchaInput(""));
      toast.error(err?.data?.message || err.error, {
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
        onSubmit={handleSubmit}
        method="POST"
        noValidate
      >
        <div className="loginContainer__box" id="form">
          <div className="loginContainer__box--header">
            <span>ورود به صفحه کاربری</span>
          </div>

          <div className="inputBox__login ">
            <input
              type="text"
              id="user"
              className="inputBox__login--input"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
            <label htmlFor="user" className="inputBox__login--label">
              نام کاربری
            </label>
            <PersonOutlinedIcon style={style} />
          </div>

          <div className="inputBox__login">
            <input
              type="password"
              id="pass"
              className="inputBox__login--input"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <label htmlFor="pass" className="inputBox__login--label">
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
