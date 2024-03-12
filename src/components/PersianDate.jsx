// library imports
import moment from "moment-jalaali";

// component imports
import PersianClock from "./PersianClock";

// helpers
import { convertToPersianNumber } from "../helper";
function PersianDate() {
  // Get current date in Jalali calendar
  const currentDate = moment().locale("fa").format("jYYYY/jMM/jDD");

  // Convert Western Arabic numerals to Eastern Arabic (Persian) numerals
  const persianDate = convertToPersianNumber(currentDate);

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        top: "10px",
        left: "10px",
      }}
    >
      <div style={{ color: "white" }}>{persianDate}</div>
      <div>
        <PersianClock />
      </div>
    </div>
  );
}

export default PersianDate;
