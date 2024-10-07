// react imports
import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

// reduxt imports
import {
  useUpdateRetiredPersonMutation,
  useGetRetiredPersonQuery,
} from "../slices/retiredApiSlice.js";
import { setPersonDeathDate } from "../slices/retiredStateSlice.js";
import { useDispatch } from "react-redux";

// HOOKS
import { useFetchLookUpData } from "../hooks/useFetchLookUpData.js";
import { useCloseCalender } from "../hooks/useCloseCalender";

// mui imports
import { Button, Box, CircularProgress, Checkbox } from "@mui/material";
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
import Select from "react-select";
import makeAnimated from "react-select/animated";

// helpers
import {
  convertToPersianNumber,
  convertToEnglishNumber,
  convertToPersianDate,
} from "../helper.js";

// utils
import {
  selectStyles,
  selectSettings,
  optionsGenerator,
} from "../utils/reactSelect";
import { datePickerStyles, datePickerWrapperStyles } from "../utils/datePicker";

function RetiredPersonForm() {
  const birthDateCalenderRef = useRef(null);
  const deathDateCalenderRef = useRef(null);

  const [editable, setEditable] = useState(false);

  const animatedComponents = makeAnimated();

  // DATE STATES
  const [selectedBirthDate, setSelectedBirthDate] = useState(null);
  const [selectedDeathDate, setSelectedDeathDate] = useState(null);
  const [isBirthCalenderOpen, setIsBirthCalenderOpen] = useState(false);
  const [isDeathCalenderOpen, setIsDeathCalenderOpen] = useState(false);

  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  // ACCESS REACT HOOK FORM CONTROL
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    watch,
    setValue,
  } = useForm();

  // ACCESS REACT HOOK FORM DATA
  const form_data = watch();

  // ACCESS UPDATE QUERY
  const [updateRetiredPerson, { isLoading: isUpdating }] =
    useUpdateRetiredPersonMutation();

  const {
    data: retiredPersonData,
    isLoading,
    isFetching,
    isSuccess,
    error,
    refetch,
  } = useGetRetiredPersonQuery(personID);

  // fetch data
  useEffect(() => {
    if (isSuccess) {
      const data = retiredPersonData?.itemList[0];

      if (data) {
        Object.keys(data).forEach((key) => {
          setValue(key, data[key]);
        });
        dispatch(
          setPersonDeathDate(data?.personDeathDate === null ? false : true)
        );
      }
    }

    return () => {
      dispatch(setPersonDeathDate(null));
    };
  }, [dispatch, isSuccess, retiredPersonData?.itemList, setValue]);

  // handle error
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  // GET LOOK UP DATA
  const {
    lookUpItems: genders,
    lookUpItemsIsLoading: isGenderItemsLoading,
    lookUpItemsIsFetching: isGenderItemsFetching,
  } = useFetchLookUpData({ lookUpType: "Gender" });

  const {
    lookUpItems: educationTypes,
    lookUpItemsIsLoading: educationTypesIsLoading,
    lookUpItemsIsFetching: educationTypesIsFetching,
  } = useFetchLookUpData({ lookUpType: "EducationType" });

  const {
    lookUpItems: countries,
    lookUpItemsIsLoading: countriesIsLoading,
    lookUpItemsIsFetching: countriesIsFetching,
  } = useFetchLookUpData({ lookUpType: "Country" });

  const {
    lookUpItems: states,
    lookUpItemsIsLoading: statesIsLoading,
    lookUpItemsIsFetching: statesIsFetching,
  } = useFetchLookUpData({ lookUpType: "State" });

  const {
    lookUpItems: cities,
    lookUpItemsIsLoading: citiesIsLoading,
    lookUpItemsIsFetching: citiesIsFetching,
  } = useFetchLookUpData({ lookUpType: "City" });

  const {
    lookUpItems: housingTypes,
    lookUpItemsIsLoading: housingTypesIsLoading,
    lookUpItemsIsFetching: housingTypesIsFetching,
  } = useFetchLookUpData({ lookUpType: "HousingType" });

  const {
    lookUpItems: maritalStatusItems,
    lookUpItemsIsLoading: maritalStatusItemsIsLoading,
    lookUpItemsIsFetching: maritalStatusItemsIsFetching,
  } = useFetchLookUpData({ lookUpType: "MaritialStatus" });

  // SELECT OPTIONS
  const genderOptions = optionsGenerator(genders, "lookUpID", "lookUpName");
  const educationOptions = optionsGenerator(
    educationTypes,
    "lookUpID",
    "lookUpName"
  );
  const stateOptions = optionsGenerator(states, "lookUpID", "lookUpName");
  const countryOptions = optionsGenerator(countries, "lookUpID", "lookUpName");
  const cityOptions = optionsGenerator(cities, "lookUpID", "lookUpName");
  const housingOptions = optionsGenerator(
    housingTypes,
    "lookUpID",
    "lookUpName"
  );
  const maritalStatusOptions = optionsGenerator(
    maritalStatusItems,
    "lookUpID",
    "lookUpName"
  );

  // HANDLE DATES
  useEffect(() => {
    setSelectedBirthDate(convertToPersianDate(form_data?.personBirthDate));
  }, [form_data?.personBirthDate]);

  useEffect(() => {
    setSelectedDeathDate(convertToPersianDate(form_data?.personDeathDate));
  }, [form_data?.personDeathDate]);

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

  // handle update retired person
  const onSubmit = async () => {
    try {
      // Adjusting for timezone difference
      let personDeathDate;
      let personBirthDate;

      if (selectedDeathDate) {
        personDeathDate = new Date(selectedDeathDate);
        personDeathDate.setMinutes(
          personDeathDate.getMinutes() - personDeathDate.getTimezoneOffset()
        );
      } else {
        personDeathDate = null;
      }

      if (selectedBirthDate) {
        personBirthDate = new Date(selectedBirthDate);
        personBirthDate.setMinutes(
          personBirthDate.getMinutes() - personBirthDate.getTimezoneOffset()
        );
      } else {
        personBirthDate = null;
      }

      const updateRes = await updateRetiredPerson({
        ...form_data,
        personNationalCode: convertToEnglishNumber(
          form_data.personNationalCode
        ),
        personCertificateNo: convertToEnglishNumber(
          form_data.personCertificateNo
        ),
        genderID: convertToEnglishNumber(form_data.genderID),
        personPhone: convertToEnglishNumber(form_data.personPhone),
        personCellPhone: convertToEnglishNumber(form_data.personCellPhone),
        personCellPhone2: convertToEnglishNumber(form_data.personCellPhone2),
        personRegion: parseInt(convertToEnglishNumber(form_data.personRegion)),
        educationTypeID: convertToEnglishNumber(form_data.educationTypeID),
        personCountryID: convertToEnglishNumber(form_data.personCountryID),
        personCityID: convertToEnglishNumber(form_data.personCityID),
        personStateID: convertToEnglishNumber(form_data.personStateID),
        personArea: parseInt(convertToEnglishNumber(form_data.personArea)),
        personPostalCode: convertToEnglishNumber(form_data.personPostalCode),
        housingTypeID: convertToEnglishNumber(form_data.housingTypeID),
        maritalStatusID: convertToEnglishNumber(form_data.maritalStatusID),
        personBirthDate,
        personDeathDate,
      }).unwrap();
      refetch();
      setEditable(false);
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

  // FIX CLOSE CALENDER BUG
  useCloseCalender(
    [birthDateCalenderRef, deathDateCalenderRef],
    [setIsBirthCalenderOpen, setIsDeathCalenderOpen]
  );

  const content = (
    <>
      {isLoading || isFetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem 10rem",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <section className="flex-col">
          <form
            method="POST"
            className="flex-col"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid grid--col-4">
              <div className="row-span-2 flex-row flex-row--grow-second">
                <div className="formPic">
                  <PersonOutlinedIcon sx={{ fontSize: 70, color: "#707070" }} />
                </div>

                <div className="flex-col flex-center flex-col--grow flex-col--gap-lg">
                  <div className="inputBox__form">
                    {errors.personFirstName && (
                      <span className="error-form">
                        {errors.personFirstName.message}
                      </span>
                    )}
                    <input
                      disabled={!editable}
                      type="text"
                      name="personFirstName"
                      id="personFirstName"
                      className="inputBox__form--input"
                      value={form_data?.personFirstName || ""}
                      required
                      {...register("personFirstName", {
                        required: "نام را وارد کنید",
                        pattern: {
                          value: /^[آ-ی\s]+$/,
                          message: "از حروف فارسی استفاده کنید",
                        },
                      })}
                    />
                    <label
                      htmlFor="personFirstName"
                      className="inputBox__form--label"
                    >
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
                      disabled={!editable}
                      type="text"
                      name="personLastName"
                      id="personLastName"
                      className="inputBox__form--input"
                      value={form_data?.personLastName || ""}
                      required
                      {...register("personLastName", {
                        required: "نام خانوادگی را وارد کنید",
                        pattern: {
                          value: /^[آ-ی\s]+$/,
                          message: "از حروف فارسی استفاده کنید",
                        },
                      })}
                    />
                    <label
                      htmlFor="personLastName"
                      className="inputBox__form--label"
                    >
                      <span>*</span> نام خانوادگی
                    </label>
                  </div>
                </div>
              </div>

              <div className="inputBox__form">
                {errors.personNationalCode && (
                  <span className="error-form">
                    {errors.personNationalCode.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  name="personNationalCode"
                  id="personNationalCode"
                  className="inputBox__form--input"
                  value={
                    convertToPersianNumber(form_data?.personNationalCode) ?? ""
                  }
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
                  htmlFor="personNationalCode"
                  className="inputBox__form--label"
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
                  disabled={!editable}
                  type="text"
                  name="personCertificateNo"
                  id="personCertificateNo"
                  className="inputBox__form--input"
                  value={
                    convertToPersianNumber(form_data?.personCertificateNo) ?? ""
                  }
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
                  htmlFor="personCertificateNo"
                  className="inputBox__form--label"
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
                  disabled={!editable}
                  type="text"
                  id="personFatherName"
                  name="personFatherName"
                  className="inputBox__form--input"
                  value={form_data?.personFatherName || ""}
                  required
                  {...register("personFatherName", {
                    pattern: {
                      value: /^[آ-ی\s]+$/,
                      message: "از حروف فارسی استفاده کنید",
                    },
                  })}
                />
                <label
                  htmlFor="personFatherName"
                  className="inputBox__form--label"
                >
                  نام پدر
                </label>
              </div>

              <div className="inputBox__form">
                <Controller
                  name="genderID"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <Select
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      options={genderOptions}
                      onChange={(val) => onChange(val ? val.value : null)}
                      isDisabled={!editable}
                      value={genderOptions.find(
                        (c) => c.value === form_data?.genderID
                      )}
                      isClearable={true}
                      placeholder={
                        <div className="react-select-placeholder">
                          <span>*</span> جنسیت
                        </div>
                      }
                      noOptionsMessage={selectSettings.noOptionsMessage}
                      loadingMessage={selectSettings.loadingMessage}
                      styles={selectStyles}
                      isLoading={isGenderItemsLoading || isGenderItemsFetching}
                    />
                  )}
                />

                <label
                  className={
                    form_data?.genderID
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  <span>*</span> جنسیت
                </label>

                {errors.genderID && (
                  <span className="error-form"> جنسیت اجباری است</span>
                )}
              </div>

              <div className="inputBox__form">
                <InputDatePicker
                  disabled={!editable}
                  value={selectedBirthDate}
                  defaultValue={null}
                  format={"jYYYY/jMM/jDD"}
                  onChange={handleBirthDateChange}
                  onOpenChange={handleBirthOpenChange}
                  suffixIcon={<CalenderIcon color="action" />}
                  open={isBirthCalenderOpen}
                  style={datePickerStyles}
                  wrapperStyle={datePickerWrapperStyles}
                  pickerProps={{
                    ref: birthDateCalenderRef,
                  }}
                />
                <div className="inputBox__form--readOnly-label">تاریخ تولد</div>
              </div>

              <div className="inputBox__form">
                {errors.personBirthPlace && (
                  <span className="error-form">
                    {errors.personBirthPlace.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  name="personBirthPlace"
                  id="personBirthPlace"
                  className="inputBox__form--input"
                  value={form_data?.personBirthPlace || ""}
                  required
                  {...register("personBirthPlace", {
                    pattern: {
                      value: /^[آ-ی\s]+$/,
                      message: "از حروف فارسی استفاده کنید",
                    },
                  })}
                />
                <label
                  htmlFor="personBirthPlace"
                  className="inputBox__form--label"
                >
                  محل تولد
                </label>
              </div>

              <div className="inputBox__form">
                {errors.personPreviousName && (
                  <span className="error-form">
                    {errors.personPreviousName.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  id="personPreviousName"
                  name="personPreviousName"
                  className="inputBox__form--input"
                  value={form_data?.personPreviousName || ""}
                  required
                  {...register("personPreviousName", {
                    pattern: {
                      value: /^[آ-ی\s]+$/,
                      message: "از حروف فارسی استفاده کنید",
                    },
                  })}
                />
                <label
                  htmlFor="personPreviousName"
                  className="inputBox__form--label"
                >
                  نام و نام خانوادگی قبلی
                </label>
              </div>

              <div
                className={
                  !editable
                    ? "checkboxContainer--disabled col-span-3"
                    : "checkboxContainer col-span-3"
                }
              >
                <p className="inputBox__form--readOnly-label">
                  وضعیت ایثارگری:
                </p>

                <div className="checkboxContainer__item">
                  <Checkbox
                    size="small"
                    color="success"
                    disabled={!editable}
                    checked={!!form_data?.personIsSacrificedFamily}
                    name="personIsSacrificedFamily"
                    id="personIsSacrificedFamily"
                    sx={{
                      padding: 0.5,
                    }}
                    {...register("personIsSacrificedFamily")}
                  />
                  <label
                    htmlFor="personIsSacrificedFamily"
                    className={
                      !editable
                        ? "checkboxContainer__label--disabled"
                        : "checkboxContainer__label"
                    }
                  >
                    خانواده شهید
                  </label>
                </div>

                <div className="checkboxContainer__item">
                  <Checkbox
                    size="small"
                    color="success"
                    disabled={!editable}
                    id="personIsWarrior"
                    name="personIsWarrior"
                    checked={!!form_data?.personIsWarrior}
                    sx={{
                      padding: 0.5,
                    }}
                    {...register("personIsWarrior")}
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
                  <Checkbox
                    size="small"
                    color="success"
                    disabled={!editable}
                    id="personIsChildOfSacrificed"
                    name="personIsChildOfSacrificed"
                    checked={!!form_data?.personIsChildOfSacrificed}
                    sx={{
                      padding: 0.5,
                    }}
                    {...register("personIsChildOfSacrificed")}
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
                  <Checkbox
                    size="small"
                    color="success"
                    disabled={!editable}
                    id="personIsValiant"
                    name="personIsValiant"
                    checked={!!form_data?.personIsValiant}
                    sx={{
                      padding: 0.5,
                    }}
                    {...register("personIsValiant")}
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
                  <Checkbox
                    size="small"
                    color="success"
                    disabled={!editable}
                    id="personIsSacrificed"
                    name="personIsSacrificed"
                    checked={!!form_data?.personIsSacrificed}
                    sx={{
                      padding: 0.5,
                    }}
                    {...register("personIsSacrificed")}
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
                  <Checkbox
                    size="small"
                    color="success"
                    disabled={!editable}
                    id="personIsCaptive"
                    name="personIsCaptive"
                    checked={!!form_data?.personIsCaptive}
                    sx={{
                      padding: 0.5,
                    }}
                    {...register("personIsCaptive")}
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
                    {convertToPersianNumber(form_data?.retiredID) || "-"}
                  </div>
                </div>
              </div>

              <div className="inputBox__form">
                {errors.personPhone && (
                  <span className="error-form">
                    {errors.personPhone.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  id="personPhone"
                  name="personPhone"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.personPhone) ?? ""}
                  required
                  {...register("personPhone", {
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "تلفن باید فقط شامل اعداد باشد",
                    },
                    minLength: {
                      value: 8,
                      message: "تلفن باید ۸ رقم باشد",
                    },
                    maxLength: {
                      value: 8,
                      message: "تلفن باید ۸ رقم باشد",
                    },
                  })}
                />
                <label htmlFor="personPhone" className="inputBox__form--label">
                  تلفن ثابت
                </label>
              </div>

              <div className="inputBox__form">
                {errors.personCellPhone && (
                  <span className="error-form">
                    {errors.personCellPhone.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  id="personCellPhone"
                  name="personCellPhone"
                  className="inputBox__form--input"
                  value={
                    convertToPersianNumber(form_data?.personCellPhone) ?? ""
                  }
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
                <label
                  htmlFor="personCellPhone"
                  className="inputBox__form--label"
                >
                  تلفن همراه
                </label>
              </div>

              <div className="inputBox__form">
                {errors.personCellPhone2 && (
                  <span className="error-form">
                    {errors.personCellPhone2.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  id="backupNum"
                  name="personCellPhone2"
                  className="inputBox__form--input"
                  value={
                    convertToPersianNumber(form_data?.personCellPhone2) ?? ""
                  }
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
                <label htmlFor="backupNum" className="inputBox__form--label">
                  تلفن پشتیبان
                </label>
              </div>

              <div className="inputBox__form">
                {errors.backupFirstName && (
                  <span className="error-form">
                    {errors.backupFirstName.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  id="backupName"
                  value={form_data?.backupFirstName || ""}
                  name="backupFirstName"
                  className="inputBox__form--input"
                  required
                  {...register("backupFirstName", {
                    pattern: {
                      value: /^[آ-ی\s]+$/,
                      message: "از حروف فارسی استفاده کنید",
                    },
                  })}
                />
                <label htmlFor="backupName" className="inputBox__form--label">
                  نام پشتیبان
                </label>
              </div>

              <div className="inputBox__form">
                {errors.backupLastName && (
                  <span className="error-form">
                    {errors.backupLastName.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  id="backupLname"
                  value={form_data?.backupLastName || ""}
                  name="backupLastName"
                  className="inputBox__form--input"
                  required
                  {...register("backupLastName", {
                    pattern: {
                      value: /^[آ-ی\s]+$/,
                      message: "از حروف فارسی استفاده کنید",
                    },
                  })}
                />
                <label htmlFor="backupLname" className="inputBox__form--label">
                  نام خانوادگی پشتیبان
                </label>
              </div>

              <div className="inputBox__form">
                {errors.personEmail && (
                  <span className="error-form">
                    {errors.personEmail.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  id="personEmail"
                  value={form_data?.personEmail || ""}
                  name="personEmail"
                  className="inputBox__form--input"
                  required
                  {...register("personEmail", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "ایمیل نامعتبر است",
                    },
                  })}
                />
                <label htmlFor="personEmail" className="inputBox__form--label">
                  پست الکترونیک
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
                      isDisabled={!editable}
                      value={educationOptions.find(
                        (c) => c.value === form_data?.educationTypeID
                      )}
                      isClearable={true}
                      placeholder={
                        <div className="react-select-placeholder">
                          مدرک تحصیلی
                        </div>
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
                <Controller
                  name="personCountryID"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Select
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      options={countryOptions}
                      onChange={(val) => onChange(val ? val.value : null)}
                      isDisabled={!editable}
                      value={countryOptions.find(
                        (c) => c.value === form_data?.personCountryID
                      )}
                      isClearable={true}
                      placeholder={
                        <div className="react-select-placeholder">کشور</div>
                      }
                      noOptionsMessage={selectSettings.noOptionsMessage}
                      loadingMessage={selectSettings.loadingMessage}
                      styles={selectStyles}
                      isLoading={countriesIsLoading || countriesIsFetching}
                      aria-label="country"
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
                      isDisabled={!editable}
                      value={stateOptions.find(
                        (c) => c.value === form_data?.personStateID
                      )}
                      isClearable={true}
                      placeholder={
                        <div className="react-select-placeholder">استان</div>
                      }
                      noOptionsMessage={selectSettings.noOptionsMessage}
                      loadingMessage={selectSettings.loadingMessage}
                      styles={selectStyles}
                      isLoading={statesIsLoading || statesIsFetching}
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
                      isDisabled={!editable}
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
                      isLoading={citiesIsLoading || citiesIsFetching}
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
                {errors.personRegion && (
                  <span className="error-form">
                    {errors.personRegion.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  id="personRegion"
                  value={convertToPersianNumber(form_data?.personRegion) ?? ""}
                  name="personRegion"
                  className="inputBox__form--input"
                  required
                  {...register("personRegion", {
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "منطقه باید فقط شامل اعداد باشد",
                    },
                  })}
                />
                <label htmlFor="personRegion" className="inputBox__form--label">
                  منطقه سکونت
                </label>
              </div>
              <div className="inputBox__form">
                {errors.personArea && (
                  <span className="error-form">
                    {errors.personArea.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  id="personArea"
                  value={convertToPersianNumber(form_data?.personArea) ?? ""}
                  name="personArea"
                  className="inputBox__form--input"
                  required
                  {...register("personArea", {
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "ناحیه باید فقط شامل اعداد باشد",
                    },
                  })}
                />
                <label htmlFor="personArea" className="inputBox__form--label">
                  ناحیه سکونت
                </label>
              </div>

              <div className="inputBox__form">
                {errors.personPostalCode && (
                  <span className="error-form">
                    {errors.personPostalCode.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  id="personPostalCode"
                  value={
                    convertToPersianNumber(form_data?.personPostalCode) ?? ""
                  }
                  name="personPostalCode"
                  className="inputBox__form--input"
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
                  htmlFor="personPostalCode"
                  className="inputBox__form--label"
                >
                  کد پستی
                </label>
              </div>

              <div className="inputBox__form">
                <Controller
                  name="housingTypeID"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Select
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      options={housingOptions}
                      onChange={(val) => onChange(val ? val.value : null)}
                      isDisabled={!editable}
                      value={housingOptions.find(
                        (c) => c.value === form_data?.housingTypeID
                      )}
                      name="housingTypeID"
                      isClearable={true}
                      placeholder={
                        <div className="react-select-placeholder">
                          وضعیت مسکن
                        </div>
                      }
                      noOptionsMessage={selectSettings.noOptionsMessage}
                      loadingMessage={selectSettings.loadingMessage}
                      styles={selectStyles}
                      isLoading={
                        housingTypesIsLoading || housingTypesIsFetching
                      }
                    />
                  )}
                />

                <label
                  className={
                    form_data?.housingTypeID
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  وضعیت مسکن
                </label>
              </div>

              <div className="inputBox__form">
                <Controller
                  name="maritalStatusID"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Select
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      options={maritalStatusOptions}
                      onChange={(val) => onChange(val ? val.value : null)}
                      value={maritalStatusOptions.find(
                        (c) => c.value === form_data?.maritalStatusID
                      )}
                      isDisabled={!editable}
                      name="maritalStatusID"
                      isClearable={true}
                      placeholder={
                        <div className="react-select-placeholder">
                          وضعیت تاهل
                        </div>
                      }
                      noOptionsMessage={selectSettings.noOptionsMessage}
                      loadingMessage={selectSettings.loadingMessage}
                      styles={selectStyles}
                      isLoading={
                        maritalStatusItemsIsLoading ||
                        maritalStatusItemsIsFetching
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
                <InputDatePicker
                  disabled={!editable}
                  value={selectedDeathDate}
                  format={"jYYYY/jMM/jDD"}
                  onChange={handleDeathDateChange}
                  onOpenChange={handleDeathOpenChange}
                  open={isDeathCalenderOpen}
                  suffixIcon={<CalenderIcon color="action" />}
                  style={datePickerStyles}
                  wrapperStyle={datePickerWrapperStyles}
                  pickerProps={{
                    ref: deathDateCalenderRef,
                  }}
                />
                <div className="inputBox__form--readOnly-label">تاریخ فوت</div>
              </div>

              <div className="inputBox__form col-span-3">
                {errors.personAddress && (
                  <span className="error-form">
                    {errors.personAddress.message}
                  </span>
                )}

                <textarea
                  disabled={!editable}
                  type="text"
                  id="personAddress"
                  value={convertToPersianNumber(form_data?.personAddress) || ""}
                  name="personAddress"
                  className="inputBox__form--input"
                  required
                  {...register("personAddress", {
                    pattern: {
                      value: /^[آ-ی۰-۹0-9\s]+$/,
                      message: "از حروف فارسی استفاده کنید",
                    },
                  })}
                ></textarea>
                <label
                  htmlFor="personAddress"
                  className="inputBox__form--label"
                >
                  نشانی
                </label>
              </div>

              <div className="inputBox__form row-col-span-3">
                {errors.personDescription && (
                  <span className="error-form">
                    {errors.personDescription.message}
                  </span>
                )}
                <textarea
                  disabled={!editable}
                  type="text"
                  id="personDescription"
                  value={
                    convertToPersianNumber(form_data?.personDescription) || ""
                  }
                  name="personDescription"
                  className="inputBox__form--input"
                  required
                  {...register("personDescription", {
                    pattern: {
                      value: /^[آ-ی۰-۹0-9\s]+$/,
                      message: "از حروف فارسی استفاده کنید",
                    },
                  })}
                ></textarea>
                <label
                  htmlFor="personDescription"
                  className="inputBox__form--label"
                >
                  توضیحات
                </label>
              </div>
            </div>

            <div style={{ marginRight: "auto" }} className="flex-row">
              <LoadingButton
                dir="ltr"
                endIcon={<SaveIcon />}
                loading={isUpdating}
                disabled={!editable}
                onClick={handleSubmit}
                variant="contained"
                type="submit"
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
          </form>
        </section>
      )}
    </>
  );

  return content;
}

export default RetiredPersonForm;
