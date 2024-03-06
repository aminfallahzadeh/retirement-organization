// react imports
import { useRef, useEffect } from "react";

// helpers
import { generateCaptcha } from "../helper.js";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import {
  setCaptcha,
  setCaptchaInput,
  setCaptchaText,
} from "../slices/captchaSlice";

// library imports
import { Button } from "react-bootstrap";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

function Captcha() {
  // const [captchaText, setCaptchaText] = useState(generateCaptcha(6));
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
    const startX = (canvas.width - textWidth) / 3;

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
    top: "18px",
    left: "25px",
  };

  return (
    <div className="captchaContainer">
      <div className="inputBox">
        <input
          type="text"
          id="captcha"
          className="input field"
          value={userInput}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="captcha" className="label">
          کد را وارد کنید
        </label>
        <VpnKeyIcon style={style} />
      </div>
      <div className="captchaContainer__text">
        <canvas ref={canvasRef} width="200" height="40">
          {captchaText}
        </canvas>

        <Button
          onClick={refreshCaptcha}
          variant="outline-light"
          style={{ marginRight: "30px" }}
        >
          <AutorenewIcon />
        </Button>
      </div>
    </div>
  );
}

export default Captcha;
