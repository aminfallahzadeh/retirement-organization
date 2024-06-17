// react imports
import { useEffect, useState } from "react";

// helpers
import { convertToPersianNumber } from "../helper";

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => setTime(new Date()), 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  function formatTime() {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    hours = hours <= 9 ? "0" + hours : hours;
    minutes = minutes <= 9 ? "0" + minutes : minutes;
    seconds = seconds <= 9 ? "0" + seconds : seconds;

    return `${convertToPersianNumber(hours)}:${convertToPersianNumber(
      minutes
    )}:${convertToPersianNumber(seconds)}`;
  }

  return (
    <div className="clock-container">
      <div className="clock">
        <span>{formatTime()}</span>
      </div>
    </div>
  );
}

export default DigitalClock;
