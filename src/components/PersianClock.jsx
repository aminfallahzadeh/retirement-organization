import { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

function PersianClock() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Clock value={value} size={75} />
    </div>
  );
}

export default PersianClock;
