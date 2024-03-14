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
    <div className="PersianDateTime">
      <PersianClock />

      <div style={{ color: "white" }}>{persianDate}</div>
    </div>
  );
}

export default PersianDate;
