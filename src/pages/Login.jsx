// react imports
import { useEffect, useContext, useState } from "react";

// component imports
import Captcha from "../components/Captcha";

// redux imports
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

// rrd imports
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

// library imports
import { toast } from "react-toastify";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";

function Login() {
  const { isCaptchaValid } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // user authentication logic
    try {
      const res = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      console.log(res);
      console.log(isCaptchaValid);
      if (isCaptchaValid) {
        navigate("/retirement-organization/dashboard");
        console.log(isCaptchaValid);
        toast.success("وارد شدید", {
          autoClose: 4000,
          style: {
            fontSize: "18px",
          },
        });
      } else if (!isCaptchaValid) {
        console.log(isCaptchaValid);
        toast.error("! کد امنیتی اشتباه است", {
          autoClose: 4000,
          style: {
            fontSize: "18px",
          },
        });
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 4000,
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
    <form className="loginContainer bg" onSubmit={handleSubmit} method="POST">
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
          />
          <label htmlFor="pass" className="label">
            کلمه عبور
          </label>
          <LockClosedIcon style={style} width={20} />
        </div>

        <div className="loginContainer__box--rememberForgot">
          <div className="loginContainer__box--rememberForgot--forgot">
            <a href="#">کلمه عبور را فراموش کرده اید ؟</a>
          </div>

          <div className="loginContainer__box--rememberForgot--remember">
            <label
              htmlFor="checkbox"
              className="loginContainer__box--rememberForgot--remember-label"
            >
              مرا به خاطر بسپار
            </label>
            <input type="checkbox" id="checkbox" />
          </div>
        </div>

        <div className="loginContainer__box--inputBox">
          <Captcha isCaptchaValid={isCaptchaValid} />
        </div>

        <div className="loginContainer__box--register">
          <button type="submit" className="btn--login">
            ورود
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
