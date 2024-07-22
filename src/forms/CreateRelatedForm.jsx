// react imports
import { useEffect, useState, useRef } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useInsertRelatedMutation } from "../slices/relatedApiSlice";

// hooks
import {
  useFetchLookUpData,
  useFetchPensionaryStatus,
  useFetchRelationship,
} from "../hooks/useFetchLookUpData";
import { useCloseCalender } from "../hooks/useCloseCalender";

// mui imports
import { LoadingButton } from "@mui/lab";
import {
  Save as SaveIcon,
  CalendarTodayOutlined as CalenderIcon,
} from "@mui/icons-material";

// libary imports
import { toast } from "react-toastify";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// helpers
import { convertToPersianNumber, convertToEnglishNumber } from "../helper.js";

// utils
import {
  selectStyles,
  selectSettings,
  optionsGenerator,
} from "../utils/reactSelect";
import { datePickerStyles, datePickerWrapperStyles } from "../utils/datePicker";

function CreateRelatedForm({ setShowCreateRelatedModal }) {
  // CALENDER REFS
  const birthCalenderRef = useRef(null);
  const maritialCalenderRef = useRef(null);
  const startCalenderRef = useRef(null);
  const endCalenderRef = useRef(null);

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
  const animatedComponents = makeAnimated();

  // GET LOOKUP DATA
  const { relationships, relationshipIsLoading, relationshipIsFetching } =
    useFetchRelationship();

  const {
    pensionaryStatus,
    pensionaryStatusIsLoading,
    pensionaryStatusIsFetching,
  } = useFetchPensionaryStatus({
    pensionaryStatusCategory: "L",
  });

  const {
    lookUpItems: maritialStatusItems,
    lookUpItemsIsLoading: maritialStatusIsLoading,
    lookUpItemsIsFetching: maritialStatusIsFetching,
  } = useFetchLookUpData({ lookUpType: "MaritialStatus" });

  const {
    lookUpItems: educationTypes,
    lookUpItemsIsLoading: educationTypesIsLoading,
    lookUpItemsIsFetching: educationTypesIsFetching,
  } = useFetchLookUpData({ lookUpType: "EducationType" });

  const {
    lookUpItems: universityTypes,
    lookUpItemsIsLoading: universityTypesIsLoading,
    lookUpItemsIsFetching: universityTypesIsFetching,
  } = useFetchLookUpData({ lookUpType: "UniversityType" });

  const {
    lookUpItems: countryItems,
    lookUpItemsIsLoading: countryItemsIsLoading,
    lookUpItemsIsFetching: countryItemsIsFetching,
  } = useFetchLookUpData({ lookUpType: "Country" });

  const {
    lookUpItems: stateItems,
    lookUpItemsIsLoading: stateItemsIsLoading,
    lookUpItemsIsFetching: stateItemsIsFetching,
  } = useFetchLookUpData({ lookUpType: "State" });

  const {
    lookUpItems: cityItems,
    lookUpItemsIsLoading: cityItemsIsLoading,
    lookUpItemsIsFetching: cityItemsIsFetching,
  } = useFetchLookUpData({ lookUpType: "City" });

  // SELECT OPTIONS
  const relationOptions = optionsGenerator(
    relationships,
    "relationshipID",
    "relationshipName"
  );

  const pensionaryStatusOptions = optionsGenerator(
    pensionaryStatus,
    "pensionaryStatusID",
    "pensionaryStatusName"
  );

  const maritialStatusOptions = optionsGenerator(
    maritialStatusItems,
    "lookUpID",
    "lookUpName"
  );

  const educationOptions = optionsGenerator(
    educationTypes,
    "lookUpID",
    "lookUpName"
  );

  const universityOptions = optionsGenerator(
    universityTypes,
    "lookUpID",
    "lookUpName"
  );

  const countryOptions = optionsGenerator(
    countryItems,
    "lookUpID",
    "lookUpName"
  );

  const stateOptions = optionsGenerator(stateItems, "lookUpID", "lookUpName");

  const cityOptions = optionsGenerator(cityItems, "lookUpID", "lookUpName");

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

  // HANDLE RELATED OBJECT CHANGE
  const handleRealtedObjectChange = (e) => {
    const { name, value } = e.target;
    setRelatedObject({
      ...relatedObject,
      [name]: convertToPersianNumber(value),
    });
  };

  // HANDLE SELECT OPTION CHANGE
  const handleSelectOptionChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    if (selectedOption) {
      const { value } = selectedOption;
      setRelatedObject({ ...relatedObject, [name]: value || "" });
    } else {
      setRelatedObject({ ...relatedObject, [name]: null });
    }
  };

  const handleInsertRelated = async () => {
    try {
      // Adjusting for timezone difference
      let personBirthDate;
      let personMaritalDate;
      let selfEmployeeStartDate;
      let selfEmployeeEndDate;

      if (selectedBirthDate) {
        personBirthDate = new Date(selectedBirthDate);
        personBirthDate.setMinutes(
          personBirthDate.getMinutes() - personBirthDate.getTimezoneOffset()
        );
      } else {
        personBirthDate = null;
      }

      if (selectedMritialDate) {
        personMaritalDate = new Date(selectedMritialDate);
        personMaritalDate.setMinutes(
          personMaritalDate.getMinutes() - personMaritalDate.getTimezoneOffset()
        );
      } else {
        personMaritalDate = null;
      }
      if (selectedSelfEmployeeStartDate) {
        selfEmployeeStartDate = new Date(selectedSelfEmployeeStartDate);
        selfEmployeeStartDate.setMinutes(
          selfEmployeeStartDate.getMinutes() -
            selfEmployeeStartDate.getTimezoneOffset()
        );
      } else {
        selfEmployeeStartDate = null;
      }
      if (selectedSelfEmployeeEndDate) {
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

  useEffect(() => {
    console.log(relatedObject);
  }, [relatedObject]);

  // FIX CLOSE CALENDER BUG
  useCloseCalender(
    [birthCalenderRef, maritialCalenderRef, startCalenderRef, endCalenderRef],
    [
      setIsBirthCalenderOpen,
      setIsMritialCalenderOpen,
      setIsSelfEmployeeStartCalenderOpen,
      setIsSelfEmployeeEndCalenderOpen,
    ]
  );

  const content = (
    <section className="formContainer-transparent formContainer--width-lg flex-col">
      <form method="POST" className="grid grid--col-3" noValidate>
        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={relationOptions}
            onChange={handleSelectOptionChange}
            value={relationOptions.find(
              (item) => item.value === relatedObject?.relationshipWithParentID
            )}
            name="relationshipWithParentID"
            isClearable={true}
            placeholder={
              <div className="react-select-placeholder">
                <span>*</span> نسبت
              </div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
            isLoading={relationshipIsLoading || relationshipIsFetching}
          />

          <label
            className={
              relatedObject?.relationshipWithParentID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
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
            style={datePickerStyles}
            wrapperStyle={datePickerWrapperStyles}
            pickerProps={{
              ref: birthCalenderRef,
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
            style={datePickerStyles}
            wrapperStyle={datePickerWrapperStyles}
            pickerProps={{
              ref: maritialCalenderRef,
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
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={pensionaryStatusOptions}
            onChange={handleSelectOptionChange}
            value={pensionaryStatusOptions.find(
              (item) => item.value === relatedObject?.pensionaryStatusID
            )}
            name="pensionaryStatusID"
            isClearable={true}
            placeholder={
              <div className="react-select-placeholder">
                <span>*</span> وضعیت وابسته
              </div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
            isLoading={pensionaryStatusIsLoading || pensionaryStatusIsFetching}
          />

          <label
            className={
              relatedObject?.pensionaryStatusID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            <span>*</span> وضعیت وابسته
          </label>
        </div>

        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={maritialStatusOptions}
            onChange={handleSelectOptionChange}
            value={maritialStatusOptions.find(
              (item) => item.value === relatedObject?.maritalStatusID
            )}
            name="maritalStatusID"
            isClearable={true}
            placeholder={
              <div className="react-select-placeholder">وضعیت تاهل</div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
            isLoading={maritialStatusIsLoading || maritialStatusIsFetching}
          />

          <label
            className={
              relatedObject?.maritalStatusID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            وضعیت تاهل
          </label>
        </div>

        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={educationOptions}
            onChange={handleSelectOptionChange}
            value={educationOptions.find(
              (item) => item.value === relatedObject?.educationTypeID
            )}
            name="educationTypeID"
            isClearable={true}
            placeholder={
              <div className="react-select-placeholder">مدرک تحصیلی</div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
            isLoading={educationTypesIsLoading || educationTypesIsFetching}
          />

          <label
            className={
              relatedObject?.educationTypeID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
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
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={universityOptions}
            onChange={handleSelectOptionChange}
            value={universityOptions.find(
              (item) => item.value === relatedObject?.universityID
            )}
            name="universityID"
            isClearable={true}
            placeholder={
              <div className="react-select-placeholder">دانشگاه</div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
            isLoading={universityTypesIsLoading || universityTypesIsFetching}
          />

          <label
            className={
              relatedObject?.universityID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
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
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={countryOptions}
            onChange={handleSelectOptionChange}
            value={countryOptions.find(
              (item) => item.value === relatedObject?.personCountryID
            )}
            name="personCountryID"
            isClearable={true}
            placeholder={<div className="react-select-placeholder">کشور</div>}
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
            isLoading={countryItemsIsLoading || countryItemsIsFetching}
          />

          <label
            className={
              relatedObject?.personCountryID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            کشور
          </label>
        </div>
        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={stateOptions}
            onChange={handleSelectOptionChange}
            value={stateOptions.find(
              (item) => item.value === relatedObject?.personStateID
            )}
            name="personStateID"
            isClearable={true}
            placeholder={<div className="react-select-placeholder">استان</div>}
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
            isLoading={stateItemsIsLoading || stateItemsIsFetching}
          />

          <label
            className={
              relatedObject?.personStateID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            استان
          </label>
        </div>
        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={cityOptions}
            onChange={handleSelectOptionChange}
            value={cityOptions.find(
              (item) => item.value === relatedObject?.personCityID
            )}
            name="personCityID"
            isClearable={true}
            placeholder={<div className="react-select-placeholder">شهر</div>}
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
            isLoading={cityItemsIsLoading || cityItemsIsFetching}
          />

          <label
            className={
              relatedObject?.personCityID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
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
            style={datePickerStyles}
            wrapperStyle={datePickerWrapperStyles}
            pickerProps={{
              ref: startCalenderRef,
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
            wrapperStyle={datePickerWrapperStyles}
            pickerProps={{
              ref: endCalenderRef,
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
