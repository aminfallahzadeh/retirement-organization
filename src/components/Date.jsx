// library imports
import moment from "moment-jalaali";

// helpers
import { convertToPersianNumber } from "../helper";
function Date() {
  // Get current date in Jalali calendar
  const currentDate = moment().locale("fa").format("jYYYY/jMM/jDD");

  const persianDate = convertToPersianNumber(currentDate);

  return (
    <>
      <div className="datetime">
        <div style={{ fontSize: "12px" }}>{persianDate}</div>
      </div>
    </>
  );
}
export default Date;
