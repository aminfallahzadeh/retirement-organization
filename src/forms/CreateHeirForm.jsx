// react imports
import { useState, useEffect } from "react";

// redux imports
import {
  useGetRelationshipQuery,
  useGetLookupDataQuery,
} from "../slices/sharedApiSlice.js";

// mui imports
import { LoadingButton } from "@mui/lab";
import {
  Save as SaveIcon,
  CalendarTodayOutlined as CalenderIcon,
} from "@mui/icons-material";

// helpers
import { convertToPersianNumber, convertToPersianDate } from "../helper.js";

// libary imports
import { toast } from "react-toastify";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";

function CreateHeirForm() {
  // date states
  const [selectedBirthDate, setSelectedBirthDate] = useState(null);
  const [isBirthCalenderOpen, setIsBirthCalenderOpen] = useState(false);
  const [selectedHeirDate, setSelectedHeirDate] = useState(null);
  const [isHeirCalenderOpen, setIsHeirCalenderOpen] = useState(false);
  const [selectedStoptopShareDate, setSelectedStoptopShareDate] =
    useState(null);
  const [isStoptopShareCalenderOpen, setIsStoptopShareCalenderOpen] =
    useState(false);

  // look up states
  const [relationCombo, setRelationCombo] = useState([]);
  const [maritialStatusCombo, setMaritialStatusCombo] = useState([]);

  // GET LOOK UP DATA
  const { data: relationComboItems, isSuccess: isRelationComboSuccess } =
    useGetRelationshipQuery();

  const { data: maritialStatusComboItems, isSuccess: isMaritialComboSuccess } =
    useGetLookupDataQuery({ lookUpType: "MaritialStatus" });

  // FETCH LOOK UP DATA
  useEffect(() => {
    if (isRelationComboSuccess) {
      setRelationCombo(relationComboItems.itemList);
    }
  }, [isRelationComboSuccess, relationComboItems]);

  useEffect(() => {
    if (isMaritialComboSuccess) {
      setMaritialStatusCombo(maritialStatusComboItems.itemList);
    }
  }, [isMaritialComboSuccess, maritialStatusComboItems]);

  // date handlers
  const handleBirthDateChange = (date) => {
    setSelectedBirthDate(date);
    setIsBirthCalenderOpen(false);
  };

  const handleHeirDateChange = (date) => {
    setSelectedHeirDate(date);
    setIsHeirCalenderOpen(false);
  };

  const handleStoptopShareDateChange = (date) => {
    setSelectedStoptopShareDate(date);
    setIsStoptopShareCalenderOpen(false);
  };

  const handleBirthOpenChange = (open) => {
    setIsBirthCalenderOpen(open);
  };

  const handleHeirOpenChange = (open) => {
    setIsHeirCalenderOpen(open);
  };

  const handleStoptopShareOpenChange = (open) => {
    setIsStoptopShareCalenderOpen(open);
  };

  const content = (
    <section className="formContainer formContainer--width-lg flex-col">
      <form method="POST" className="grid grid--col-3">
        <div className="inputBox__form">
          <select
            type="text"
            className="inputBox__form--input"
            required
            name="relationshipWithParentID"
            id="relationshipWithParentID"
          >
            <option value=" ">انتخاب نسبت</option>
            {relationCombo.map((relation) => (
              <option
                key={relation.relationshipID}
                value={relation.relationshipID}
              >
                {relation.relationshipName}
              </option>
            ))}
          </select>
          <label
            className="inputBox__form--label"
            htmlFor="relationshipWithParentID"
          >
            <span>*</span> نسبت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            name="personFirstName"
            required
            id="personFirstName1"
          />
          <label className="inputBox__form--label" htmlFor="personFirstName1">
            <span>*</span> نام
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            name="personLastName"
            required
            id="personLastName1"
          />
          <label className="inputBox__form--label" htmlFor="personLastName1">
            <span>*</span> نام خانوادگی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            name="personNationalCode"
            required
            id="personNationalCode2"
          />
          <label
            className="inputBox__form--label"
            htmlFor="personNationalCode2"
          >
            <span>*</span> کد ملی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="personCertificatetNo"
            id="personCertificatetNo2"
          />
          <label
            className="inputBox__form--label"
            htmlFor="personCertificatetNo2"
          >
            <span>*</span> شماره شناسنامه
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="personFatherName"
            id="personFatherName1"
          />
          <label className="inputBox__form--label" htmlFor="personFatherName1">
            نام پدر
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
            className="inputBox__form--input"
            required
            name="personBirthPlace"
            id="personBirthPlace1"
          />
          <label className="inputBox__form--label" htmlFor="personBirthPlace1">
            محل تولد
          </label>
        </div>
        <div className="inputBox__form">
          <select
            className="inputBox__form--input"
            name="maritalStatusID"
            required
            id="maritalStatusID1"
          >
            <option value=" ">انتخاب کنید</option>
            {maritialStatusCombo.map((maritalStatus) => (
              <option
                key={maritalStatus.lookUpID}
                value={maritalStatus.lookUpID}
              >
                {maritalStatus.lookUpName}
              </option>
            ))}
          </select>
          <label className="inputBox__form--label" htmlFor="maritalStatusID1">
            وضعیت تاهل
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="personPhone"
            id="personPhone11"
          />
          <label className="inputBox__form--label" htmlFor="personPhone11">
            تلفن ثابت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            name="personCellPhone"
            required
            id="personCellPhone222"
          />
          <label className="inputBox__form--label" htmlFor="personCellPhone222">
            تلفن همراه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="personArea"
            id="personArea1"
          />
          <label className="inputBox__form--label" htmlFor="personArea1">
            ناحیه سکونت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="personRegion"
            id="personRegion1"
          />
          <label className="inputBox__form--label" htmlFor="personRegion1">
            منطقه سکونت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="personCountry"
            id="personCountry1"
          />
          <label className="inputBox__form--label" htmlFor="personCountry1">
            کشور
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="personState"
            id="personState1"
          />
          <label className="inputBox__form--label" htmlFor="personState1">
            استان
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="personCity"
            id="personCity1"
          />
          <label className="inputBox__form--label" htmlFor="personCity1">
            شهر
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="personPostalCode"
            id="personPostalCode1"
          />
          <label className="inputBox__form--label" htmlFor="personPostalCode1">
            کد پستی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="personSpecialDisease"
            id="personSpecialDisease1"
          />
          <label
            className="inputBox__form--label"
            htmlFor="personSpecialDisease1"
          >
            بیماری خاص
          </label>
        </div>
        <div className="inputBox__form col-span-3">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="personAddress"
            id="personAddress1"
          />
          <label className="inputBox__form--label" htmlFor="personAddress1">
            نشانی
          </label>
        </div>
      </form>

      <div className="Modal__header u-margin-top-sm">
        <h4 className="title-secondary"> اطلاعات وظیفه بگیری </h4>
      </div>

      <form className="grid grid--col-4">
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="selfEmployeeTypeName"
            id="selfEmployeeTypeName"
          />
          <label
            className="inputBox__form--label"
            htmlFor="selfEmployeeTypeName"
          >
            <span>*</span> وضعیت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="vazifeNum"
            id="vazifeNum"
          />
          <label className="inputBox__form--label" htmlFor="vazifeNum">
            شماره وظیفه بگیری
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="sahmeVazife"
            id="sahmeVazife"
          />
          <label className="inputBox__form--label" htmlFor="sahmeVazife">
            سهم وظیفه بگیری
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="marriageRight"
            id="marriageRight"
          />
          <label className="inputBox__form--label" htmlFor="marriageRight">
            حق تاهل
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="childrenRight"
            id="childrenRight"
          />
          <label className="inputBox__form--label" htmlFor="childrenRight">
            حق اولاد
          </label>
        </div>

        <div className="inputBox__form">
          <InputDatePicker
            value={selectedHeirDate}
            onChange={handleHeirDateChange}
            format={"jYYYY-jMM-jDD"}
            onOpenChange={handleHeirOpenChange}
            suffixIcon={<CalenderIcon color="action" />}
            open={isHeirCalenderOpen}
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
          <div className="inputBox__form--readOnly-label">
            تاریخ وظیفه بگیری
          </div>
        </div>

        <div className="inputBox__form">
          <InputDatePicker
            value={selectedStoptopShareDate}
            onChange={handleStoptopShareDateChange}
            format={"jYYYY-jMM-jDD"}
            onOpenChange={handleStoptopShareOpenChange}
            suffixIcon={<CalenderIcon color="action" />}
            open={isStoptopShareCalenderOpen}
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
          <div className="inputBox__form--readOnly-label">تاریخ قطع سهم</div>
        </div>
      </form>

      <div className="Modal__header u-margin-top-sm">
        <h4 className="title-secondary"> اطلاعات بانکی وظیفه بگیر </h4>
      </div>

      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="heirBank"
            id="heirBank"
          />
          <label className="inputBox__form--label" htmlFor="heirBank">
            بانک
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="heirBranch"
            id="heirBranch"
          />
          <label className="inputBox__form--label" htmlFor="heirBranch">
            شعبه
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="heirAccount"
            id="heirAccount"
          />
          <label className="inputBox__form--label" htmlFor="heirAccount">
            حساب
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="varaseRadif"
            id="varaseRadif"
          />
          <label className="inputBox__form--label" htmlFor="varaseRadif">
            ردیف ورثه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="bimeCoef"
            id="bimeCoef"
          />
          <label className="inputBox__form--label" htmlFor="bimeCoef">
            ضریب بیمه
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="tabiiBiome"
            id="tabiiBiome"
          />
          <label className="inputBox__form--label" htmlFor="tabiiBiome">
            بیمه تبعی
          </label>
        </div>
        <div className="inputBox__form col-span-2">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="shahrBank"
            id="shahrBank"
          />
          <label className="inputBox__form--label" htmlFor="shahrBank">
            شماره حساب بانک شهر
          </label>
        </div>

        <div className="inputBox__form col-span-4">
          <textarea
            type="text"
            className="inputBox__form--input"
            required
            name="heirDesc"
            id="heirDesc"
          ></textarea>
          <label className="inputBox__form--label" htmlFor="heirDesc">
            توضیحات
          </label>
        </div>
      </form>
    </section>
  );

  return content;
}

export default CreateHeirForm;
