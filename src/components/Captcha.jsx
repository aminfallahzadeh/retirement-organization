// react imports
import { useState, useRef, useEffect, useContext } from "react";

// rrd imports
import { AuthContext } from "../providers/AuthProvider";

// library imports
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";

function Captcha() {
  const [captchaText, setCaptchaText] = useState(generateCaptcha(6));
  const [userInput, setUserInput] = useState("");
  const { CapthaHandler } = useContext(AuthContext);
  const canvasRef = useRef(null);

  function generateCaptcha(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  const style = {
    position: "absolute",
    top: "15px",
    left: "25px",
  };

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
      // Addjust startX for each char
      ctx.translate(startX + i * 20, 30);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillText(captchaText[i], 0, 0);
      ctx.restore();
    }
  }, [captchaText]);

  function regenCaptcha(e) {
    e.preventDefault();
    setCaptchaText(generateCaptcha(6));
    setUserInput("");
    CapthaHandler(false);
  }

  function handleInputChange(e) {
    const input = e.target.value;
    setUserInput(input);

    if (input.toLowerCase() === captchaText.toLowerCase()) {
      CapthaHandler(true);
    } else {
      CapthaHandler(false);
    }
  }

  return (
    <div className="captchaContainer">
      <div className="captchaContainer__text">
        <canvas ref={canvasRef} width="200" height="40">
          {captchaText}
        </canvas>
        <button onClick={regenCaptcha} className="btn--login">
          تلاش مجدد
        </button>
      </div>
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
        <ArrowPathRoundedSquareIcon style={style} width={25} />
      </div>
    </div>
  );
}

export default Captcha;
