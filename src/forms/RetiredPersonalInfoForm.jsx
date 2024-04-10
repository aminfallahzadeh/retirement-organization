// react imports
import { useState, useEffect } from "react";

// reduxt imports
import { useGetLookupDataQuery } from "../slices/sharedApiSlice.js";
import { useSelector } from "react-redux";

// mui imports
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  PersonOutlined as PersonOutlinedIcon,
  CalendarTodayOutlined as CalenderIcon,
  Save as SaveIcon,
  EditOutlined as EditIcon,
} from "@mui/icons-material";

// helpers
import { convertToPersianDate } from "../helper.js";

// libary imports
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";

function RetiredPersonalInfoForm({ personObject, setPersonObject }) {
  const [maritalStatusCombo, setMaritalStatusCombo] = useState([]);
  const [selectedBirthDate, setSelectedBirthDate] = useState(
    convertToPersianDate(personObject.personBirthDate)
  );
  const [selectedDeathDate, setSelectedDeathDate] = useState(
    convertToPersianDate(personObject.personDeathDate)
  );
  const [isBirthCalenderOpen, setIsBirthCalenderOpen] = useState(false);
  const [isDeathCalenderOpen, setIsDeathCalenderOpen] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const { data: maritalStatusComboItems, isSuccess: isComboSuccess } =
    useGetLookupDataQuery({
      token,
      lookUpType: "MaritialStatus",
      lookUpID: personObject.maritalStatusID,
    });

  useEffect(() => {
    if (isComboSuccess) {
      setMaritalStatusCombo(maritalStatusComboItems.itemList);
    }
  }, [isComboSuccess, maritalStatusComboItems]);

  const handleBirthDateChange = (date) => {
    setSelectedBirthDate(date);
    setPersonObject({
      ...personObject,
      personBirthdate: selectedBirthDate.toISOString(),
    });
    setIsBirthCalenderOpen(false);
  };

  const handleDeathDateChange = (date) => {
    setSelectedDeathDate(date);
    setPersonObject({
      ...personObject,
      personDeathDate: selectedDeathDate.toISOString(),
    });
    setIsDeathCalenderOpen(false);
  };

  const handleBirthOpenChange = (open) => {
    setIsBirthCalenderOpen(open);
  };

  const handleDeathOpenChange = (open) => {
    setIsDeathCalenderOpen(open);
  };

  const handlePersonObjectChange = (e) => {
    const { name, value } = e.target;
    setPersonObject({
      ...personObject,
      [name]: value,
    });
  };

  const content = (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-3" noValidate>
        <div className="row-span-2 flex-row flex-row--grow-second">
          <div className="formPic">
            <PersonOutlinedIcon sx={{ fontSize: 70, color: "#707070" }} />
          </div>

          <div className="flex-col flex-center flex-col--grow">
            <div className="inputBox__form">
              <input
                type="text"
                name="personFirstName"
                id="name"
                className="inputBox__form--input"
                value={personObject?.personFirstName || ""}
                onChange={handlePersonObjectChange}
                required
              />
              <label htmlFor="name" className="inputBox__form--label">
                <span>*</span> نام
              </label>
            </div>
            <div className="inputBox__form">
              <input
                type="text"
                name="personLastName"
                id="surname"
                className="inputBox__form--input"
                value={personObject?.personLastName || ""}
                onChange={handlePersonObjectChange}
                required
              />
              <label htmlFor="surname" className="inputBox__form--label">
                <span>*</span> نام خانوادگی
              </label>
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            name="personNationalCode"
            id="melliCode"
            className="inputBox__form--input"
            value={personObject?.personNationalCode || ""}
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="melliCode" className="inputBox__form--label">
            <span>*</span> کد ملی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            name="personCertificatetNo"
            id="shCode"
            className="inputBox__form--input"
            value={personObject?.personCertificatetNo || ""}
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="shCode" className="inputBox__form--label">
            <span>*</span> شماره شناسنامه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="fatherName"
            name="personFatherName"
            className="inputBox__form--input"
            value={personObject?.personFatherName || ""}
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="fatherName" className="inputBox__form--label">
            نام پدر
          </label>
        </div>

        <div className="inputBox__form">
          <select
            type="text"
            name="genderID"
            id="gender"
            className="inputBox__form--input"
            value={personObject?.genderID || "2"}
            onChange={handlePersonObjectChange}
            required
          >
            <option value="2">انتخاب</option>
            <option value="0">مرد</option>
            <option value="1">زن</option>
          </select>
          <label htmlFor="gender" className="inputBox__form--label">
            <span>*</span> جنسیت
          </label>
        </div>

        <div className="inputBox__form">
          <InputDatePicker
            value={selectedBirthDate}
            onChange={handleBirthDateChange}
            format={"jYYYY-jMM-jDD"}
            onOpenChange={handleBirthOpenChange}
            suffixIcon={<CalenderIcon color="action" />}
            open={isBirthCalenderOpen}
            style={{
              border: "2px solid #cfcfcf",
              borderRadius: "6px",
              marginLeft: "0.5rem",
            }}
            wrapperStyle={{
              border: "none",
              cursor: "pointer",
            }}
          />
          <div className="inputBox__form--readOnly-label">تاریخ تولد</div>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            name="personBirthPlace"
            id="birthPlace"
            className="inputBox__form--input"
            value={personObject?.personBirthPlace || ""}
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="birthPlace" className="inputBox__form--label">
            <span>*</span> محل تولد
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="otherName"
            name="personPreviousName"
            className="inputBox__form--input"
            value={personObject?.personPreviousName || ""}
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="otherName" className="inputBox__form--label">
            نام و نام خانوادگی قبلی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="retireNum"
            name="pensionaryId"
            className="inputBox__form--input"
            value={personObject?.pensionaryId || ""}
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="retireNum" className="inputBox__form--label">
            شماره بازنشستگی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="staticPhone"
            name="personPhone"
            className="inputBox__form--input"
            value={personObject?.personPhone || ""}
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="staticPhone" className="inputBox__form--label">
            تلفن ثابت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="cellPhone"
            name="personCellPhone"
            className="inputBox__form--input"
            value={personObject?.personCellPhone || ""}
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="cellPhone" className="inputBox__form--label">
            تلفن همراه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="backupNum"
            name="personCellPhone2"
            className="inputBox__form--input"
            value={personObject?.personCellPhone2 || ""}
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="backupNum" className="inputBox__form--label">
            تلفن پشتیبان
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="backupName"
            value={personObject?.backupFirstName || ""}
            name="backupFirstName"
            className="inputBox__form--input"
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="backupName" className="inputBox__form--label">
            نام پشتیبان
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="backupLname"
            value={personObject?.backupLastName || ""}
            name="backupLastName"
            className="inputBox__form--input"
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="backupLname" className="inputBox__form--label">
            نام خانوادگی پشتیبان
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="personEmail"
            value={personObject?.personEmail || ""}
            name="personEmail"
            className="inputBox__form--input"
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="personEmail" className="inputBox__form--label">
            پست الکترونیک
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="educationTypeId"
            value={personObject?.educationTypeId || ""}
            name="educationTypeId"
            className="inputBox__form--input field"
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="educationTypeId" className="inputBox__form--label">
            <span>*</span> مدرک تحصیلی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="personCountry"
            value={personObject?.personCountry || ""}
            name="personCountry"
            className="inputBox__form--input field"
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="personCountry" className="inputBox__form--label">
            <span>*</span> کشور
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="personState"
            value={personObject?.personState || ""}
            name="personState"
            className="inputBox__form--input"
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="personState" className="inputBox__form--label">
            استان
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="personCity"
            value={personObject?.personCity || ""}
            name="personCity"
            className="inputBox__form--input"
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="personCity" className="inputBox__form--label">
            شهر
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="personRegion"
            value={`${personObject?.personRegion}` || ""}
            name="personRegion"
            className="inputBox__form--input"
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="personRegion" className="inputBox__form--label">
            <span>*</span> منطقه سکونت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            id="personArea"
            value={`${personObject?.personArea}` || ""}
            name="personArea"
            className="inputBox__form--input"
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="personArea" className="inputBox__form--label">
            ناحیه سکونت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="personPostalCode"
            value={personObject?.personPostalCode || ""}
            name="personPostalCode"
            className="inputBox__form--input"
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="personPostalCode" className="inputBox__form--label">
            کد پستی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="housingTypeId"
            value={personObject?.housingTypeId || ""}
            name="housingTypeId"
            className="inputBox__form--input"
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="housingTypeId" className="inputBox__form--label">
            وضعیت مسکن
          </label>
        </div>

        <div className="inputBox__form">
          <select
            type="text"
            name="maritalStatusId"
            id="maritalStatusId"
            className="inputBox__form--input"
            value={personObject?.maritalStatusId || "2"}
            onChange={handlePersonObjectChange}
            required
          >
            <option value="2">انتخاب</option>
            {maritalStatusCombo.map((item) => (
              <option key={item.lookUpID} value={item.lookUpID}>
                {item.lookUpName}
              </option>
            ))}
          </select>
          <label htmlFor="gender" className="inputBox__form--label">
            وضعیت تاهل
          </label>
        </div>

        <div className="inputBox__form">
          <InputDatePicker
            value={selectedDeathDate}
            onChange={handleDeathDateChange}
            format={"jYYYY-jMM-jDD"}
            onOpenChange={handleDeathOpenChange}
            open={isDeathCalenderOpen}
            suffixIcon={<CalenderIcon color="action" />}
            style={{
              border: "2px solid #cfcfcf",
              borderRadius: "6px",
              marginLeft: "0.5rem",
            }}
            wrapperStyle={{
              border: "none",
              cursor: "pointer",
            }}
          />
          <div className="inputBox__form--readOnly-label">تاریخ فوت</div>
        </div>

        <div className="inputBox__form col-span-3">
          <textarea
            type="text"
            id="personAddress"
            value={personObject?.personAddress || ""}
            name="personAddress"
            className="inputBox__form--input"
            onChange={handlePersonObjectChange}
            required
          ></textarea>
          <label htmlFor="personAddress" className="inputBox__form--label">
            نشانی
          </label>
        </div>

        <div className="inputBox__form row-col-span-3">
          <textarea
            type="text"
            id="personDescription"
            value={personObject?.personDescription || ""}
            name="personDescription"
            className="inputBox__form--input"
            onChange={handlePersonObjectChange}
            required
          ></textarea>
          <label htmlFor="personDescription" className="inputBox__form--label">
            توضیحات
          </label>
        </div>
      </form>

      <div style={{ marginRight: "auto" }} className="flex-row">
        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ذخیره</span>
        </LoadingButton>

        <Button
          dir="ltr"
          endIcon={<EditIcon />}
          variant="contained"
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ویرایش</span>
        </Button>
      </div>
    </section>
  );
  return content;
}

export default RetiredPersonalInfoForm;
