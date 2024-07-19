// react imports
import { useState, useEffect, useRef } from "react";

// reduxt imports
import {
  useUpdateRetiredPersonMutation,
  useGetRetiredPersonQuery,
} from "../slices/retiredApiSlice.js";
import { setPersonDeathDate } from "../slices/retiredStateSlice.js";
import { useDispatch } from "react-redux";

// hooks
import {
  useFetchGenders,
  useFetchEducationTypes,
  useFetchCountries,
  useFetchStates,
  useFetchCities,
  useFetchHousingTypes,
  useFetchMaritalStatus,
} from "../hooks/useFetchLookUpData.js";
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

  // MAIN STATE
  const [personData, setPersonData] = useState({});

  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

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
      setPersonData(retiredPersonData?.itemList[0]);

      dispatch(
        setPersonDeathDate(retiredPersonData?.itemList[0]?.personDeathDate)
      );
    }

    return () => {
      dispatch(setPersonDeathDate(null));
    };
  }, [dispatch, isSuccess, retiredPersonData?.itemList]);

  // handle error
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  // GET LOOK UP DATA
  const { genders, isGenderItemsLoading, isGenderItemsFetching } =
    useFetchGenders();

  const { educationTypes, educationTypesIsLoading, educationTypesIsFetching } =
    useFetchEducationTypes();

  const { countries, countriesIsLoading, countriesIsFetching } =
    useFetchCountries();

  const { states, statesIsLoading, statesIsFetching } = useFetchStates();

  const { cities, citiesIsLoading, citiesIsFetching } = useFetchCities();

  const { housingTypes, housingTypesIsLoading, housingTypesIsFetching } =
    useFetchHousingTypes();

  const {
    maritalStatusItems,
    maritalStatusItemsIsLoading,
    maritalStatusItemsIsFetching,
  } = useFetchMaritalStatus();

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
    setSelectedBirthDate(convertToPersianDate(personData?.personBirthDate));
  }, [personData?.personBirthDate]);

  useEffect(() => {
    setSelectedDeathDate(convertToPersianDate(personData?.personDeathDate));
  }, [personData?.personDeathDate]);

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

  // HANDLE SELECT OPTION CHANGE
  const handleSelectOptionChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    if (selectedOption) {
      const { value } = selectedOption;
      setPersonData({ ...personData, [name]: value || "" });
    } else {
      setPersonData({ ...personData, [name]: null });
    }
  };

  // handle update retired person
  const handleUpdateRetired = async () => {
    try {
      // Adjusting for timezone difference
      let personDeathDate;
      let personBirthDate;

      if (selectedBirthDate) {
        personDeathDate = new Date(selectedDeathDate);
        personDeathDate.setMinutes(
          personDeathDate.getMinutes() - personDeathDate.getTimezoneOffset()
        );
      } else {
        personDeathDate = null;
      }

      if (selectedDeathDate) {
        personBirthDate = new Date(selectedBirthDate);
        personBirthDate.setMinutes(
          personBirthDate.getMinutes() - personBirthDate.getTimezoneOffset()
        );
      } else {
        personBirthDate = null;
      }

      const updateRes = await updateRetiredPerson({
        ...personData,
        personNationalCode: convertToEnglishNumber(
          personData.personNationalCode
        ),
        personCertificateNo: convertToEnglishNumber(
          personData.personCertificateNo
        ),
        genderID: convertToEnglishNumber(personData.genderID),
        personPhone: convertToEnglishNumber(personData.personPhone),
        personCellPhone: convertToEnglishNumber(personData.personCellPhone),
        personCellPhone2: convertToEnglishNumber(personData.personCellPhone2),
        personRegion: parseInt(convertToEnglishNumber(personData.personRegion)),
        educationTypeID: convertToEnglishNumber(personData.educationTypeID),
        personCountryID: convertToEnglishNumber(personData.personCountryID),
        personCityID: convertToEnglishNumber(personData.personCityID),
        personStateID: convertToEnglishNumber(personData.personStateID),
        personArea: parseInt(convertToEnglishNumber(personData.personArea)),
        personPostalCode: convertToEnglishNumber(personData.personPostalCode),
        housingTypeID: convertToEnglishNumber(personData.housingTypeID),
        maritalStatusID: convertToEnglishNumber(personData.maritalStatusID),
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
          <form method="POST" className="grid grid--col-3" noValidate>
            <div className="row-span-2 flex-row flex-row--grow-second">
              <div className="formPic">
                <PersonOutlinedIcon sx={{ fontSize: 70, color: "#707070" }} />
              </div>

              <div className="flex-col flex-center flex-col--grow flex-col--gap-lg">
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
              <input
                disabled={!editable}
                type="text"
                name="personNationalCode"
                id="personNationalCode"
                className="inputBox__form--input"
                value={
                  convertToPersianNumber(personData?.personNationalCode) ?? ""
                }
                onChange={handlePersonDataChange}
                required
              />
              <label
                htmlFor="personNationalCode"
                className="inputBox__form--label"
              >
                <span>*</span> کد ملی
              </label>
            </div>

            <div className="inputBox__form">
              <input
                disabled={!editable}
                type="text"
                name="personCertificateNo"
                id="personCertificateNo"
                className="inputBox__form--input"
                value={
                  convertToPersianNumber(personData?.personCertificateNo) ?? ""
                }
                onChange={handlePersonDataChange}
                required
              />
              <label
                htmlFor="personCertificateNo"
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
              <label
                htmlFor="personFatherName"
                className="inputBox__form--label"
              >
                نام پدر
              </label>
            </div>

            <div className="inputBox__form">
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={genderOptions}
                onChange={handleSelectOptionChange}
                isDisabled={!editable}
                value={genderOptions.find(
                  (item) => item.value === personData?.genderID
                )}
                name="genderID"
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

              <label
                className={
                  personData?.genderID
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
                <span>*</span> جنسیت
              </label>
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
              <label
                htmlFor="personBirthPlace"
                className="inputBox__form--label"
              >
                محل تولد
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
              <p className="inputBox__form--readOnly-label">وضعیت ایثارگری:</p>

              <div className="checkboxContainer__item">
                <Checkbox
                  size="small"
                  color="success"
                  disabled={!editable}
                  checked={!!personData?.personIsSacrificedFamily}
                  name="personIsSacrificedFamily"
                  id="personIsSacrificedFamily"
                  onChange={handleCheckBoxChange}
                  sx={{
                    padding: 0.5,
                  }}
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
                  checked={!!personData?.personIsWarrior}
                  onChange={handleCheckBoxChange}
                  sx={{
                    padding: 0.5,
                  }}
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
                  checked={!!personData?.personIsChildOfSacrificed}
                  onChange={handleCheckBoxChange}
                  sx={{
                    padding: 0.5,
                  }}
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
                  checked={!!personData?.personIsValiant}
                  onChange={handleCheckBoxChange}
                  sx={{
                    padding: 0.5,
                  }}
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
                  checked={!!personData?.personIsSacrificed}
                  onChange={handleCheckBoxChange}
                  sx={{
                    padding: 0.5,
                  }}
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
                  checked={!!personData?.personIsCaptive}
                  onChange={handleCheckBoxChange}
                  sx={{
                    padding: 0.5,
                  }}
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
                  {convertToPersianNumber(personData?.retiredID) || "-"}
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
                value={
                  convertToPersianNumber(personData?.personCellPhone) ?? ""
                }
                onChange={handlePersonDataChange}
                required
              />
              <label
                htmlFor="personCellPhone"
                className="inputBox__form--label"
              >
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
                value={
                  convertToPersianNumber(personData?.personCellPhone2) ?? ""
                }
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
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={educationOptions}
                onChange={handleSelectOptionChange}
                isDisabled={!editable}
                value={educationOptions.find(
                  (item) => item.value === personData?.educationTypeID
                )}
                name="educationTypeID"
                isClearable={true}
                placeholder={
                  <div className="react-select-placeholder">
                    <span>*</span> مدرک تحصیلی
                  </div>
                }
                noOptionsMessage={selectSettings.noOptionsMessage}
                loadingMessage={selectSettings.loadingMessage}
                styles={selectStyles}
                isLoading={educationTypesIsLoading || educationTypesIsFetching}
              />

              <label
                className={
                  personData?.educationTypeID
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
                <span>*</span> مدرک تحصیلی
              </label>
            </div>

            <div className="inputBox__form">
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={countryOptions}
                onChange={handleSelectOptionChange}
                isDisabled={!editable}
                value={countryOptions.find(
                  (item) => item.value === personData?.personCountryID
                )}
                name="personCountryID"
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

              <label
                className={
                  personData?.personCountryID
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
                isDisabled={!editable}
                value={stateOptions.find(
                  (item) => item.value === personData?.personStateID
                )}
                name="personStateID"
                isClearable={true}
                placeholder={
                  <div className="react-select-placeholder">استان</div>
                }
                noOptionsMessage={selectSettings.noOptionsMessage}
                loadingMessage={selectSettings.loadingMessage}
                styles={selectStyles}
                isLoading={statesIsLoading || statesIsFetching}
              />

              <label
                className={
                  personData?.personStateID
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
                isDisabled={!editable}
                value={cityOptions.find(
                  (item) => item.value === personData?.personCityID
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

              <label
                className={
                  personData?.personCityID
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
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
                منطقه سکونت
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
                value={
                  convertToPersianNumber(personData?.personPostalCode) ?? ""
                }
                name="personPostalCode"
                className="inputBox__form--input"
                onChange={handlePersonDataChange}
                required
              />
              <label
                htmlFor="personPostalCode"
                className="inputBox__form--label"
              >
                کد پستی
              </label>
            </div>

            <div className="inputBox__form">
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={housingOptions}
                onChange={handleSelectOptionChange}
                isDisabled={!editable}
                value={housingOptions.find(
                  (item) => item.value === personData?.housingTypeID
                )}
                name="housingTypeID"
                isClearable={true}
                placeholder={
                  <div className="react-select-placeholder">وضعیت مسکن</div>
                }
                noOptionsMessage={selectSettings.noOptionsMessage}
                loadingMessage={selectSettings.loadingMessage}
                styles={selectStyles}
                isLoading={housingTypesIsLoading || housingTypesIsFetching}
              />

              <label
                className={
                  personData?.housingTypeID
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
                وضعیت مسکن
              </label>
            </div>

            <div className="inputBox__form">
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={maritalStatusOptions}
                onChange={handleSelectOptionChange}
                value={maritalStatusOptions.find(
                  (item) => item.value === personData?.maritalStatusID
                )}
                isDisabled={!editable}
                name="maritalStatusID"
                isClearable={true}
                placeholder={
                  <div className="react-select-placeholder">وضعیت تاهل</div>
                }
                noOptionsMessage={selectSettings.noOptionsMessage}
                loadingMessage={selectSettings.loadingMessage}
                styles={selectStyles}
                isLoading={
                  maritalStatusItemsIsLoading || maritalStatusItemsIsFetching
                }
              />

              <label
                className={
                  personData?.maritalStatusID
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
              <label
                htmlFor="personDescription"
                className="inputBox__form--label"
              >
                توضیحات
              </label>
            </div>
          </form>

          <div style={{ marginRight: "auto" }} className="flex-row">
            <LoadingButton
              dir="ltr"
              endIcon={<SaveIcon />}
              loading={isUpdating}
              disabled={!editable}
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
      )}
    </>
  );

  return content;
}

export default RetiredPersonForm;
