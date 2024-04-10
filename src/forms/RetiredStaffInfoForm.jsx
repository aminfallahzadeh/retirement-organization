// react imports
import { useState } from "react";

// mui imports
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

// helpers
import { convertToPersianDate } from "../helper.js";

// libary imports
import "jalaali-react-date-picker/lib/styles/index.css";
import { DatePicker } from "jalaali-react-date-picker";

function RetiredStaffInfoForm({ personObject, setPersonObject }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleShowDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handlePersonObjectChange = (e) => {
    const { name, value } = e.target;
    setPersonObject({ ...personObject, [name]: value });
  };

  const content = (
    <form method="POST" className="grid grid--col-3 formContainer" noValidate>
      <div className="inputBox__form">
        <input
          type="text"
          id="retiredGroup"
          name="retiredGroup"
          className="inputBox__form--input"
          value={personObject?.retiredGroup || ""}
          onChange={handlePersonObjectChange}
          required
        />
        <label htmlFor="retiredGroup" className="inputBox__form--label">
          <span>*</span> گروه
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="retiredOrganizationId"
          name="retiredOrganizationId"
          value={personObject?.retiredOrganizationId || ""}
          onChange={handlePersonObjectChange}
          className="inputBox__form--input"
          required
        />
        <label
          htmlFor="retiredOrganizationId"
          className="inputBox__form--label"
        >
          <span>*</span> آخرین محل خدمت
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="retiredLastPosition"
          name="retiredLastPosition"
          value={personObject?.retiredLastPosition || ""}
          onChange={handlePersonObjectChange}
          className="inputBox__form--input"
          required
        />
        <label htmlFor="retiredLastPosition" className="inputBox__form--label">
          <span>*</span> سمت
        </label>
      </div>
      <div className="inputBox__form">
        <input
          type="text"
          id="employmentTypeId"
          name="employmentTypeId"
          value={personObject?.employmentTypeId || ""}
          onChange={handlePersonObjectChange}
          className="inputBox__form--input"
          required
        />
        <label htmlFor="employmentTypeId" className="inputBox__form--label">
          <span>*</span> نوع استخدام
        </label>
      </div>

      <div className="inputBox__form">
        <input
          type="text"
          id="retirementDate"
          className="inputBox__form--input"
          onChange={() => {}}
          value={
            convertToPersianDate(personObject?.retirementDate) ===
            "Invalid date"
              ? "از تقویم انتخاب کنید"
              : convertToPersianDate(personObject?.retirementDate)
          }
          name="retirementDate"
          required
        />
        <div className="inputBox__form--icon">
          <CalendarTodayOutlinedIcon
            color="action"
            onClick={handleShowDatePicker}
          />
        </div>
        <div className="inputBox__form--calender">
          {showDatePicker && <DatePicker />}
        </div>
        <label htmlFor="retirementDate" className="inputBox__form--label">
          <span>*</span> تاریخ بازنشستگی
        </label>
      </div>

      <div className="inputBox__form">
        <select
          className="inputBox__form--input"
          id="pensionaryIsActive"
          style={{ cursor: "pointer" }}
          name="pensionaryIsActive"
          required
          value={personObject?.pensionaryIsActive || "انتخاب"}
          onChange={handlePersonObjectChange}
        >
          <option value="انتخاب">انتخاب کنید</option>
          <option value="true">فعال</option>
          <option value="false">غیر فعال</option>
        </select>
        <label className="inputBox__form--label" htmlFor="pensionaryIsActive">
          وضعیت
        </label>
      </div>

      <div className="inputBox__form StaffInfoForm__flex--item">
        <input
          type="text"
          id="retiredJobDegreeCoef"
          className="inputBox__form--input"
          value={personObject?.retiredJobDegreeCoef || ""}
          onChange={handlePersonObjectChange}
          name="retiredJobDegreeCoef"
          required
        />
        <label htmlFor="retiredJobDegreeCoef" className="inputBox__form--label">
          ضریب مدیریتی
        </label>
      </div>
      <div className="inputBox__form StaffInfoForm__flex--item">
        <input
          type="text"
          id="retiredRealDuration"
          className="inputBox__form--input"
          value={personObject?.retiredRealDuration || ""}
          onChange={handlePersonObjectChange}
          name="retiredRealDuration"
          required
        />
        <label htmlFor="retiredRealDuration" className="inputBox__form--label">
          سابقه حقیقی بازنشسته
        </label>
      </div>
      <div className="inputBox__form StaffInfoForm__flex--item">
        <input
          type="text"
          id="retiredGrantDuration"
          className="inputBox__form--input"
          value={personObject?.retiredGrantDuration || ""}
          onChange={handlePersonObjectChange}
          name="retiredGrantDuration"
          required
        />
        <label htmlFor="retiredGrantDuration" className="inputBox__form--label">
          سابقه ارفاقی بازنشسته
        </label>
      </div>
    </form>
  );
  return content;
}

export default RetiredStaffInfoForm;
