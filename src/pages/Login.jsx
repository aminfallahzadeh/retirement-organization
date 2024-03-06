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
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";
import { Button } from "react-bootstrap";

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
      console.log(res);

      if (captcha) {
        navigate("/retirement-organization/dashboard");
        /* console.log(res); */
        toast.success(res.message, {
          autoClose: 2000,
          style: {
            fontSize: "18px",
          },
        });
      } else if (!captcha) {
        // reset captcha after invalid input
        dispatch(setCaptchaText(generateCaptcha(6)));
        dispatch(setCaptchaInput(""));
        dispatch(setCaptcha(false));
        toast.error("! کد امنیتی اشتباه است", {
          autoClose: 2000,
          style: {
            fontSize: "18px",
          },
        });
      }
    } catch (err) {
      toast.error(err?.message || err.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }
  };

  const style = {
    position: "absolute",
    top: "18px",
    left: "25px",
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

  return (
    <>
      {" "}
      <video autoPlay loop className="bg" muted>
        <source src="./images/winter.webm" type="video/webm" />
      </video>
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

          <div className="inputBox">
            <input
              type="text"
              id="user"
              className="input field"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
            <label htmlFor="user" className="label">
              نام کاربری
            </label>
            <UserIcon style={style} width={20} />
          </div>

          <div className="inputBox">
            <input
              type="password"
              id="pass"
              className="input field"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <label htmlFor="pass" className="label">
              کلمه عبور
            </label>
            <LockClosedIcon style={style} width={20} />
          </div>
          <div className="loginContainer__box--inputBox">
            <Captcha />
          </div>
          <div className="loginContainer__box--register">
            <Button
              type="submit"
              className="btn--login"
              disabled={isLoading}
              variant="outline-light"
            >
              {isLoading ? "...لطفا منتظر بمانید" : "ورود"}
            </Button>
          </div>
          <div className="loginContainer__box--rememberForgot">
            <div className="loginContainer__box--rememberForgot--forgot">
              <a href="#">کلمه عبور را فراموش کرده اید ؟</a>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
