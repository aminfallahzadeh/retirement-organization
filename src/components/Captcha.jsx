// react imports
import { useRef, useEffect } from "react";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import {
  setCaptcha,
  setCaptchaInput,
  setCaptchaText,
} from "../slices/captchaSlice";

// mui imports
import {
  VpnKeyOutlined as VpnKeyOutlinedIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { Button } from "@mui/material";

// helpers
import { generateCaptcha } from "../helper.js";

function Captcha() {
  const { userInput, captchaText } = useSelector((state) => state.captcha);

  const canvasRef = useRef(null);

  const dispatch = useDispatch();

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
    ctx.fillStyle = "#f3f3f3";
    ctx.font = "28px Arial";

    const textWidth = ctx.measureText(captchaText).width;
    const startX = (canvas.width - textWidth) / 2;

    for (let i = 0; i < captchaText.length; i++) {
      ctx.save();
      // adjust startX for each char
      ctx.translate(startX + i * 20, 30);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillText(captchaText[i], 0, 0);
      ctx.restore();
    }
  }, [captchaText]);

  useEffect(() => {
    dispatch(setCaptchaText(generateCaptcha(6)));
    dispatch(setCaptchaInput(""));
    dispatch(setCaptcha(false));
  }, [dispatch]);

  function refreshCaptcha(e) {
    e.preventDefault();
    dispatch(setCaptchaText(generateCaptcha(6)));
    dispatch(setCaptchaInput(""));
    dispatch(setCaptcha(false));
  }

  function handleInputChange(e) {
    const input = e.target.value;
    dispatch(setCaptchaInput(input));

    if (input.toLowerCase() === captchaText.toLowerCase()) {
      /* CapthaHandler(true); */
      dispatch(setCaptcha(true));
    } else {
      /* CapthaHandler(false); */
      dispatch(setCaptcha(false));
    }
  }

  const style = {
    position: "absolute",
    top: "15px",
    left: "20px",
  };

  const content = (
    <div>
      <div className="inputBox__login">
        <input
          type="text"
          id="captcha"
          className="inputBox__login--input"
          value={userInput}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="captcha" className="inputBox__login--label">
          کد امنیتی
        </label>
        <VpnKeyOutlinedIcon style={style} />
      </div>
      <div className="flex-row flex-space-between u-margin-bottom-md">
        <Button
          onClick={refreshCaptcha}
          color="primary"
          variant="contained"
          size="small"
        >
          <RefreshIcon />
        </Button>

        <canvas
          ref={canvasRef}
          width="200"
          height="40"
          className="captcha-canvas"
        >
          {captchaText}
        </canvas>
      </div>
    </div>
  );

  return content;
}

export default Captcha;
