// library imports
import moment from "moment-jalaali";

// component imports
import AnalogClock from "./AnalogClock";

// helpers
import { convertToPersianNumber } from "../helper";
function DateTime() {
  // Get current date in Jalali calendar
  const currentDate = moment().locale("fa").format("jYYYY/jMM/jDD");

  // Convert Western Arabic numerals to Eastern Arabic (Persian) numerals
  const persianDate = convertToPersianNumber(currentDate);

  return (
    <>
      <div className="datetime">
        <AnalogClock />
        <div style={{ color: "#252422" }}>{persianDate}</div>
      </div>
    </>
  );
}

export default DateTime;
