// react imports
import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

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

function CreateRelatedForm({ setShowCreateRelatedModal, refetch }) {
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

  // ACCESS REACT HOOK FORM CONTROL
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    watch,
  } = useForm();

  // ACCESS REACT HOOK FORM DATA
  const form_data = watch();

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

  const onSubmit = async () => {
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
        ...form_data,
        parentPersonID,
        relationshipWithParentID: convertToEnglishNumber(
          form_data.relationshipWithParentID
        ),
        personCertificateNo: convertToEnglishNumber(
          form_data.personCertificateNo
        ),
        personNationalCode: convertToEnglishNumber(
          form_data.personNationalCode
        ),
        pensionaryStatusID: convertToEnglishNumber(
          form_data.pensionaryStatusID
        ),
        maritalStatusID: convertToEnglishNumber(form_data.maritalStatusID),
        educationTypeID: convertToEnglishNumber(form_data.educationTypeID),
        universityID: convertToEnglishNumber(form_data.universityID),
        personPhone: convertToEnglishNumber(form_data.personPhone),
        personCellPhone: convertToEnglishNumber(form_data.personCellPhone),
        personCellPhone2: convertToEnglishNumber(form_data.personCellPhone2),
        personRegion:
          parseInt(convertToEnglishNumber(form_data.personRegion)) || null,
        personArea:
          parseInt(convertToEnglishNumber(form_data.personArea)) || null,
        personCountryID: convertToEnglishNumber(form_data.personCountryID),
        personCityID: convertToEnglishNumber(form_data.personCityID),
        personStateID: convertToEnglishNumber(form_data.personStateID),
        personPostalCode: convertToEnglishNumber(form_data.personPostalCode),
        backupPhone: convertToEnglishNumber(form_data.backupPhone),
        backupCellphone: convertToEnglishNumber(form_data.backupCellphone),
        personBirthDate,
        personMaritalDate,
        selfEmployeeStartDate,
        selfEmployeeEndDate,
      }).unwrap();
      setShowCreateRelatedModal(false);
      refetch();
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

  // DEBUGGING
  // const onSubmit = () => {
  //   console.log(form_data);
  // };

  const content = (
    <section className="formContainer-transparent formContainer--width-lg flex-col">
      <form
        method="POST"
        className="flex-col"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="grid grid--col-3">
          <div className="inputBox__form">
            <Controller
              name="relationshipWithParentID"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={relationOptions}
                  onChange={(val) => onChange(val ? val.value : null)}
                  value={relationOptions.find(
                    (c) => c.value === form_data?.relationshipWithParentID
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
              )}
            />

            <label
              className={
                form_data?.relationshipWithParentID
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              <span>*</span> نسبت
            </label>
            {errors.relationshipWithParentID && (
              <span className="error-form"> نسبت اجباری است</span>
            )}
          </div>

          <div className="inputBox__form">
            {errors.personFirstName && (
              <span className="error-form">
                {errors.personFirstName.message}
              </span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              value={form_data?.personFirstName || ""}
              name="personFirstName"
              id="personFirstName1"
              required
              {...register("personFirstName", {
                required: "نام اجباری است",
                pattern: {
                  value: /^[آ-ی\s]+$/,
                  message: "از حروف فارسی استفاده کنید",
                },
              })}
            />
            <label className="inputBox__form--label" htmlFor="personFirstName1">
              <span>*</span> نام
            </label>
          </div>

          <div className="inputBox__form">
            {errors.personLastName && (
              <span className="error-form">
                {errors.personLastName.message}
              </span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              value={form_data?.personLastName || ""}
              name="personLastName"
              id="personLastName1"
              required
              {...register("personLastName", {
                required: "نام خانوادگی اجباری است",
                pattern: {
                  value: /^[آ-ی\s]+$/,
                  message: "از حروف فارسی استفاده کنید",
                },
              })}
            />
            <label className="inputBox__form--label" htmlFor="personLastName1">
              <span>*</span> نام خانوادگی
            </label>
          </div>

          <div className="inputBox__form">
            {errors.personNationalCode && (
              <span className="error-form">
                {errors.personNationalCode.message}
              </span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              value={
                convertToPersianNumber(form_data?.personNationalCode) ?? ""
              }
              name="personNationalCode"
              id="personNationalCode2"
              required
              {...register("personNationalCode", {
                required: "کد ملی را وارد کنید",
                minLength: {
                  value: 10,
                  message: "کد ملی باید ۱۰ رقم باشد",
                },
                maxLength: {
                  value: 10,
                  message: "کد ملی باید ۱۰ رقم باشد",
                },
                pattern: {
                  value: /^[۰-۹0-9]+$/,
                  message: "کد ملی باید فقط شامل اعداد باشد",
                },
              })}
            />
            <label
              className="inputBox__form--label"
              htmlFor="personNationalCode2"
            >
              <span>*</span> کد ملی
            </label>
          </div>

          <div className="inputBox__form">
            {errors.personCertificateNo && (
              <span className="error-form">
                {errors.personCertificateNo.message}
              </span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              value={
                convertToPersianNumber(form_data?.personCertificateNo) ?? ""
              }
              name="personCertificateNo"
              id="personCertificateNo2"
              required
              {...register("personCertificateNo", {
                required: "شماره شناسنامه را وارد کنید",
                pattern: {
                  value: /^[۰-۹0-9]+$/,
                  message: " شماره شناسنامه باید فقط شامل اعداد باشد",
                },
              })}
            />
            <label
              className="inputBox__form--label"
              htmlFor="personCertificateNo2"
            >
              <span>*</span> شماره شناسنامه
            </label>
          </div>

          <div className="inputBox__form">
            {errors.personFatherName && (
              <span className="error-form">
                {errors.personFatherName.message}
              </span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              value={form_data?.personFatherName || ""}
              name="personFatherName"
              id="personFatherName1"
              required
              {...register("personFatherName", {
                pattern: {
                  value: /^[آ-ی\s]+$/,
                  message: "از حروف فارسی استفاده کنید",
                },
              })}
            />
            <label
              className="inputBox__form--label"
              htmlFor="personFatherName1"
            >
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
            {errors.personBirthPlace && (
              <span className="error-form">
                {errors.personBirthPlace.message}
              </span>
            )}

            <input
              type="text"
              className="inputBox__form--input"
              value={form_data?.personBirthPlace || ""}
              name="personBirthPlace"
              id="personBirthPlace1"
              required
              {...register("personBirthPlace", {
                pattern: {
                  value: /^[آ-ی\s]+$/,
                  message: "از حروف فارسی استفاده کنید",
                },
              })}
            />
            <label
              className="inputBox__form--label"
              htmlFor="personBirthPlace1"
            >
              محل تولد
            </label>
          </div>
          <div className="inputBox__form">
            <Controller
              name="pensionaryStatusID"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={pensionaryStatusOptions}
                  onChange={(val) => onChange(val ? val.value : null)}
                  value={pensionaryStatusOptions.find(
                    (c) => c.value === form_data?.pensionaryStatusID
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
                  isLoading={
                    pensionaryStatusIsLoading || pensionaryStatusIsFetching
                  }
                />
              )}
            />

            <label
              className={
                form_data?.pensionaryStatusID
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              <span>*</span> وضعیت وابسته
            </label>

            {errors.pensionaryStatusID && (
              <span className="error-form">وضعیت اجباری است</span>
            )}
          </div>

          <div className="inputBox__form">
            <Controller
              name="maritalStatusID"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={maritialStatusOptions}
                  onChange={(val) => onChange(val ? val.value : null)}
                  value={maritialStatusOptions.find(
                    (c) => c.value === form_data?.maritalStatusID
                  )}
                  name="maritalStatusID"
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">وضعیت تاهل</div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                  isLoading={
                    maritialStatusIsLoading || maritialStatusIsFetching
                  }
                />
              )}
            />

            <label
              className={
                form_data?.maritalStatusID
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              وضعیت تاهل
            </label>
          </div>

          <div className="inputBox__form">
            <Controller
              name="educationTypeID"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={educationOptions}
                  onChange={(val) => onChange(val ? val.value : null)}
                  value={educationOptions.find(
                    (c) => c.value === form_data?.educationTypeID
                  )}
                  name="educationTypeID"
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">مدرک تحصیلی</div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                  isLoading={
                    educationTypesIsLoading || educationTypesIsFetching
                  }
                />
              )}
            />

            <label
              className={
                form_data?.educationTypeID
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              مدرک تحصیلی
            </label>
          </div>
          <div className="inputBox__form">
            {errors.educationTypeCaption && (
              <span className="error-form">
                {errors.educationTypeCaption.message}
              </span>
            )}

            <input
              type="text"
              className="inputBox__form--input"
              value={form_data?.educationTypeCaption || ""}
              name="educationTypeCaption"
              id="educationTypeCaption"
              required
              {...register("educationTypeCaption", {
                pattern: {
                  value: /^[آ-ی\s]+$/,
                  message: "از حروف فارسی استفاده کنید",
                },
              })}
            />
            <label
              className="inputBox__form--label"
              htmlFor="educationTypeCaption"
            >
              عنوان مدرک
            </label>
          </div>

          <div className="inputBox__form">
            <Controller
              name="universityID"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={universityOptions}
                  onChange={(val) => onChange(val ? val.value : null)}
                  value={universityOptions.find(
                    (c) => c.value === form_data?.universityID
                  )}
                  name="universityID"
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">دانشگاه</div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                  isLoading={
                    universityTypesIsLoading || universityTypesIsFetching
                  }
                />
              )}
            />

            <label
              className={
                form_data?.universityID
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
              value={form_data?.universityCaption || ""}
              name="universityCaption"
              id="universityCaption"
              required
              {...register("universityCaption", {
                pattern: {
                  value: /^[آ-ی\s]+$/,
                  message: "از حروف فارسی استفاده کنید",
                },
              })}
            />
            <label
              className="inputBox__form--label"
              htmlFor="universityCaption"
            >
              واحد دانشگاهی
            </label>
          </div>

          <div className="inputBox__form">
            {errors.personCellPhone && (
              <span className="error-form">
                {errors.personCellPhone.message}
              </span>
            )}

            <input
              type="text"
              className="inputBox__form--input"
              name="personCellPhone"
              value={form_data?.personCellPhone || ""}
              id="personCellPhone1"
              required
              {...register("personCellPhone", {
                pattern: {
                  value: /^[۰-۹0-9]+$/,
                  message: "تلفن باید فقط شامل اعداد باشد",
                },
                minLength: {
                  value: 11,
                  message: "تلفن همراه باید ۱۱ رقم باشد",
                },
                maxLength: {
                  value: 11,
                  message: "تلفن همراه باید ۱۱ رقم باشد",
                },
              })}
            />
            <label className="inputBox__form--label" htmlFor="personCellPhone1">
              تلفن همراه ۱
            </label>
          </div>

          <div className="inputBox__form">
            {errors.personCellPhone2 && (
              <span className="error-form">
                {errors.personCellPhone2.message}
              </span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              name="personCellPhone2"
              value={form_data?.personCellPhone2 || ""}
              id="personCellPhone22"
              required
              {...register("personCellPhone2", {
                pattern: {
                  value: /^[۰-۹0-9]+$/,
                  message: "تلفن باید فقط شامل اعداد باشد",
                },
                minLength: {
                  value: 11,
                  message: "تلفن همراه باید ۱۱ رقم باشد",
                },
                maxLength: {
                  value: 11,
                  message: "تلفن همراه باید ۱۱ رقم باشد",
                },
              })}
            />
            <label
              className="inputBox__form--label"
              htmlFor="personCellPhone22"
            >
              تلفن همراه ۲
            </label>
          </div>
          <div className="inputBox__form">
            {errors.personPhone && (
              <span className="error-form">{errors.personPhone.message}</span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              name="personPhone"
              value={form_data?.personPhone || ""}
              id="personPhone1"
              required
              {...register("personPhone", {
                pattern: {
                  value: /^[۰-۹0-9]+$/,
                  message: "تلفن باید فقط شامل اعداد باشد",
                },
                minLength: {
                  value: 8,
                  message: "تلفن ثابت باید ۸ رقم باشد",
                },
                maxLength: {
                  value: 8,
                  message: "تلفن ثابت باید ۸ رقم باشد",
                },
              })}
            />
            <label className="inputBox__form--label" htmlFor="personPhone1">
              تلفن ثابت
            </label>
          </div>

          <div className="inputBox__form">
            {errors.personRegion && (
              <span className="error-form">{errors.personRegion.message}</span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              name="personRegion"
              value={form_data?.personRegion || ""}
              id="personRegion1"
              required
              {...register("personRegion", {
                pattern: {
                  value: /^[۰-۹0-9]+$/,
                  message: "منطقه باید فقط شامل اعداد باشد",
                },
              })}
            />
            <label className="inputBox__form--label" htmlFor="personRegion1">
              منطقه سکونت
            </label>
          </div>

          <div className="inputBox__form">
            {errors.personArea && (
              <span className="error-form">{errors.personArea.message}</span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              name="personArea"
              value={form_data?.personArea || ""}
              id="personArea1"
              required
              {...register("personArea", {
                pattern: {
                  value: /^[۰-۹0-9]+$/,
                  message: "ناحیه باید فقط شامل اعداد باشد",
                },
              })}
            />
            <label className="inputBox__form--label" htmlFor="personArea1">
              ناحیه سکونت
            </label>
          </div>
          <div className="inputBox__form">
            <Controller
              name="personCountryID"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={countryOptions}
                  onChange={(val) => onChange(val ? val.value : null)}
                  value={countryOptions.find(
                    (c) => c.value === form_data?.personCountryID
                  )}
                  name="personCountryID"
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">کشور</div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                  isLoading={countryItemsIsLoading || countryItemsIsFetching}
                />
              )}
            />

            <label
              className={
                form_data?.personCountryID
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              کشور
            </label>
          </div>
          <div className="inputBox__form">
            <Controller
              name="personStateID"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={stateOptions}
                  onChange={(val) => onChange(val ? val.value : null)}
                  value={stateOptions.find(
                    (c) => c.value === form_data?.personStateID
                  )}
                  name="personStateID"
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">استان</div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                  isLoading={stateItemsIsLoading || stateItemsIsFetching}
                />
              )}
            />

            <label
              className={
                form_data?.personStateID
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              استان
            </label>
          </div>
          <div className="inputBox__form">
            <Controller
              name="personCityID"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={cityOptions}
                  onChange={(val) => onChange(val ? val.value : null)}
                  value={cityOptions.find(
                    (c) => c.value === form_data?.personCityID
                  )}
                  name="personCityID"
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">شهر</div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                  isLoading={cityItemsIsLoading || cityItemsIsFetching}
                />
              )}
            />

            <label
              className={
                form_data?.personCityID
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              شهر
            </label>
          </div>

          <div className="inputBox__form">
            {errors.personPostalCode && (
              <span className="error-form">
                {errors.personPostalCode.message}
              </span>
            )}

            <input
              type="text"
              className="inputBox__form--input"
              name="personPostalCode"
              value={form_data?.personPostalCode ?? ""}
              id="personPostalCode1"
              required
              {...register("personPostalCode", {
                pattern: {
                  value: /^[۰-۹0-9]+$/,
                  message: "کد پستی باید فقط شامل اعداد باشد",
                },
                minLength: {
                  value: 10,
                  message: "کد پستی باید ۱۰ رقمی باشد",
                },
                maxLength: {
                  value: 10,
                  message: "کد پستی باید ۱۰ رقمی باشد",
                },
              })}
            />
            <label
              className="inputBox__form--label"
              htmlFor="personPostalCode1"
            >
              کد پستی
            </label>
          </div>

          <div className="inputBox__form">
            {errors.personSpecialDisease && (
              <span className="error-form">
                {errors.personSpecialDisease.message}
              </span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              name="personSpecialDisease"
              value={form_data?.personSpecialDisease || ""}
              id="personSpecialDisease1"
              required
              {...register("personSpecialDisease", {
                pattern: {
                  value: /^[آ-ی\s]+$/,
                  message: "از حروف فارسی استفاده کنید",
                },
              })}
            />
            <label
              className="inputBox__form--label"
              htmlFor="personSpecialDisease1"
            >
              بیماری خاص
            </label>
          </div>

          <div className="inputBox__form col-span-3">
            {errors.personAddress && (
              <span className="error-form">{errors.personAddress.message}</span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              name="personAddress"
              value={form_data?.personAddress || ""}
              id="personAddress1"
              required
              {...register("personAddress", {
                pattern: {
                  value: /^[آ-ی\s۰-۹]+$/,
                  message: "از حروف و اعداد فارسی استفاده کنید",
                },
              })}
            />
            <label className="inputBox__form--label" htmlFor="personAddress1">
              نشانی
            </label>
          </div>

          <div className="inputBox__form col-span-3 row-span-2">
            {errors.personDescription && (
              <span className="error-form">
                {errors.personDescription.message}
              </span>
            )}
            <textarea
              type="text"
              className="inputBox__form--input"
              required
              name="personDescription"
              value={form_data?.personDescription || ""}
              id="personDescription1"
              {...register("personDescription", {
                pattern: {
                  value: /^[آ-ی\s۰-۹]+$/,
                  message: "از حروف و اعداد فارسی استفاده کنید",
                },
              })}
            ></textarea>
            <label
              className="inputBox__form--label"
              htmlFor="personDescription1"
            >
              توضیحات
            </label>
          </div>
        </div>

        <div className="Modal__header u-margin-top-sm">
          <h4 className="title-secondary"> اطلاعات خویش فرمایی</h4>
        </div>

        <div className="grid grid--col-4">
          <div className="inputBox__form col-span-2">
            {errors.selfEmployeeTypeName && (
              <span className="error-form">
                {errors.selfEmployeeTypeName.message}
              </span>
            )}

            <input
              type="text"
              className="inputBox__form--input"
              name="selfEmployeeTypeName"
              value={form_data?.selfEmployeeTypeName || ""}
              id="selfEmployeeTypeName"
              required
              {...register("selfEmployeeTypeName", {
                pattern: {
                  value: /^[آ-ی\s۰-۹]+$/,
                  message: "از حروف فارسی استفاده کنید",
                },
              })}
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
            {errors.selfEmployeeDesc && (
              <span className="error-form">
                {errors.selfEmployeeDesc.message}
              </span>
            )}
            <textarea
              type="text"
              className="inputBox__form--input"
              name="selfEmployeeDesc"
              value={form_data?.selfEmployeeDesc || ""}
              id="selfEmployeeDesc"
              required
              {...register("selfEmployeeDesc", {
                pattern: {
                  value: /^[آ-ی\s۰-۹]+$/,
                  message: "از حروف و اعداد فارسی استفاده کنید",
                },
              })}
            ></textarea>
            <label className="inputBox__form--label" htmlFor="selfEmployeeDesc">
              توضیحات
            </label>
          </div>
        </div>

        <div className="Modal__header u-margin-top-sm">
          <h4 className="title-secondary">اطلاعات پشتیبان</h4>
        </div>
        <div className="grid grid--col-4">
          <div className="inputBox__form">
            {errors.backupFirstName && (
              <span className="error-form">
                {errors.backupFirstName.message}
              </span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              name="backupFirstName"
              value={form_data?.backupFirstName || ""}
              id="backupFirstName1"
              required
              {...register("backupFirstName", {
                pattern: {
                  value: /^[آ-ی\s۰-۹]+$/,
                  message: "از حروف فارسی استفاده کنید",
                },
              })}
            />
            <label className="inputBox__form--label" htmlFor="backupFirstName1">
              نام
            </label>
          </div>
          <div className="inputBox__form">
            {errors.backupLastName && (
              <span className="error-form">
                {errors.backupLastName.message}
              </span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              name="backupLastName"
              value={form_data?.backupLastName || ""}
              id="backupLastName1"
              required
              {...register("backupLastName", {
                pattern: {
                  value: /^[آ-ی\s۰-۹]+$/,
                  message: "از حروف فارسی استفاده کنید",
                },
              })}
            />
            <label className="inputBox__form--label" htmlFor="backupLastName1">
              نام خانوادگی
            </label>
          </div>
          <div className="inputBox__form">
            {errors.backupRelation && (
              <span className="error-form">
                {errors.backupRelation.message}
              </span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              name="backupRelation"
              value={form_data?.backupRelation || ""}
              id="backupRelation"
              required
              {...register("backupRelation", {
                pattern: {
                  value: /^[آ-ی\s۰-۹]+$/,
                  message: "از حروف فارسی استفاده کنید",
                },
              })}
            />
            <label className="inputBox__form--label" htmlFor="backupRelation">
              نسبت
            </label>
          </div>
          <div className="inputBox__form">
            {errors.backupPhone && (
              <span className="error-form">{errors.backupPhone.message}</span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              name="backupPhone"
              value={form_data?.backupPhone || ""}
              id="backupPhone"
              required
              {...register("backupPhone", {
                pattern: {
                  value: /^[۰-۹0-9]+$/,
                  message: "تلفن باید فقط شامل اعداد باشد",
                },
                minLength: {
                  value: 8,
                  message: "تلفن ثابت باید ۸ رقم باشد",
                },
                maxLength: {
                  value: 8,
                  message: "تلفن ثابت باید ۸ رقم باشد",
                },
              })}
            />
            <label className="inputBox__form--label" htmlFor="backupPhone">
              تلفن ثابت
            </label>
          </div>

          <div className="inputBox__form">
            {errors.backupCellphone && (
              <span className="error-form">
                {errors.backupCellphone.message}
              </span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              name="backupCellphone"
              value={form_data?.backupCellphone || ""}
              id="backupCellphone"
              required
              {...register("backupCellphone", {
                pattern: {
                  value: /^[۰-۹0-9]+$/,
                  message: "تلفن همراه باید فقط شامل اعداد باشد",
                },
                minLength: {
                  value: 11,
                  message: "تلفن همراه ثابت باید ۱۱ رقم باشد",
                },
                maxLength: {
                  value: 11,
                  message: "تلفن همراه ثابت باید ۱۱ رقم باشد",
                },
              })}
            />
            <label className="inputBox__form--label" htmlFor="backupCellphone">
              تلفن همراه
            </label>
          </div>

          <div className="inputBox__form col-span-3">
            {errors.backupAddress && (
              <span className="error-form">{errors.backupAddress.message}</span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              name="backupAddress"
              value={form_data?.backupAddress || ""}
              id="backupAddress"
              required
              {...register("backupAddress", {
                pattern: {
                  value: /^[آ-ی\s۰-۹]+$/,
                  message: "از حروف و اعداد فارسی استفاده کنید",
                },
              })}
            />
            <label className="inputBox__form--label" htmlFor="backupAddress">
              نشانی
            </label>
          </div>
        </div>
        <div style={{ marginRight: "auto" }}>
          <LoadingButton
            dir="ltr"
            endIcon={<SaveIcon />}
            // onClick={handleInsertRelated}
            onClick={handleSubmit}
            loading={isLoading}
            type="submit"
            variant="contained"
            color="success"
            sx={{ fontFamily: "sahel" }}
          >
            <span>ذخیره</span>
          </LoadingButton>
        </div>
      </form>
    </section>
  );

  return content;
}

export default CreateRelatedForm;
