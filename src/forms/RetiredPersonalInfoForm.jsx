// react imports
import { useState, useEffect } from "react";

// reduxt imports
import { useGetLookupDataQuery } from "../slices/sharedApiSlice.js";
import { useUpdateRetiredMutation } from "../slices/retiredApiSlice.js";
import { setPersonObject } from "../slices/retiredStateSlice.js";
import { useSelector, useDispatch } from "react-redux";

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
import {
  convertToPersianDate,
  convertToPersianNumber,
  convertToEnglishNumber,
} from "../helper.js";

// libary imports
import { toast } from "react-toastify";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";

function RetiredPersonalInfoForm() {
  const [editable, setEditable] = useState(false);
  const [genderCombo, setGenderCombo] = useState([]);
  const [educationCombo, setEducationCombo] = useState([]);
  const [housingCombo, setHousingCombo] = useState([]);
  const [maritalStatusCombo, setMaritalStatusCombo] = useState([]);
  const [selectedBirthDate, setSelectedBirthDate] = useState(null);
  const [selectedDeathDate, setSelectedDeathDate] = useState(null);
  const [isBirthCalenderOpen, setIsBirthCalenderOpen] = useState(false);
  const [isDeathCalenderOpen, setIsDeathCalenderOpen] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const { personObject } = useSelector((state) => state.retiredState);

  const dispatch = useDispatch();

  const [updateRetired, { isLoading: isUpdating }] = useUpdateRetiredMutation();

  const { data: genderComboItems, isSuccess: isGenderComboSuccess } =
    useGetLookupDataQuery({
      token,
      lookUpType: "Gender",
    });

  const { data: educationComboItems, isSuccess: isEducationComboSuccess } =
    useGetLookupDataQuery({
      token,
      lookUpType: "EducationType",
    });

  const { data: housingComboItems, isSuccess: isHousingComboSuccess } =
    useGetLookupDataQuery({
      token,
      lookUpType: "HousingType",
    });

  const { data: maritalStatusComboItems, isSuccess: isMatritalComboSuccess } =
    useGetLookupDataQuery({
      token,
      lookUpType: "MaritialStatus",
    });

  useEffect(() => {
    setSelectedBirthDate(convertToPersianDate(personObject.personBirthDate));
  }, [personObject.personBirthDate]);

  useEffect(() => {
    setSelectedDeathDate(convertToPersianDate(personObject.personDeathDate));
  }, [personObject.personDeathDate]);

  useEffect(() => {
    if (selectedBirthDate) {
      dispatch(
        setPersonObject({
          ...personObject,
          personBirthDate: selectedBirthDate.toISOString(),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBirthDate]);

  useEffect(() => {
    if (selectedDeathDate) {
      dispatch(
        setPersonObject({
          ...personObject,
          personDeathDate: selectedDeathDate.toISOString(),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDeathDate]);

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

  const handlePersonObjectChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setPersonObject({
        ...personObject,
        [name]: value,
      })
    );
  };

  const handleUpdateRetired = async () => {
    try {
      const updateRes = await updateRetired({
        token,
        data: {
          ...personObject,
          personNationalCode: convertToEnglishNumber(
            personObject.personNationalCode
          ),
          personCertificatetNo: convertToEnglishNumber(
            personObject.personCertificatetNo
          ),
          personPhone: convertToEnglishNumber(personObject.personPhone),
        },
        personCellPhone: convertToEnglishNumber(personObject.personCellPhone),
        personCellPhone2: convertToEnglishNumber(personObject.personCellPhone2),
        personRegion: parseInt(
          convertToEnglishNumber(personObject.personRegion)
        ),
        personArea: parseInt(convertToEnglishNumber(personObject.personArea)),
        personPostalCode: convertToEnglishNumber(personObject.personPostalCode),
      });
      console.log(updateRes);
      toast.success(updateRes.message, {
        autoClose: 2000,
      });
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
                value={personObject?.personFirstName || ""}
                onChange={handlePersonObjectChange}
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
                value={personObject?.personLastName || ""}
                onChange={handlePersonObjectChange}
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
            value={
              convertToPersianNumber(personObject?.personNationalCode) ?? ""
            }
            onChange={handlePersonObjectChange}
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
              convertToPersianNumber(personObject?.personCertificatetNo) ?? ""
            }
            onChange={handlePersonObjectChange}
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
            value={personObject?.personFatherName || ""}
            onChange={handlePersonObjectChange}
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
            value={personObject?.genderID || "2"}
            onChange={handlePersonObjectChange}
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
            value={personObject?.personBirthPlace || ""}
            onChange={handlePersonObjectChange}
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
            value={personObject?.personPreviousName || ""}
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="personPreviousName" className="inputBox__form--label">
            نام و نام خانوادگی قبلی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="retireNum"
            name="pensionaryId"
            className="inputBox__form--input"
            value={personObject?.pensionaryID || ""}
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="retireNum" className="inputBox__form--label">
            شماره بازنشستگی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="personPhone"
            name="personPhone"
            className="inputBox__form--input"
            value={convertToPersianNumber(personObject?.personPhone) ?? ""}
            onChange={handlePersonObjectChange}
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
            value={convertToPersianNumber(personObject?.personCellPhone) ?? ""}
            onChange={handlePersonObjectChange}
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
            value={convertToPersianNumber(personObject?.personCellPhone2) ?? ""}
            onChange={handlePersonObjectChange}
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
            disabled={!editable}
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
            disabled={!editable}
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
          <select
            disabled={!editable}
            type="text"
            id="educationTypeID"
            value={personObject?.educationTypeID || ""}
            name="educationTypeID"
            className="inputBox__form--input field"
            onChange={handlePersonObjectChange}
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
            disabled={!editable}
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
            disabled={!editable}
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
            disabled={!editable}
            type="text"
            id="personRegion"
            value={convertToPersianNumber(personObject?.personRegion) ?? ""}
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
            disabled={!editable}
            type="text"
            id="personArea"
            value={convertToPersianNumber(personObject?.personArea) ?? ""}
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
            disabled={!editable}
            type="text"
            id="personPostalCode"
            value={convertToPersianNumber(personObject?.personPostalCode) ?? ""}
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
          <select
            disabled={!editable}
            type="text"
            id="housingTypeID"
            value={personObject?.housingTypeID || ""}
            name="housingTypeID"
            className="inputBox__form--input"
            onChange={handlePersonObjectChange}
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
            value={personObject?.maritalStatusID || "0"}
            onChange={handlePersonObjectChange}
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
            disabled={!editable}
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

export default RetiredPersonalInfoForm;
