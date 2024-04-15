// react imports
import { useEffect, useState } from "react";

// redux imports
import { useSelector } from "react-redux";
import { useInsertRelatedMutation } from "../slices/relatedApiSlice";
import { useGetLookupDataQuery } from "../slices/sharedApiSlice.js";

// mui imports
import { LoadingButton } from "@mui/lab";
import {
  Save as SaveIcon,
  CalendarTodayOutlined as CalenderIcon,
} from "@mui/icons-material";

// helpers
import { convertToPersianNumber, convertToEnglishNumber } from "../helper.js";

// libary imports
import { toast } from "react-toastify";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";

function CreateRelatedForm() {
  const { pensionaryID, personID } = useSelector((state) => state.retiredState);

  const [relationCombo, setRelationCombo] = useState([]);
  const [maritialStatusCombo, setMaritialStatusCombo] = useState([]);
  const [educationCombo, setEducationCombo] = useState([]);
  const [universityCombo, setUniversityCombo] = useState([]);

  const [selectedBirthDate, setSelectedBirthDate] = useState(null);
  const [isBirthCalenderOpen, setIsBirthCalenderOpen] = useState(false);
  const [relatedObject, setRelatedObject] = useState({
    personID: "string",
    personNationalCode: "",
    personFirstName: "",
    personLastName: "",
    personFatherName: "",
    personPreviousName: "string",
    personCertificatetNo: "",
    personDeathDate: null,
    personEmail: "string",
    personBirthDate: null,
    personBirthPlace: "",
    personCountry: "",
    personState: "",
    personCity: "",
    personAddress: "",
    personPostalCode: "",
    personRegion: "",
    personArea: "",
    personPhone: "",
    personCellPhone: "",
    personCellPhone2: "",
    backupFirstName: "string",
    backupLastName: "string",
    genderID: "string",
    maritalStatusID: "string",
    educationTypeID: "string",
    universityID: "string",
    housingTypeID: "string",
    personSpecialDisease: "",
    personDescription: "",
    parentPersonID: "string",
    pensionaryStatusID: "string",
    pensionaryStartDate: null,
    pensionaryFinishDate: null,
    pensionaryIsUnderGaurantee: true,
    pensionaryIsActive: " ",
    relationshipWithParentID: "",
    employmentTypeID: "string",
    relatedID: 0,
  });
  const [insertRelated, { isLoading }] = useInsertRelatedMutation();

  const { token } = useSelector((state) => state.auth);

  const { data: relationComboItems, isSuccess: isRelationComboSuccess } =
    useGetLookupDataQuery({ token, lookUpType: "RelationshipType" });

  const { data: maritialStatusComboItems, isSuccess: isMaritialComboSuccess } =
    useGetLookupDataQuery({ token, lookUpType: "MaritialStatus" });

  const { data: educationComboItems, isSuccess: isEducationComboSuccess } =
    useGetLookupDataQuery({ token, lookUpType: "EducationType" });

  const { data: universityComboItems, isSuccess: isUniversityComboSuccess } =
    useGetLookupDataQuery({ token, lookUpType: "UniversityType" });

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

  useEffect(() => {
    if (isEducationComboSuccess) {
      setEducationCombo(educationComboItems.itemList);
    }
  }, [isEducationComboSuccess, educationComboItems]);

  useEffect(() => {
    if (isUniversityComboSuccess) {
      setUniversityCombo(universityComboItems.itemList);
    }
  }, [isUniversityComboSuccess, universityComboItems]);

  const handleBirthDateChange = (date) => {
    setSelectedBirthDate(date);
    setIsBirthCalenderOpen(false);
  };

  const handleBirthOpenChange = (open) => {
    setIsBirthCalenderOpen(open);
  };

  useEffect(() => {
    if (selectedBirthDate) {
      setRelatedObject({
        ...relatedObject,
        personID,
        pensionaryID,
        personBirthhDate: selectedBirthDate.toISOString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBirthDate]);

  const handleRealtedObjectChange = (e) => {
    const { name, value } = e.target;
    setRelatedObject({
      ...relatedObject,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(relatedObject);
  }, [relatedObject]);

  const handleInsertRelated = async () => {
    try {
      const insertRes = await insertRelated({
        token,
        data: {
          ...relatedObject,
        },
      });
      console.log(insertRes);
      toast.success(insertRes.data.message, {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  return (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form">
          <select
            type="text"
            className="inputBox__form--input"
            required
            name="relationshipWithParentID"
            onChange={handleRealtedObjectChange}
            id="relationshipWithParentID"
          >
            <option value=" ">انتخاب نسبت</option>
            {relationCombo.map((relation) => (
              <option key={relation.lookUpID} value={relation.lookUpID}>
                {relation.lookUpName}
              </option>
            ))}
          </select>
          <label
            className="inputBox__form--label"
            htmlFor="relationshipWithParentID"
          >
            نسبت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleRealtedObjectChange}
            value={relatedObject.personFirstName}
            name="personFirstName"
            required
            id="personFirstName1"
          />
          <label className="inputBox__form--label" htmlFor="personFirstName1">
            نام
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleRealtedObjectChange}
            value={relatedObject.personLastName}
            name="personLastName"
            required
            id="personLastName1"
          />
          <label className="inputBox__form--label" htmlFor="personLastName1">
            نام خانوادگی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleRealtedObjectChange}
            value={convertToPersianNumber(relatedObject.personNationalCode)}
            name="personNationalCode"
            required
            id="personNationalCode2"
          />
          <label
            className="inputBox__form--label"
            htmlFor="personNationalCode2"
          >
            کد ملی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            onChange={handleRealtedObjectChange}
            value={convertToPersianNumber(relatedObject.personCertificatetNo)}
            name="personCertificatetNo"
            id="personCertificatetNo2"
          />
          <label
            className="inputBox__form--label"
            htmlFor="personCertificatetNo2"
          >
            شماره شناسنامه
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            onChange={handleRealtedObjectChange}
            value={relatedObject.personFatherName}
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
            onChange={handleRealtedObjectChange}
            value={relatedObject.personBirthPlace}
            name="personBirthPlace"
            id="personBirthPlace1"
          />
          <label className="inputBox__form--label" htmlFor="personBirthPlace1">
            محل تولد
          </label>
        </div>

        <div className="inputBox__form">
          <select
            type="text"
            className="inputBox__form--input"
            onChange={handleRealtedObjectChange}
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
          <select
            type="text"
            className="inputBox__form--input"
            onChange={handleRealtedObjectChange}
            name="educationTypeID"
            required
            id="educationTypeID1"
          >
            <option value=" ">انتخاب کنید</option>
            {educationCombo.map((educationType) => (
              <option
                key={educationType.lookUpID}
                value={educationType.lookUpID}
              >
                {educationType.lookUpName}
              </option>
            ))}
          </select>
          <label className="inputBox__form--label" htmlFor="educationTypeID1">
            مدرک تحصیلی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="studyLevel"
          />
          <label className="inputBox__form--label" htmlFor="studyLevel">
            مقطع تحصیلی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="degreeTitle"
          />
          <label className="inputBox__form--label" htmlFor="degreeTitle">
            عنوان مدرک
          </label>
        </div>

        <div className="inputBox__form">
          <select
            type="text"
            className="inputBox__form--input"
            onChange={handleRealtedObjectChange}
            name="universityID"
            required
            id="universityID1"
          >
            <option value=" ">انتخاب کنید</option>
            {universityCombo.map((uni) => (
              <option key={uni.lookUpID} value={uni.lookUpID}>
                {uni.lookUpName}
              </option>
            ))}
          </select>
          <label className="inputBox__form--label" htmlFor="universityID1">
            دانشگاه
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="uniUnit"
          />
          <label className="inputBox__form--label" htmlFor="uniUnit">
            واحد دانشگاهی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="cutDate"
          />
          <label className="inputBox__form--label" htmlFor="cutDate">
            تاریخ قطع
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleRealtedObjectChange}
            name="personCellPhone"
            value={convertToPersianNumber(relatedObject.personCellPhone)}
            required
            id="personCellPhone1"
          />
          <label className="inputBox__form--label" htmlFor="personCellPhone1">
            تلفن همراه ۱
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleRealtedObjectChange}
            name="personCellPhone2"
            value={convertToPersianNumber(relatedObject.personCellPhone2)}
            required
            id="personCellPhone22"
          />
          <label className="inputBox__form--label" htmlFor="personCellPhone22">
            تلفن همراه ۲
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            onChange={handleRealtedObjectChange}
            name="personPhone"
            value={convertToPersianNumber(relatedObject.personPhone)}
            id="personPhone1"
          />
          <label className="inputBox__form--label" htmlFor="personPhone1">
            تلفن ثابت ۱
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="sabetTell2"
          />
          <label className="inputBox__form--label" htmlFor="saetTell2">
            تلفن ثابت ۲
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            onChange={handleRealtedObjectChange}
            name="personRegion"
            value={convertToPersianNumber(relatedObject.personRegion)}
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
            onChange={handleRealtedObjectChange}
            name="personArea"
            value={convertToPersianNumber(relatedObject.personArea)}
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
            onChange={handleRealtedObjectChange}
            name="personCountry"
            value={relatedObject.personCountry}
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
            onChange={handleRealtedObjectChange}
            name="personState"
            value={relatedObject.personState}
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
            onChange={handleRealtedObjectChange}
            name="personCity"
            value={relatedObject.personCity}
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
            onChange={handleRealtedObjectChange}
            name="personPostalCode"
            value={convertToPersianNumber(relatedObject.personPostalCode)}
            id="personPostalCode1"
          />
          <label className="inputBox__form--label" htmlFor="personPostalCode1">
            کد پستی
          </label>
        </div>

        <div className="inputBox__form col-span-3">
          <input
            type="text"
            className="inputBox__form--input"
            required
            onChange={handleRealtedObjectChange}
            name="personAddress"
            value={relatedObject.personAddress}
            id="personAddress1"
          />
          <label className="inputBox__form--label" htmlFor="personAddress1">
            نشانی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            onChange={handleRealtedObjectChange}
            name="personSpecialDisease"
            value={relatedObject.personSpecialDisease}
            id="personSpecialDisease1"
          />
          <label
            className="inputBox__form--label"
            htmlFor="personSpecialDisease1"
          >
            بیماری خاص
          </label>
        </div>

        <div className="inputBox__form col-span-3 row-span-2">
          <textarea
            type="text"
            className="inputBox__form--input"
            required
            onChange={handleRealtedObjectChange}
            name="personDescription"
            value={relatedObject.personDescription}
            id="personDescription1"
          ></textarea>
          <label className="inputBox__form--label" htmlFor="personDescription1">
            توضیحات
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="aghdDate"
          />
          <label className="inputBox__form--label" htmlFor="aghdDate">
            تاریخ عقد
          </label>
        </div>
      </form>

      <div className="Modal__header u-margin-top-sm">
        <h4 className="title-secondary"> اطلاعات خویش فرمایی</h4>
      </div>

      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form col-span-2">
          <select
            type="text"
            className="inputBox__form--input"
            required
            onChange={handleRealtedObjectChange}
            name="pensionaryIsActive"
            value={relatedObject.pensionaryIsActive}
            id="pensionaryIsActive1"
          >
            <option value=" ">انتخاب کنید</option>
            <option value="true">فعال</option>
            <option value="false">غیر فعال</option>
          </select>
          <label
            className="inputBox__form--label"
            htmlFor="pensionaryIsActive1"
          >
            وضعیت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="startDate"
          />
          <label className="inputBox__form--label" htmlFor="startDate">
            تاریخ شروع
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="endDate"
          />
          <label className="inputBox__form--label" htmlFor="endDate">
            تاریخ پایان
          </label>
        </div>
      </form>

      <div className="Modal__header u-margin-top-sm">
        <h4 className="title-secondary">اطلاعات پشتیبان</h4>
      </div>

      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="backupName"
          />
          <label className="inputBox__form--label" htmlFor="backupName">
            نام
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="BackupSurname"
          />
          <label className="inputBox__form--label" htmlFor="BackupSurname">
            نام خانوادگی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="BackupRelation"
          />
          <label className="inputBox__form--label" htmlFor="BackupRelation">
            نسبت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="BackupPhone"
          />
          <label className="inputBox__form--label" htmlFor="BackupPhone">
            تلفن ثابت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="BackupCellPhone"
          />
          <label className="inputBox__form--label" htmlFor="BackupCellPhone">
            تلفن همراه
          </label>
        </div>

        <div className="inputBox__form col-span-3">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="BackupAddress"
          />
          <label className="inputBox__form--label" htmlFor="BackupAddress">
            نشانی
          </label>
        </div>
      </form>

      <div style={{ marginRight: "auto" }}>
        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          onClick={handleInsertRelated}
          loading={isLoading}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ذخیره</span>
        </LoadingButton>
      </div>
    </section>
  );
}

export default CreateRelatedForm;
