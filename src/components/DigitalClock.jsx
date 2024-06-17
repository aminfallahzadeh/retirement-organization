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
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

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
