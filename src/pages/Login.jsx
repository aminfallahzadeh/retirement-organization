import { CiLock, CiUser } from "react-icons/ci";
import { useEffect, useContext, useState } from "react";
import Captcha from "../components/Captcha";
import { AuthContext } from "../providers/AuthProvider";
import users from "../db/userdb";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const { isCaptchaValid } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [psw, setPsw] = useState("");
  const [isCredentialsValid, setIsCredentialsValid] = useState(false);
  const navigate = useNavigate();

  const handleUserInput = (e) => {
    setUserName(e.target.value);
    validateCredentials(e.target.value, psw);
  };

  const handlePswInput = (e) => {
    setPsw(e.target.value);
    validateCredentials(userName, e.target.value);
  };

  const validateCredentials = (user, password) => {
    setIsCredentialsValid(false);

    for (let i = 0; i < users.length; i++) {
      if (password === users[i].psw && user === users[i].userName) {
        setIsCredentialsValid(true);
        return;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    if (isCaptchaValid && isCredentialsValid) {
      navigate("/login-screen/dashboard");
      toast.success("وارد شدید", {
        autoClose: 4000,
      });
    } else {
      toast.error("اطلاعات صحیح نیست", {
        autoClose: 4000,
      });
    }
  };

  const style = {
    position: "absolute",
    top: "18px",
    left: "25px",
    fontSize: "20px",
  };

  useEffect(() => {
    const form = document.getElementById("form");
    form.addEventListener("mouseover", (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 20;
      const y = (window.innerHeight / 2 - e.pageY) / 20;

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
            required
            onChange={handleUserInput}
          />
          <label htmlFor="user" className="label">
            نام کاربری
          </label>
          <CiUser style={style} />
        </div>

        <div className="inputBox">
          <input
            type="password"
            id="pass"
            className="input field"
            required
            onChange={handlePswInput}
          />
          <label htmlFor="pass" className="label">
            کلمه عبور
          </label>
          <CiLock style={style} />
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
          <span>
            حساب کاربری ندارید ؟ <a href="#">بسازید</a>
          </span>
          <button type="submit" className="btn u-margin-bottom-medium">
            ورود
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
