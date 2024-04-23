// react imports
import { useState, useEffect } from "react";

// reduxt imports
import { useGetLookupDataQuery } from "../slices/sharedApiSlice.js";
import {
  useUpdateRetiredPersonMutation,
  useGetRetiredPersonQuery,
} from "../slices/retiredApiSlice.js";
import { setPersonDeathDate } from "../slices/retiredStateSlice.js";
import { useDispatch } from "react-redux";

// mui imports
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  PersonOutlined as PersonOutlinedIcon,
  CalendarTodayOutlined as CalenderIcon,
  Save as SaveIcon,
  EditOutlined as EditIcon,
} from "@mui/icons-material";

// libary imports
import { toast } from "react-toastify";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";

// helpers
import {
  convertToPersianDate,
  convertToPersianNumber,
  convertToEnglishNumber,
} from "../helper.js";

function RetiredPersonForm({ personID }) {
  const [editable, setEditable] = useState(false);
  const [genderCombo, setGenderCombo] = useState([]);
  const [educationCombo, setEducationCombo] = useState([]);
  const [housingCombo, setHousingCombo] = useState([]);
  const [maritalStatusCombo, setMaritalStatusCombo] = useState([]);
  const [selectedBirthDate, setSelectedBirthDate] = useState(null);
  const [selectedDeathDate, setSelectedDeathDate] = useState(null);
  const [isBirthCalenderOpen, setIsBirthCalenderOpen] = useState(false);
  const [isDeathCalenderOpen, setIsDeathCalenderOpen] = useState(false);
  const [personData, setPersonData] = useState({});

  const dispatch = useDispatch();

  const [updateRetiredPerson, { isLoading: isUpdating }] =
    useUpdateRetiredPersonMutation();

  const {
    data: retiredPersonData,
    isSuccess,
    error,
  } = useGetRetiredPersonQuery(personID);

  // fetch data
  useEffect(() => {
    if (isSuccess) {
      setPersonData(retiredPersonData?.itemList[0]);
      dispatch(
        setPersonDeathDate(retiredPersonData?.itemList[0]?.personDeathDate)
      );
    }
  }, [isSuccess, retiredPersonData, dispatch]);

  // handle error
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  // lookup data
  const { data: genderComboItems, isSuccess: isGenderComboSuccess } =
    useGetLookupDataQuery({
      lookUpType: "Gender",
    });

  const { data: educationComboItems, isSuccess: isEducationComboSuccess } =
    useGetLookupDataQuery({
      lookUpType: "EducationType",
    });

  const { data: housingComboItems, isSuccess: isHousingComboSuccess } =
    useGetLookupDataQuery({
      lookUpType: "HousingType",
    });

  const { data: maritalStatusComboItems, isSuccess: isMatritalComboSuccess } =
    useGetLookupDataQuery({
      lookUpType: "MaritialStatus",
    });

  // handle dates
  useEffect(() => {
    setSelectedBirthDate(convertToPersianDate(personData?.personBirthDate));
  }, [personData?.personBirthDate]);

  useEffect(() => {
    setSelectedDeathDate(convertToPersianDate(personData?.personDeathDate));
  }, [personData?.personDeathDate]);

  useEffect(() => {
    if (selectedBirthDate) {
      setPersonData({
        ...personData,
        personBirthDate: selectedBirthDate.toISOString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBirthDate, dispatch]);

  useEffect(() => {
    if (selectedDeathDate) {
      setPersonData({
        ...personData,
        personDeathDate: selectedDeathDate.toISOString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDeathDate, dispatch]);

  // fetch combo data
  useEffect(() => {
    if (isGenderComboSuccess) {
      setGenderCombo(genderComboItems.itemList);
    }
  }, [isGenderComboSuccess, genderComboItems]);

  useEffect(() => {
    if (isEducationComboSuccess) {
      setEducationCombo(educationComboItems.itemList);
    }
  }, [isEducationComboSuccess, educationComboItems]);

  useEffect(() => {
    if (isHousingComboSuccess) {
      setHousingCombo(housingComboItems.itemList);
    }
  }, [isHousingComboSuccess, housingComboItems]);

  useEffect(() => {
    if (isMatritalComboSuccess) {
      setMaritalStatusCombo(maritalStatusComboItems.itemList);
    }
  }, [isMatritalComboSuccess, maritalStatusComboItems]);

  // other handlers
  const handleEditable = () => {
    setEditable(true);
  };

  const handleBirthDateChange = (date) => {
    setSelectedBirthDate(date);
    setIsBirthCalenderOpen(false);
  };

  const handleDeathDateChange = (date) => {
    setSelectedDeathDate(date);
    setIsDeathCalenderOpen(false);
  };

  const handleBirthOpenChange = (open) => {
    setIsBirthCalenderOpen(open);
  };

  const handleDeathOpenChange = (open) => {
    setIsDeathCalenderOpen(open);
  };

  // checkbox handler
  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setPersonData({
      ...personData,
      [name]: checked,
    });
  };

  // handle data change
  const handlePersonDataChange = (e) => {
    const { name, value } = e.target;
    setPersonData({
      ...personData,
      [name]: value,
    });
  };

  // handle update retired person
  const handleUpdateRetired = async () => {
    try {
      const updateRes = await updateRetiredPerson({
        ...personData,
        personNationalCode: convertToEnglishNumber(
          personData.personNationalCode
        ),
        personCertificatetNo: convertToEnglishNumber(
          personData.personCertificatetNo
        ),
        personPhone: convertToEnglishNumber(personData.personPhone),
        personCellPhone: convertToEnglishNumber(personData.personCellPhone),
        personCellPhone2: convertToEnglishNumber(personData.personCellPhone2),
        personRegion: parseInt(convertToEnglishNumber(personData.personRegion)),
        personArea: parseInt(convertToEnglishNumber(personData.personArea)),
        personPostalCode: convertToEnglishNumber(personData.personPostalCode),
      }).unwrap();
      toast.success(updateRes.message, {
        autoClose: 2000,
      });
      setEditable(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
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
                disabled={!editable}
                type="text"
                name="personFirstName"
                id="personFirstName"
                className="inputBox__form--input"
                value={personData?.personFirstName || ""}
                onChange={handlePersonDataChange}
                required
              />
              <label
                htmlFor="personFirstName"
                className="inputBox__form--label"
              >
                <span>*</span> نام
              </label>
            </div>
            <div className="inputBox__form">
              <input
                disabled={!editable}
                type="text"
                name="personLastName"
                id="personLastName"
                className="inputBox__form--input"
                value={personData?.personLastName || ""}
                onChange={handlePersonDataChange}
                required
              />
              <label htmlFor="personLastName" className="inputBox__form--label">
                <span>*</span> نام خانوادگی
              </label>
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            name="personNationalCode"
            id="personNationalCode"
            className="inputBox__form--input"
            value={convertToPersianNumber(personData?.personNationalCode) ?? ""}
            onChange={handlePersonDataChange}
            required
          />
          <label htmlFor="personNationalCode" className="inputBox__form--label">
            <span>*</span> کد ملی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            name="personCertificatetNo"
            id="personCertificatetNo"
            className="inputBox__form--input"
            value={
              convertToPersianNumber(personData?.personCertificatetNo) ?? ""
            }
            onChange={handlePersonDataChange}
            required
          />
          <label
            htmlFor="personCertificatetNo"
            className="inputBox__form--label"
          >
            <span>*</span> شماره شناسنامه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="personFatherName"
            name="personFatherName"
            className="inputBox__form--input"
            value={personData?.personFatherName || ""}
            onChange={handlePersonDataChange}
            required
          />
          <label htmlFor="personFatherName" className="inputBox__form--label">
            نام پدر
          </label>
        </div>

        <div className="inputBox__form">
          <select
            disabled={!editable}
            type="text"
            name="genderID"
            id="genderID"
            className="inputBox__form--input"
            value={personData?.genderID || "2"}
            onChange={handlePersonDataChange}
            required
          >
            <option value="0">انتخاب</option>
            {genderCombo.map((gender) => (
              <option key={gender.lookUpID} value={gender.lookUpID}>
                {gender.lookUpName}
              </option>
            ))}
          </select>
          <label htmlFor="genderID" className="inputBox__form--label">
            <span>*</span> جنسیت
          </label>
        </div>

        <div className="inputBox__form">
          <InputDatePicker
            disabled={!editable}
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
            disabled={!editable}
            type="text"
            name="personBirthPlace"
            id="personBirthPlace"
            className="inputBox__form--input"
            value={personData?.personBirthPlace || ""}
            onChange={handlePersonDataChange}
            required
          />
          <label htmlFor="personBirthPlace" className="inputBox__form--label">
            <span>*</span> محل تولد
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="personPreviousName"
            name="personPreviousName"
            className="inputBox__form--input"
            value={personData?.personPreviousName || ""}
            onChange={handlePersonDataChange}
            required
          />
          <label htmlFor="personPreviousName" className="inputBox__form--label">
            نام و نام خانوادگی قبلی
          </label>
        </div>

        <div className="checkboxContainer col-span-3">
          <p
            className={
              !editable
                ? "checkboxContainer__title--disabled"
                : "checkboxContainer__title"
            }
          >
            وضعیت ایثارگری:
          </p>

          <div className="checkboxContainer__item">
            <input
              disabled={!editable}
              type="checkbox"
              id="personIsSacrificedFamily"
              name="personIsSacrificedFamily"
              checked={!!personData?.personIsSacrificedFamily}
              onChange={handleCheckBoxChange}
            />
            <label
              htmlFor="personIsSacrificedFamily"
              className={
                !editable
                  ? "checkboxContainer__label--disabled"
                  : "checkboxContainer__label"
              }
            >
              {" "}
              خانواده شهید
            </label>
          </div>

          <div className="checkboxContainer__item">
            <input
              disabled={!editable}
              type="checkbox"
              id="personIsWarrior"
              name="personIsWarrior"
              checked={!!personData?.personIsWarrior}
              onChange={handleCheckBoxChange}
            />
            <label
              htmlFor="personIsWarrior"
              className={
                !editable
                  ? "checkboxContainer__label--disabled"
                  : "checkboxContainer__label"
              }
            >
              رزمنده
            </label>
          </div>

          <div className="checkboxContainer__item">
            <input
              disabled={!editable}
              type="checkbox"
              id="personIsChildOfSacrificed"
              name="personIsChildOfSacrificed"
              checked={!!personData?.personIsChildOfSacrificed}
              onChange={handleCheckBoxChange}
            />
            <label
              htmlFor="personIsChildOfSacrificed"
              className={
                !editable
                  ? "checkboxContainer__label--disabled"
                  : "checkboxContainer__label"
              }
            >
              فرزند شهید
            </label>
          </div>

          <div className="checkboxContainer__item">
            <input
              disabled={!editable}
              type="checkbox"
              id="personIsValiant"
              name="personIsValiant"
              checked={!!personData?.personIsValiant}
              onChange={handleCheckBoxChange}
            />
            <label
              htmlFor="personIsValiant"
              className={
                !editable
                  ? "checkboxContainer__label--disabled"
                  : "checkboxContainer__label"
              }
            >
              جانباز
            </label>
          </div>

          <div className="checkboxContainer__item">
            <input
              disabled={!editable}
              type="checkbox"
              id="personIsSacrificed"
              name="personIsSacrificed"
              checked={!!personData?.personIsSacrificed}
              onChange={handleCheckBoxChange}
            />
            <label
              htmlFor="personIsSacrificed"
              className={
                !editable
                  ? "checkboxContainer__label--disabled"
                  : "checkboxContainer__label"
              }
            >
              شهید
            </label>
          </div>

          <div className="checkboxContainer__item">
            <input
              disabled={!editable}
              type="checkbox"
              id="personIsCaptive"
              name="personIsCaptive"
              checked={!!personData?.personIsCaptive}
              onChange={handleCheckBoxChange}
            />
            <label
              htmlFor="personIsCaptive"
              className={
                !editable
                  ? "checkboxContainer__label--disabled"
                  : "checkboxContainer__label"
              }
            >
              آزاده
            </label>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">
              شماره بازنشستگی
            </div>
            <div className="inputBox__form--readOnly-content">
              {convertToPersianNumber(personData?.retiredID) || ""}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="personPhone"
            name="personPhone"
            className="inputBox__form--input"
            value={convertToPersianNumber(personData?.personPhone) ?? ""}
            onChange={handlePersonDataChange}
            required
          />
          <label htmlFor="personPhone" className="inputBox__form--label">
            تلفن ثابت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="personCellPhone"
            name="personCellPhone"
            className="inputBox__form--input"
            value={convertToPersianNumber(personData?.personCellPhone) ?? ""}
            onChange={handlePersonDataChange}
            required
          />
          <label htmlFor="personCellPhone" className="inputBox__form--label">
            تلفن همراه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="backupNum"
            name="personCellPhone2"
            className="inputBox__form--input"
            value={convertToPersianNumber(personData?.personCellPhone2) ?? ""}
            onChange={handlePersonDataChange}
            required
          />
          <label htmlFor="backupNum" className="inputBox__form--label">
            تلفن پشتیبان
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="backupName"
            value={personData?.backupFirstName || ""}
            name="backupFirstName"
            className="inputBox__form--input"
            onChange={handlePersonDataChange}
            required
          />
          <label htmlFor="backupName" className="inputBox__form--label">
            نام پشتیبان
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="backupLname"
            value={personData?.backupLastName || ""}
            name="backupLastName"
            className="inputBox__form--input"
            onChange={handlePersonDataChange}
            required
          />
          <label htmlFor="backupLname" className="inputBox__form--label">
            نام خانوادگی پشتیبان
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="personEmail"
            value={personData?.personEmail || ""}
            name="personEmail"
            className="inputBox__form--input"
            onChange={handlePersonDataChange}
            required
          />
          <label htmlFor="personEmail" className="inputBox__form--label">
            پست الکترونیک
          </label>
        </div>

        <div className="inputBox__form">
          <select
            disabled={!editable}
            type="text"
            id="educationTypeID"
            value={personData?.educationTypeID || ""}
            name="educationTypeID"
            className="inputBox__form--input field"
            onChange={handlePersonDataChange}
            required
          >
            <option value="0">انتخاب کنید</option>
            {educationCombo.map((edu) => (
              <option key={edu.lookUpID} value={edu.lookUpID}>
                {edu.lookUpName}
              </option>
            ))}
          </select>
          <label htmlFor="educationTypeID" className="inputBox__form--label">
            <span>*</span> مدرک تحصیلی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="personCountry"
            value={personData?.personCountry || ""}
            name="personCountry"
            className="inputBox__form--input field"
            onChange={handlePersonDataChange}
            required
          />
          <label htmlFor="personCountry" className="inputBox__form--label">
            <span>*</span> کشور
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="personState"
            value={personData?.personState || ""}
            name="personState"
            className="inputBox__form--input"
            onChange={handlePersonDataChange}
            required
          />
          <label htmlFor="personState" className="inputBox__form--label">
            استان
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="personCity"
            value={personData?.personCity || ""}
            name="personCity"
            className="inputBox__form--input"
            onChange={handlePersonDataChange}
            required
          />
          <label htmlFor="personCity" className="inputBox__form--label">
            شهر
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="personRegion"
            value={convertToPersianNumber(personData?.personRegion) ?? ""}
            name="personRegion"
            className="inputBox__form--input"
            onChange={handlePersonDataChange}
            required
          />
          <label htmlFor="personRegion" className="inputBox__form--label">
            <span>*</span> منطقه سکونت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="personArea"
            value={convertToPersianNumber(personData?.personArea) ?? ""}
            name="personArea"
            className="inputBox__form--input"
            onChange={handlePersonDataChange}
            required
          />
          <label htmlFor="personArea" className="inputBox__form--label">
            ناحیه سکونت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="personPostalCode"
            value={convertToPersianNumber(personData?.personPostalCode) ?? ""}
            name="personPostalCode"
            className="inputBox__form--input"
            onChange={handlePersonDataChange}
            required
          />
          <label htmlFor="personPostalCode" className="inputBox__form--label">
            کد پستی
          </label>
        </div>

        <div className="inputBox__form">
          <select
            disabled={!editable}
            type="text"
            id="housingTypeID"
            value={personData?.housingTypeID || ""}
            name="housingTypeID"
            className="inputBox__form--input"
            onChange={handlePersonDataChange}
            required
          >
            <option value="0">انتخاب</option>
            {housingCombo.map((house) => (
              <option key={house.lookUpID} value={house.lookUpID}>
                {house.lookUpName}
              </option>
            ))}
          </select>
          <label htmlFor="housingTypeID" className="inputBox__form--label">
            وضعیت مسکن
          </label>
        </div>

        <div className="inputBox__form">
          <select
            disabled={!editable}
            type="text"
            name="maritalStatusID"
            id="maritalStatusID"
            className="inputBox__form--input"
            value={personData?.maritalStatusID || "0"}
            onChange={handlePersonDataChange}
            required
          >
            <option value="0">انتخاب</option>
            {maritalStatusCombo.map((item) => (
              <option key={item.lookUpID} value={item.lookUpID}>
                {item.lookUpName}
              </option>
            ))}
          </select>
          <label htmlFor="maritalStatusID" className="inputBox__form--label">
            وضعیت تاهل
          </label>
        </div>

        <div className="inputBox__form">
          <InputDatePicker
            disabled={!editable}
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
            disabled={!editable}
            type="text"
            id="personAddress"
            value={personData?.personAddress || ""}
            name="personAddress"
            className="inputBox__form--input"
            onChange={handlePersonDataChange}
            required
          ></textarea>
          <label htmlFor="personAddress" className="inputBox__form--label">
            نشانی
          </label>
        </div>

        <div className="inputBox__form row-col-span-3">
          <textarea
            disabled={!editable}
            type="text"
            id="personDescription"
            value={personData?.personDescription || ""}
            name="personDescription"
            className="inputBox__form--input"
            onChange={handlePersonDataChange}
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
          loading={isUpdating}
          onClick={handleUpdateRetired}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ذخیره</span>
        </LoadingButton>

        <Button
          dir="ltr"
          endIcon={<EditIcon />}
          onClick={handleEditable}
          disabled={editable}
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

export default RetiredPersonForm;
