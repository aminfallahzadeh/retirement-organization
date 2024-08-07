// react imports
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

// redux imports
import { useGetAnnounceQuery } from "../slices/announceApiSlice.js";

// mui imports
import {
  Login as LoginIcon,
  VisibilityOutlined as EyeOpenIcon,
  VisibilityOffOutlined as EyeCloseIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// helpers
import { generateCaptcha } from "../helper.js";

// redux imports
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

// rrd imports
import { useNavigate } from "react-router-dom";

// library imports
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// helpers
import { convertToEnglishNumber } from "../helper.js";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [userInputCaptcha, setUserInputCaptcha] = useState("");
  const [isRotated, setIsRotated] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const canvasRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [login, { isLoading }] = useLoginMutation();

  // GET NEWS
  const {
    data: announces,
    isSuccess: isAnnounceSuccess,
    isLoading: isAnnounceLoading,
    isFetching: isAnnounceFetching,
    error: isAnnounceError,
  } = useGetAnnounceQuery();

  // FETCH ANNOUNCES
  useEffect(() => {
    if (isAnnounceSuccess) {
      console.log(announces.itemList);
    }
  }, [isAnnounceSuccess, announces]);

  // HANDLE ERROR
  useEffect(() => {
    if (isAnnounceError) {
      console.log(isAnnounceError);
    }
  }, [isAnnounceError]);

  // CHECK IF USER IS ALREADY LOGGED IN
  useEffect(() => {
    if (sessionStorage.getItem("userInfo")) {
      navigate("/retirement-organization/cartable");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    // user authentication logic

    if (captcha) {
      try {
        const res = await login(data).unwrap();
        dispatch(setCredentials({ ...res }));
        setValue("username", "");
        setValue("password", "");
        navigate("/retirement-organization/cartable");
        toast.success(res.message, {
          autoClose: 2000,
        });
      } catch (err) {
        setCaptchaText(generateCaptcha(4));
        setUserInputCaptcha("");
        setValue("username", "");
        setValue("password", "");
        toast.error(err?.data?.message || err.error, {
          autoClose: 2000,
        });
      }
    } else {
      //  reset captcha after invalid input
      setCaptchaText(generateCaptcha(4));
      setUserInputCaptcha("");
      setCaptcha(false);
      setValue("username", "");
      setValue("password", "");
      toast.error("! کد امنیتی اشتباه است", {
        autoClose: 2000,
      });
    }
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const refreshCaptcha = (e) => {
    e.preventDefault();
    setCaptchaText(generateCaptcha(4));
    setUserInputCaptcha("");
    setCaptcha(false);
    setIsRotated(true);
  };

  // CAPTCHA CREATOR
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    function addNoise(ctx) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      for (let i = 0; i < pixels.length; i += 1) {
        // Rnadom noise color
        // let color = Math.random() > 0.5 ? 255 : 0;
        let color = Math.random() > 0.5 ? 225 : 0;
        pixels[i] = pixels[i + 1] = pixels[i + 2] = color;
      }
      ctx.putImageData(imageData, 0, 0);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    addNoise(ctx);
    ctx.fillStyle = "#333";
    ctx.font = "28px Arial";

    const textWidth = ctx.measureText(captchaText).width;
    const startX = (canvas.width - textWidth) / 2;

    for (let i = 0; i < captchaText.length; i++) {
      ctx.save();
      // adjust startX for each char
      ctx.translate(startX + i * 30, 30);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillText(captchaText[i], 0, 0);
      ctx.restore();
    }
  }, [captchaText]);

  useEffect(() => {
    setCaptchaText(generateCaptcha(4));
    setUserInputCaptcha("");
    setCaptcha(false);
  }, []);

  function handleCaptchaInputChange(e) {
    const input = e.target.value;
    setUserInputCaptcha(input);

    if (convertToEnglishNumber(input) === captchaText) {
      setCaptcha(true);
    } else {
      setCaptcha(false);
    }
  }

  return (
    <div className="login__main">
      <div className="login__info">
        <div className="login__info--title">
          <div className="title-wrapper">
            <h1>اطلاعیه ها</h1>
          </div>
        </div>

        <div className="login__info--container">
          <Swiper
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
          >
            <SwiperSlide>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است لورم ایپسوم متن ساختگی با تولید سادگی
              نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و
              متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است{" "}
            </SwiperSlide>
            <SwiperSlide>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است لورم ایپسوم متن ساختگی با تولید سادگی
              نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و
              متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است{" "}
            </SwiperSlide>
            <SwiperSlide>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است لورم ایپسوم متن ساختگی با تولید سادگی
              نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و
              متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است{" "}
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="login__credentials">
          <div className="login__credentials--title">
            <h1>ورود به سامانه</h1>
          </div>

          <form
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
            className="login__credentials--form"
            noValidate
          >
            <label htmlFor="username" className="login__credentials--label">
              نام کاربری
            </label>
            <div className="login__credentials--wrapper">
              {errors.username && (
                <span className="error-form">{errors.username.message}</span>
              )}
              <input
                type="text"
                placeholder="نام کاربری خود را وارد نمایید..."
                {...register("username", {
                  required: "نام کاربری را وارد کنید",
                })}
                id="username"
                className="login__credentials--input"
                disabled={isLoading}
              />
            </div>

            <label htmlFor="psw" className="login__credentials--label">
              رمز عبور
            </label>
            <div className="login__credentials--wrapper">
              {errors.password && (
                <span className="error-form">{errors.password.message}</span>
              )}
              <input
                type={showPassword ? "text" : "password"}
                placeholder=" رمز عبور خود را وارد نمایید..."
                {...register("password", {
                  required: "رمز عبور را وارد کنید",
                })}
                id="psw"
                className="login__credentials--input"
                disabled={isLoading}
              />
              <div className="login__credentials--icon">
                <Tooltip title={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}>
                  <span>
                    <IconButton
                      onClick={handleShowPasswordChange}
                      color="primary"
                      size="small"
                    >
                      {showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}
                    </IconButton>
                  </span>
                </Tooltip>
              </div>
            </div>

            <label htmlFor="captcha" className="login__credentials--label">
              کد امنیتی
            </label>
            <div className="login__credentials--wrapper">
              <input
                type="text"
                placeholder="کد روبرو را وارد کنید"
                id="captcha"
                className="login__credentials--input"
                onChange={handleCaptchaInputChange}
                value={userInputCaptcha}
              />
              <div className="login__credentials--captcha">
                <canvas
                  ref={canvasRef}
                  width="130"
                  height="43"
                  className="login__credentials--captcha-canvas"
                >
                  {captchaText}
                </canvas>

                <div className="login__credentials--captcha-icon">
                  <Tooltip title="کد جدید">
                    <span>
                      <IconButton
                        onClick={refreshCaptcha}
                        color="primary"
                        size="small"
                        onAnimationEnd={() => setIsRotated(false)}
                      >
                        <div
                          className={`${
                            isRotated ? "rotate" : ""
                          } flex-row flex-center`}
                        >
                          <RefreshIcon />
                        </div>
                      </IconButton>
                    </span>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div></div>

            <LoadingButton
              dir="ltr"
              onClick={handleSubmit}
              type="submit"
              endIcon={<LoginIcon />}
              loading={isLoading}
              variant="contained"
              color="primary"
              sx={{ width: "100%", fontFamily: "IranYekan" }}
            >
              <span>ورود</span>
            </LoadingButton>

            <div className="login__credentials--forgot">
              <h5>رمز عبور خود را فراموش کرده اید؟</h5>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
