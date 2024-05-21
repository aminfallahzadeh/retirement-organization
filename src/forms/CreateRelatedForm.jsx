// react imports
import { useEffect, useState } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useInsertRelatedMutation } from "../slices/relatedApiSlice";
import {
  useGetLookupDataQuery,
  useGetRelationshipQuery,
  useGetPensionaryStatusQuery,
} from "../slices/sharedApiSlice.js";

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

function CreateRelatedForm({ setShowCreateRelatedModal }) {
  // LOOKUP STATES
  const [relationCombo, setRelationCombo] = useState([]);
  const [maritialStatusCombo, setMaritialStatusCombo] = useState([]);
  const [educationCombo, setEducationCombo] = useState([]);
  const [universityCombo, setUniversityCombo] = useState([]);
  const [pensionaryStatusCombo, setPensionaryStatusCombo] = useState([]);
  const [countryCombo, setCountryCombo] = useState([]);
  const [stateCombo, setStateCombo] = useState([]);
  const [cityCombo, setCityCombo] = useState([]);

  // DATE STATES
  const [selectedBirthDate, setSelectedBirthDate] = useState(null);
  const [selectedMritialDate, setSelectedMritialDate] = useState(null);
  const [selectedSelfEmployeeStartDate, setSelectedSelfEmployeeStartDate] =
    useState(null);
  const [selectedSelfEmployeeEndDate, setSelectedSelfEmployeeEndDate] =
    useState(null);
  const [isBirthCalenderOpen, setIsBirthCalenderOpen] = useState(false);
  const [isMritialCalenderOpen, setIsMritialCalenderOpen] = useState(false);
  const [isSelfEmployeeStartCalenderOpen, setIsSelfEmployeeStartCalenderOpen] =
    useState(false);
  const [isSelfEmployeeEndCalenderOpen, setIsSelfEmployeeEndCalenderOpen] =
    useState(false);

  // MAIN STATE
  const [relatedObject, setRelatedObject] = useState({});

  const [insertRelated, { isLoading }] = useInsertRelatedMutation();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const parentPersonID = searchParams.get("personID");

  // GET LOOKUP DATA
  const { data: relationComboItems, isSuccess: isRelationComboSuccess } =
    useGetRelationshipQuery();

  const { data: maritialStatusComboItems, isSuccess: isMaritialComboSuccess } =
    useGetLookupDataQuery({ lookUpType: "MaritialStatus" });

  const { data: educationComboItems, isSuccess: isEducationComboSuccess } =
    useGetLookupDataQuery({ lookUpType: "EducationType" });

  const { data: universityComboItems, isSuccess: isUniversityComboSuccess } =
    useGetLookupDataQuery({ lookUpType: "UniversityType" });

  const { data: countryComboItems, isSuccess: isCountryComboSuccess } =
    useGetLookupDataQuery({ lookUpType: "Country" });

  const { data: cityComboItems, isSuccess: isCityComboSuccess } =
    useGetLookupDataQuery({
      lookUpType: "City",
    });

  const { data: stateComboItems, isSuccess: isStateComboSuccess } =
    useGetLookupDataQuery({
      lookUpType: "State",
    });

  const {
    data: pensionaryStatusComboItems,
    isSuccess: isPensionaryStatusComboSuccess,
  } = useGetPensionaryStatusQuery({ pensionaryStatusCategory: "L" });

  // FETCH LOOKUP DATA
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

  useEffect(() => {
    if (isPensionaryStatusComboSuccess) {
      setPensionaryStatusCombo(pensionaryStatusComboItems.itemList);
    }
  }, [isPensionaryStatusComboSuccess, pensionaryStatusComboItems]);

  useEffect(() => {
    if (isCountryComboSuccess) {
      setCountryCombo(countryComboItems.itemList);
    }
  }, [isCountryComboSuccess, countryComboItems]);

  useEffect(() => {
    if (isCityComboSuccess) {
      setCityCombo(cityComboItems.itemList);
    }
  }, [isCityComboSuccess, cityComboItems]);

  useEffect(() => {
    if (isStateComboSuccess) {
      setStateCombo(stateComboItems.itemList);
    }
  }, [isStateComboSuccess, stateComboItems]);

  // CHANGE HANDLERS
  const handleBirthDateChange = (date) => {
    setSelectedBirthDate(date);
    setIsBirthCalenderOpen(false);
  };

  const handleMaritialDateChange = (date) => {
    setSelectedMritialDate(date);
    setIsMritialCalenderOpen(false);
  };

  const handleSelfEmployeeStartDateChange = (date) => {
    setSelectedSelfEmployeeStartDate(date);
    setIsSelfEmployeeStartCalenderOpen(false);
  };

  const handleSelfEmployeeEndDateChange = (date) => {
    setSelectedSelfEmployeeEndDate(date);
    setIsSelfEmployeeEndCalenderOpen(false);
  };

  const handleBirthOpenChange = (open) => {
    setIsBirthCalenderOpen(open);
  };

  const handleMaritialOpenChange = (open) => {
    setIsMritialCalenderOpen(open);
  };

  const handleSelfEmployeeStartOpenChange = (open) => {
    setIsSelfEmployeeStartCalenderOpen(open);
  };

  const handleSelfEmployeeEndOpenChange = (open) => {
    setIsSelfEmployeeEndCalenderOpen(open);
  };

  const handleRealtedObjectChange = (e) => {
    const { name, value } = e.target;
    setRelatedObject({
      ...relatedObject,
      [name]: convertToPersianNumber(value),
    });
  };

  const handleInsertRelated = async () => {
    try {
      // Adjusting for timezone difference
      let personBirthDate;
      let personMaritalDate;
      let selfEmployeeStartDate;
      let selfEmployeeEndDate;

      if (personBirthDate) {
        personBirthDate = new Date(selectedBirthDate);
        personBirthDate.setMinutes(
          personBirthDate.getMinutes() - personBirthDate.getTimezoneOffset()
        );
      } else {
        personBirthDate = null;
      }

      if (personMaritalDate) {
        personMaritalDate = new Date(selectedMritialDate);
        personMaritalDate.setMinutes(
          personMaritalDate.getMinutes() - personMaritalDate.getTimezoneOffset()
        );
      } else {
        personMaritalDate = null;
      }
      if (selfEmployeeStartDate) {
        selfEmployeeStartDate = new Date(selectedSelfEmployeeStartDate);
        selfEmployeeStartDate.setMinutes(
          selfEmployeeStartDate.getMinutes() -
            selfEmployeeStartDate.getTimezoneOffset()
        );
      } else {
        selfEmployeeStartDate = null;
      }
      if (selfEmployeeEndDate) {
        selfEmployeeEndDate = new Date(selectedSelfEmployeeEndDate);
        selfEmployeeEndDate.setMinutes(
          selfEmployeeEndDate.getMinutes() -
            selfEmployeeEndDate.getTimezoneOffset()
        );
      } else {
        selfEmployeeEndDate = null;
      }

      const insertRes = await insertRelated({
        ...relatedObject,
        parentPersonID,
        relationshipWithParentID: convertToEnglishNumber(
          relatedObject.relationshipWithParentID
        ),
        personCertificateNo: convertToEnglishNumber(
          relatedObject.personCertificateNo
        ),
        personNationalCode: convertToEnglishNumber(
          relatedObject.personNationalCode
        ),
        pensionaryStatusID: convertToEnglishNumber(
          relatedObject.pensionaryStatusID
        ),
        maritalStatusID: convertToEnglishNumber(relatedObject.maritalStatusID),
        educationTypeID: convertToEnglishNumber(relatedObject.educationTypeID),
        universityID: convertToEnglishNumber(relatedObject.universityID),
        personPhone: convertToEnglishNumber(relatedObject.personPhone),
        personCellPhone: convertToEnglishNumber(relatedObject.personCellPhone),
        personCellPhone2: convertToEnglishNumber(
          relatedObject.personCellPhone2
        ),
        personRegion:
          parseInt(convertToEnglishNumber(relatedObject.personRegion)) || null,
        personArea:
          parseInt(convertToEnglishNumber(relatedObject.personArea)) || null,
        personCountryID: convertToEnglishNumber(relatedObject.personCountryID),
        personCityID: convertToEnglishNumber(relatedObject.personCityID),
        personStateID: convertToEnglishNumber(relatedObject.personStateID),
        personPostalCode: convertToEnglishNumber(
          relatedObject.personPostalCode
        ),
        backupPhone: convertToEnglishNumber(relatedObject.backupPhone),
        backupCellphone: convertToEnglishNumber(relatedObject.backupCellphone),
        personBirthDate,
        personMaritalDate,
        selfEmployeeStartDate,
        selfEmployeeEndDate,
      }).unwrap();
      setShowCreateRelatedModal(false);
      toast.success(insertRes.message, {
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
    <section className="formContainer formContainer--width-lg flex-col">
      <form method="POST" className="grid grid--col-3" noValidate>
        <div className="inputBox__form">
          <select
            type="text"
            className="inputBox__form--input"
            value={relatedObject?.relationshipWithParentID || " "}
            required
            name="relationshipWithParentID"
            onChange={handleRealtedObjectChange}
            id="relationshipWithParentID"
          >
            <option value=" " disabled>
              انتخاب نسبت
            </option>
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
            onChange={handleRealtedObjectChange}
            value={relatedObject?.personFirstName || ""}
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
            onChange={handleRealtedObjectChange}
            value={relatedObject?.personLastName || ""}
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
            onChange={handleRealtedObjectChange}
            value={relatedObject?.personNationalCode ?? ""}
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
            onChange={handleRealtedObjectChange}
            value={relatedObject?.personCertificateNo ?? ""}
            name="personCertificateNo"
            id="personCertificateNo2"
          />
          <label
            className="inputBox__form--label"
            htmlFor="personCertificateNo2"
          >
            <span>*</span> شماره شناسنامه
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            onChange={handleRealtedObjectChange}
            value={relatedObject?.personFatherName || ""}
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
            format={"jYYYY/jMM/jDD"}
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
          <InputDatePicker
            value={selectedMritialDate}
            onChange={handleMaritialDateChange}
            format={"jYYYY/jMM/jDD"}
            onOpenChange={handleMaritialOpenChange}
            suffixIcon={<CalenderIcon color="action" />}
            open={isMritialCalenderOpen}
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
          <div className="inputBox__form--readOnly-label">تاریخ عقد</div>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            onChange={handleRealtedObjectChange}
            value={relatedObject?.personBirthPlace || ""}
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
            onChange={handleRealtedObjectChange}
            value={
              convertToEnglishNumber(relatedObject?.pensionaryStatusID) || " "
            }
            name="pensionaryStatusID"
            required
            id="pensionaryStatusID"
          >
            <option value=" " disabled>
              انتخاب کنید
            </option>
            {pensionaryStatusCombo.map((status) => (
              <option
                key={status.pensionaryStatusID}
                value={status.pensionaryStatusID}
              >
                {status.pensionaryStatusName}
              </option>
            ))}
          </select>
          <label className="inputBox__form--label" htmlFor="pensionaryStatusID">
            <span>*</span> وضعیت وابسته
          </label>
        </div>

        <div className="inputBox__form">
          <select
            className="inputBox__form--input"
            onChange={handleRealtedObjectChange}
            value={relatedObject?.maritalStatusID || " "}
            name="maritalStatusID"
            required
            id="maritalStatusID1"
          >
            <option value=" " disabled>
              انتخاب کنید
            </option>
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
            value={relatedObject?.educationTypeID || " "}
            name="educationTypeID"
            required
            id="educationTypeID1"
          >
            <option value=" " disabled>
              انتخاب کنید
            </option>
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
            onChange={handleRealtedObjectChange}
            value={relatedObject?.educationTypeCaption || ""}
            name="educationTypeCaption"
            required
            id="educationTypeCaption"
          />
          <label
            className="inputBox__form--label"
            htmlFor="educationTypeCaption"
          >
            عنوان مدرک
          </label>
        </div>

        <div className="inputBox__form">
          <select
            type="text"
            className="inputBox__form--input"
            onChange={handleRealtedObjectChange}
            value={relatedObject?.universityID || " "}
            name="universityID"
            required
            id="universityID1"
          >
            <option value=" " disabled>
              انتخاب کنید
            </option>
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
            onChange={handleRealtedObjectChange}
            value={relatedObject?.universityCaption || ""}
            name="universityCaption"
            id="universityCaption"
          />
          <label className="inputBox__form--label" htmlFor="universityCaption">
            واحد دانشگاهی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleRealtedObjectChange}
            name="personCellPhone"
            value={relatedObject?.personCellPhone || ""}
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
            value={relatedObject?.personCellPhone2 || ""}
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
            value={relatedObject?.personPhone || ""}
            id="personPhone1"
          />
          <label className="inputBox__form--label" htmlFor="personPhone1">
            تلفن ثابت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            onChange={handleRealtedObjectChange}
            name="personRegion"
            value={relatedObject?.personRegion || ""}
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
            value={relatedObject?.personArea || ""}
            id="personArea1"
          />
          <label className="inputBox__form--label" htmlFor="personArea1">
            ناحیه سکونت
          </label>
        </div>
        <div className="inputBox__form">
          <select
            type="text"
            id="personCountry"
            name="personCountryID"
            value={relatedObject?.personCountryID || " "}
            className="inputBox__form--input field"
            onChange={handleRealtedObjectChange}
            required
          >
            <option value=" " disabled>
              انتخاب کنید
            </option>
            {countryCombo.map((country) => (
              <option key={country.lookUpID} value={country.lookUpID}>
                {country.lookUpName}
              </option>
            ))}
          </select>
          <label htmlFor="personCountry" className="inputBox__form--label">
            <span>*</span> کشور
          </label>
        </div>
        <div className="inputBox__form">
          <select
            type="text"
            id="personState"
            name="personStateID"
            className="inputBox__form--input"
            value={relatedObject?.personStateID || " "}
            onChange={handleRealtedObjectChange}
            required
          >
            <option value=" " disabled>
              انتخاب کنید
            </option>
            {stateCombo.map((state) => (
              <option key={state.lookUpID} value={state.lookUpID}>
                {state.lookUpName}
              </option>
            ))}
          </select>
          <label htmlFor="personState" className="inputBox__form--label">
            استان
          </label>
        </div>
        <div className="inputBox__form">
          <select
            type="text"
            id="personCity"
            name="personCityID"
            className="inputBox__form--input"
            value={relatedObject?.personCityID || " "}
            onChange={handleRealtedObjectChange}
            required
          >
            <option value=" " disabled>
              انتخاب کنید
            </option>
            {cityCombo.map((city) => (
              <option key={city.lookUpID} value={city.lookUpID}>
                {city.lookUpName}
              </option>
            ))}
          </select>
          <label htmlFor="personCity" className="inputBox__form--label">
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
            value={relatedObject?.personPostalCode ?? ""}
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
            onChange={handleRealtedObjectChange}
            name="personSpecialDisease"
            value={relatedObject?.personSpecialDisease || ""}
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
            onChange={handleRealtedObjectChange}
            name="personAddress"
            value={relatedObject?.personAddress || ""}
            id="personAddress1"
          />
          <label className="inputBox__form--label" htmlFor="personAddress1">
            نشانی
          </label>
        </div>

        <div className="inputBox__form col-span-3 row-span-2">
          <textarea
            type="text"
            className="inputBox__form--input"
            required
            onChange={handleRealtedObjectChange}
            name="personDescription"
            value={relatedObject?.personDescription || ""}
            id="personDescription1"
          ></textarea>
          <label className="inputBox__form--label" htmlFor="personDescription1">
            توضیحات
          </label>
        </div>
      </form>

      <div className="Modal__header u-margin-top-sm">
        <h4 className="title-secondary"> اطلاعات خویش فرمایی</h4>
      </div>

      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form col-span-2">
          <input
            type="text"
            className="inputBox__form--input"
            required
            onChange={handleRealtedObjectChange}
            name="selfEmployeeTypeName"
            value={relatedObject?.selfEmployeeTypeName || ""}
            id="selfEmployeeTypeName"
          />
          <label
            className="inputBox__form--label"
            htmlFor="selfEmployeeTypeName"
          >
            وضعیت
          </label>
        </div>

        <div className="inputBox__form">
          <InputDatePicker
            value={selectedSelfEmployeeStartDate}
            onChange={handleSelfEmployeeStartDateChange}
            format={"jYYYY/jMM/jDD"}
            onOpenChange={handleSelfEmployeeStartOpenChange}
            suffixIcon={<CalenderIcon color="action" />}
            open={isSelfEmployeeStartCalenderOpen}
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
          <div className="inputBox__form--readOnly-label">تاریخ شروع</div>
        </div>
        <div className="inputBox__form">
          <InputDatePicker
            value={selectedSelfEmployeeEndDate}
            onChange={handleSelfEmployeeEndDateChange}
            format={"jYYYY/jMM/jDD"}
            onOpenChange={handleSelfEmployeeEndOpenChange}
            suffixIcon={<CalenderIcon color="action" />}
            open={isSelfEmployeeEndCalenderOpen}
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
          <div className="inputBox__form--readOnly-label">تاریخ پایان</div>
        </div>

        <div className="inputBox__form col-span-4">
          <textarea
            type="text"
            className="inputBox__form--input"
            required
            onChange={handleRealtedObjectChange}
            name="selfEmployeeDesc"
            value={relatedObject?.selfEmployeeDesc || ""}
            id="selfEmployeeDesc"
          ></textarea>
          <label className="inputBox__form--label" htmlFor="selfEmployeeDesc">
            توضیحات
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
            onChange={handleRealtedObjectChange}
            name="backupFirstName"
            value={relatedObject?.backupFirstName || ""}
            required
            id="backupFirstName1"
          />
          <label className="inputBox__form--label" htmlFor="backupFirstName1">
            نام
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleRealtedObjectChange}
            name="backupLastName"
            value={relatedObject?.backupLastName || ""}
            required
            id="backupLastName1"
          />
          <label className="inputBox__form--label" htmlFor="backupLastName1">
            نام خانوادگی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleRealtedObjectChange}
            name="backupRelation"
            value={relatedObject?.backupRelation || ""}
            required
            id="backupRelation"
          />
          <label className="inputBox__form--label" htmlFor="backupRelation">
            نسبت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleRealtedObjectChange}
            name="backupPhone"
            value={relatedObject?.backupPhone || ""}
            required
            id="backupPhone"
          />
          <label className="inputBox__form--label" htmlFor="backupPhone">
            تلفن ثابت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleRealtedObjectChange}
            name="backupCellphone"
            value={relatedObject?.backupCellphone || ""}
            required
            id="backupCellphone"
          />
          <label className="inputBox__form--label" htmlFor="backupCellphone">
            تلفن همراه
          </label>
        </div>

        <div className="inputBox__form col-span-3">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleRealtedObjectChange}
            name="backupAddress"
            value={relatedObject?.backupAddress || ""}
            required
            id="backupAddress"
          />
          <label className="inputBox__form--label" htmlFor="backupAddress">
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

  return content;
}

export default CreateRelatedForm;
