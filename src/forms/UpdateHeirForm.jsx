// react imports
import { useState, useEffect, useCallback, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

// redux imports
import { useGetAllPensionariesQuery } from "../slices/retiredApiSlice.js";
import { useLazyGetLookupDataQuery } from "../slices/sharedApiSlice.js";
import {
  useGetHeirQuery,
  useUpdateHeirMutation,
} from "../slices/heirApiSlice.js";

// hooks
import {
  useFetchLookUpData,
  useFetchPensionaryStatus,
  useFetchRelationship,
} from "../hooks/useFetchLookUpData";
import { useCloseCalender } from "../hooks/useCloseCalender";

// mui imports
import { Box, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  Save as SaveIcon,
  CalendarTodayOutlined as CalenderIcon,
} from "@mui/icons-material";

// components
import PensionaryStatusHistoryGrid from "../grids/PensionaryStatusHistoryGrid";

// libary imports
import { toast } from "react-toastify";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// helpers
import {
  convertToPersianNumber,
  convertToPersianDate,
  convertToPersianDateFormatted,
  convertToEnglishNumber,
} from "../helper.js";

// utils
import {
  selectStyles,
  selectSettings,
  optionsGenerator,
} from "../utils/reactSelect";
import { datePickerStyles, datePickerWrapperStyles } from "../utils/datePicker";

function UpdateHeirForm({
  setShowEditHeirModal,
  personID,
  refetch: gridRefetch,
}) {
  const birthCalenderRef = useRef(null);
  const endSubCalenderRef = useRef(null);
  const changeStatusCalenderRef = useRef(null);

  // LOOK UP STATES
  const [bankBranchCombo, setBankBranchCombo] = useState([]);

  // TABLE STATES
  const [statusHistoryTableData, setStatusHistoryTableData] = useState([]);

  // DATE STATES
  const [selectedBirthDate, setSelectedBirthDate] = useState(null);
  const [isBirthCalenderOpen, setIsBirthCalenderOpen] = useState(false);
  useState(null);
  const [selectedChangeStatusDate, setSelectedChangeStatusDate] =
    useState(null);

  const [selectedBaseFinishDate, setSelectedBaseFinishDate] = useState(null);
  const [isBaseFinishDateCalenderOpen, setIsBaseFinishDateCalenderOpen] =
    useState(false);
  const [isChangeStatusCalenderOpen, setIsChangeStatusCalenderOpen] =
    useState(false);

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

  const [updateHeir, { isLoading: isUpdating }] = useUpdateHeirMutation();

  const animatedComponents = makeAnimated();

  const searchParams = new URLSearchParams(location.search);
  const parentPersonID = searchParams.get("personID");

  const [
    getLookupData,
    {
      isLoading: isBankBranchComboLoading,
      isFetching: isBankBranchComboFetching,
    },
  ] = useLazyGetLookupDataQuery();

  // GET STATUS HISTORY
  const {
    data: statusHistory,
    isSuccess: isStatusHistorySuccess,
    isLoading: isStatusHistoryLoading,
    isFetching: isStatusHistoryFetching,
    refetch: refetchStatusHistory,
    error: statusHistoryError,
  } = useGetAllPensionariesQuery(personID);

  // GET MAIN DATA
  const {
    data: heir,
    isSuccess,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetHeirQuery(personID);

  // FETCH STATUS HISTORY
  useEffect(() => {
    refetchStatusHistory();
    if (isStatusHistorySuccess) {
      const mappedData = statusHistory?.itemList.map((item, index) => ({
        id: item.pensionaryID,
        pensionaryStatusRowNum: index + 1,
        pensionaryStatusName: item.pensionaryStatusName || "-",
        pensionaryStartdate:
          convertToPersianDate(item.pensionaryStartdate) || "-",
      }));
      setStatusHistoryTableData(mappedData);
    }

    return () => {
      setStatusHistoryTableData([]);
    };
  }, [refetchStatusHistory, isStatusHistorySuccess, statusHistory]);

  // FETCH MAIN DATA
  useEffect(() => {
    refetch();
    if (isSuccess) {
      Object.keys(heir).forEach((key) => {
        setValue(key, heir[key]);
      });
    }
  }, [isSuccess, heir, refetch, setValue]);

  // HANDLE ERROR
  useEffect(() => {
    if (error && error.status !== "FETCH_ERROR") {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  useEffect(() => {
    if (statusHistoryError) {
      console.log(statusHistoryError);
      toast.error(
        statusHistoryError?.data?.message || statusHistoryError.error,
        {
          autoClose: 2000,
        }
      );
    }
  }, [statusHistoryError]);

  // GET LOOK UP DATA
  const { relationships, relationshipIsLoading, relationshipIsFetching } =
    useFetchRelationship();

  const {
    lookUpItems: maritialStatusItems,
    lookUpItemsIsLoading: maritialStatusIsLoading,
    lookUpItemsIsFetching: maritialStatusIsFetching,
  } = useFetchLookUpData({ lookUpType: "MaritialStatus" });

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

  const {
    pensionaryStatus,
    pensionaryStatusIsLoading,
    pensionaryStatusIsFetching,
  } = useFetchPensionaryStatus({
    pensionaryStatusCategory: "H",
  });

  const {
    lookUpItems: bankItems,
    lookUpItemsIsLoading: bankItemsIsLoading,
    lookUpItemsIsFetching: bankItemsIsFetching,
  } = useFetchLookUpData({ lookUpType: "Bank" });

  // SELECT OPTIONS
  const relationOptions = optionsGenerator(
    relationships,
    "relationshipID",
    "relationshipName"
  );

  const maritialStatusOptions = optionsGenerator(
    maritialStatusItems,
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

  const pensionaryStatusOptions = optionsGenerator(
    pensionaryStatus,
    "pensionaryStatusID",
    "pensionaryStatusName"
  );

  const bankOptions = optionsGenerator(bankItems, "lookUpID", "lookUpName");
  const bankBranchOptions = optionsGenerator(
    bankBranchCombo,
    "lookUpID",
    "lookUpName"
  );

  // FETCH LOOK UP DATA
  const fetchBankBranchData = useCallback(
    async (bankID) => {
      try {
        const bankBranchRes = await getLookupData({
          lookUpType: "BankBranch",
          lookUpParentID: bankID,
        }).unwrap();
        setBankBranchCombo(bankBranchRes.itemList);
      } catch (err) {
        console.log(err);
      }
    },
    [getLookupData, setBankBranchCombo]
  );
  // GET & FETCH BANK BRANCH ON USER BANK SELECT
  useEffect(() => {
    if (form_data.bankID) {
      fetchBankBranchData(form_data.bankID);
    }
  }, [form_data.bankID, fetchBankBranchData]);

  // GET & FETCH BANK BRANCH ON USER BANK SELECT
  useEffect(() => {
    if (form_data.bankID) {
      fetchBankBranchData(form_data.bankID);
    }
  }, [form_data.bankID, fetchBankBranchData]);

  // CHANGE HANDLERS
  const handleBirthDateChange = (date) => {
    setSelectedBirthDate(date);
    setIsBirthCalenderOpen(false);
  };

  const handleBaseFinishDateChange = (date) => {
    setSelectedBaseFinishDate(date);
    setIsBaseFinishDateCalenderOpen(false);
  };

  const handleChangeStatusDateChange = (date) => {
    setSelectedChangeStatusDate(date);
    setIsChangeStatusCalenderOpen(false);
  };

  const handleChangeStatusOpenChange = (open) => {
    setIsChangeStatusCalenderOpen(open);
  };

  const handleBirthOpenChange = (open) => {
    setIsBirthCalenderOpen(open);
  };

  const handleBaseFinishDateOpenChange = (open) => {
    setIsBaseFinishDateCalenderOpen(open);
  };

  // DATE HANDLERS
  useEffect(() => {
    setSelectedBirthDate(convertToPersianDate(form_data?.personBirthDate));
  }, [form_data?.personBirthDate]);

  useEffect(() => {
    setSelectedBaseFinishDate(
      convertToPersianDate(form_data?.personBaseFinishDate)
    );
  }, [form_data?.personBaseFinishDate]);

  const hadnleRefreshStatusHistoryTable = () => {
    refetchStatusHistory();
  };

  const onSubmit = async () => {
    try {
      // Adjusting for timezone difference
      let personBirthDate;
      let pensionaryStartDate;
      let personBaseFinishDate;

      if (selectedBirthDate) {
        personBirthDate = new Date(selectedBirthDate);
        personBirthDate.setMinutes(
          personBirthDate.getMinutes() - personBirthDate.getTimezoneOffset()
        );
      } else {
        personBirthDate = null;
      }

      if (selectedChangeStatusDate) {
        pensionaryStartDate = new Date(selectedChangeStatusDate);
        pensionaryStartDate.setMinutes(
          pensionaryStartDate.getMinutes() -
            pensionaryStartDate.getTimezoneOffset()
        );
      } else {
        pensionaryStartDate = null;
      }

      if (selectedBaseFinishDate) {
        personBaseFinishDate = new Date(selectedBaseFinishDate);
        personBaseFinishDate.setMinutes(
          personBaseFinishDate.getMinutes() -
            personBaseFinishDate.getTimezoneOffset()
        );
      } else {
        personBaseFinishDate = null;
      }

      const updateRes = await updateHeir({
        ...form_data,
        relationshipWithParentID: convertToEnglishNumber(
          form_data?.relationshipWithParentID
        ),
        personNationalCode: convertToEnglishNumber(
          form_data?.personNationalCode
        ),
        personCertificateNo: convertToEnglishNumber(
          form_data?.personCertificateNo
        ),
        personBirthDate,
        maritalStatusID: convertToEnglishNumber(form_data?.maritalStatusID),
        personPhone: convertToEnglishNumber(form_data?.personPhone),
        personCellPhone: convertToEnglishNumber(form_data?.personCellPhone),
        personRegion:
          parseInt(convertToEnglishNumber(form_data?.personRegion)) || null,
        personArea:
          parseInt(convertToEnglishNumber(form_data?.personArea)) || null,
        personCountryID: convertToEnglishNumber(form_data?.personCountryID),
        personStateID: convertToEnglishNumber(form_data?.personStateID),
        personCityID: convertToEnglishNumber(form_data?.personCityID),
        personPostalCode: convertToEnglishNumber(form_data?.personPostalCode),
        pensionaryStatusID: convertToEnglishNumber(
          form_data?.pensionaryStatusID
        ),
        personBaseFinishDate,
        bankID: convertToEnglishNumber(form_data?.bankID),
        bankBranchID: convertToEnglishNumber(form_data?.bankBranchID),
        accountNo: convertToEnglishNumber(form_data?.accountNo),
        insuranceCoef:
          parseFloat(convertToEnglishNumber(form_data?.insuranceCoef)) || 0,
        insuranceAmount:
          parseFloat(convertToEnglishNumber(form_data?.insuranceAmount)) || 0,
        ledgerCode: parseInt(convertToEnglishNumber(form_data.ledgerCode)) || 0,
        parentPersonID,
        pensionaryStartDate,
      }).unwrap();
      setShowEditHeirModal(false);
      gridRefetch();
      toast.success(updateRes.message, {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        auroClose: 2000,
      });
    }
  };

  // FIX CLOSE CALENDER BUG
  useCloseCalender(
    [birthCalenderRef, endSubCalenderRef, changeStatusCalenderRef],
    [
      setIsBirthCalenderOpen,
      setIsBaseFinishDateCalenderOpen,
      setIsChangeStatusCalenderOpen,
    ]
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
        <section className="formContainer-transparent flex-col">
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
                      isLoading={
                        relationshipIsLoading || relationshipIsFetching
                      }
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
                <label
                  className="inputBox__form--label"
                  htmlFor="personFirstName1"
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
                  type="text"
                  className="inputBox__form--input"
                  name="personLastName"
                  value={form_data?.personLastName || ""}
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
                <label
                  className="inputBox__form--label"
                  htmlFor="personLastName1"
                >
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
                    convertToPersianNumber(form_data?.personCertificateNo) || ""
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
                  htmlFor="personCertificatetNo2"
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
                {errors.personBirthPlace && (
                  <span className="error-form">
                    {errors.personBirthPlace.message}
                  </span>
                )}
                <input
                  type="text"
                  className="inputBox__form--input"
                  name="personBirthPlace"
                  value={form_data?.personBirthPlace || ""}
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
                        <div className="react-select-placeholder">
                          وضعیت تاهل
                        </div>
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
                {errors.personPhone && (
                  <span className="error-form">
                    {errors.personPhone.message}
                  </span>
                )}

                <input
                  type="text"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.personPhone) || ""}
                  name="personPhone"
                  id="personPhone11"
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
                <label
                  className="inputBox__form--label"
                  htmlFor="personPhone11"
                >
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
                  type="text"
                  className="inputBox__form--input"
                  value={
                    convertToPersianNumber(form_data?.personCellPhone) || ""
                  }
                  name="personCellPhone"
                  id="personCellPhone222"
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
                  className="inputBox__form--label"
                  htmlFor="personCellPhone222"
                >
                  تلفن همراه
                </label>
              </div>

              <div className="inputBox__form">
                {errors.personArea && (
                  <span className="error-form">
                    {errors.personArea.message}
                  </span>
                )}

                <input
                  type="text"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.personArea) || ""}
                  name="personArea"
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
                {errors.personRegion && (
                  <span className="error-form">
                    {errors.personRegion.message}
                  </span>
                )}

                <input
                  type="text"
                  className="inputBox__form--input"
                  name="personRegion"
                  value={convertToPersianNumber(form_data?.personRegion) || ""}
                  id="personRegion1"
                  required
                  {...register("personRegion", {
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "منطقه باید فقط شامل اعداد باشد",
                    },
                  })}
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="personRegion1"
                >
                  منطقه سکونت
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
                      isLoading={
                        countryItemsIsLoading || countryItemsIsFetching
                      }
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
                  value={
                    convertToPersianNumber(form_data?.personPostalCode) || ""
                  }
                  name="personPostalCode"
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
                  value={form_data?.personSpecialDisease || ""}
                  name="personSpecialDisease"
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
                  <span className="error-form">
                    {errors.personAddress.message}
                  </span>
                )}
                <input
                  type="text"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.personAddress) || ""}
                  name="personAddress"
                  id="personAddress1"
                  required
                  {...register("personAddress", {
                    pattern: {
                      value: /^[آ-ی\s۰-۹]+$/,
                      message: "از حروف و اعداد فارسی استفاده کنید",
                    },
                  })}
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="personAddress1"
                >
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
                  value={
                    convertToPersianNumber(form_data?.personDescription) || ""
                  }
                  name="personDescription"
                  id="personDescription"
                  required
                  {...register("personDescription", {
                    pattern: {
                      value: /^[آ-ی\s۰-۹]+$/,
                      message: "از حروف و اعداد فارسی استفاده کنید",
                    },
                  })}
                ></textarea>
                <label
                  className="inputBox__form--label"
                  htmlFor="personDescription"
                >
                  توضیحات
                </label>
              </div>
            </div>

            <div className="flex-col flex-center">
              <h4 className="title-secondary"> اطلاعات وظیفه بگیری </h4>
            </div>

            <div className="grid grid--col-4">
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
                          <span>*</span> وضعیت موظف
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
                  <span>*</span> وضعیت موظف
                </label>

                {errors.pensionaryStatusID && (
                  <span className="error-form"> نسبت اجباری است</span>
                )}
              </div>

              <div className="inputBox__form">
                <InputDatePicker
                  value={selectedChangeStatusDate}
                  defaultValue={null}
                  onChange={handleChangeStatusDateChange}
                  onOpenChange={handleChangeStatusOpenChange}
                  format={"jYYYY/jMM/jDD"}
                  suffixIcon={<CalenderIcon color="action" />}
                  open={isChangeStatusCalenderOpen}
                  style={datePickerStyles}
                  wrapperStyle={datePickerWrapperStyles}
                  pickerProps={{
                    ref: changeStatusCalenderRef,
                  }}
                />
                <div className="inputBox__form--readOnly-label">
                  تاریخ تغییر وضعیت
                </div>
              </div>

              <div className="inputBox__form">
                <InputDatePicker
                  value={selectedBaseFinishDate}
                  onChange={handleBaseFinishDateChange}
                  format={"jYYYY/jMM/jDD"}
                  onOpenChange={handleBaseFinishDateOpenChange}
                  suffixIcon={<CalenderIcon color="action" />}
                  open={isBaseFinishDateCalenderOpen}
                  style={datePickerStyles}
                  wrapperStyle={datePickerWrapperStyles}
                  pickerProps={{
                    ref: endSubCalenderRef,
                  }}
                />
                <div className="inputBox__form--readOnly-label">تاریخ</div>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  disabled
                  value={convertToPersianNumber(form_data?.heirID) || "-"}
                  name="heirID"
                  id="heirID"
                  {...register("heirID")}
                />
                <label className="inputBox__form--label" htmlFor="heirID">
                  شماره وظیفه بگیری
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  disabled
                  value={
                    convertToPersianNumber(
                      convertToPersianDateFormatted(
                        form_data?.pensionaryStartDate
                      )
                    ) || "-"
                  }
                  name="pensionaryStartDate"
                  id="pensionaryStartDate"
                  {...register("pensionaryStartDate")}
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="pensionaryStartDate"
                >
                  تاریخ وظیفه بگیری
                </label>
              </div>
            </div>

            <div className="flex-col flex-center">
              <h5 className="title-secondary">تاریخچه وضعیت ها</h5>
            </div>

            <PensionaryStatusHistoryGrid
              statusHistoryTableData={statusHistoryTableData}
              isLoading={isStatusHistoryLoading}
              isFetching={isStatusHistoryFetching}
              handleRefresh={hadnleRefreshStatusHistoryTable}
            />

            <div className="flex-col flex-center">
              <h4 className="title-secondary"> اطلاعات بانکی وظیفه بگیر </h4>
            </div>
            <div className="grid grid--col-4">
              <div className="inputBox__form">
                <Controller
                  name="bankID"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Select
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      options={bankOptions}
                      onChange={(val) => onChange(val ? val.value : null)}
                      value={bankOptions.find(
                        (c) => c.value === form_data?.bankID
                      )}
                      id="bankID"
                      name="bankID"
                      isClearable={true}
                      placeholder={
                        <div className="react-select-placeholder">بانک</div>
                      }
                      noOptionsMessage={selectSettings.noOptionsMessage}
                      loadingMessage={selectSettings.loadingMessage}
                      styles={selectStyles}
                      isLoading={bankItemsIsLoading || bankItemsIsFetching}
                    />
                  )}
                />

                <label
                  htmlFor="bankID"
                  className={
                    form_data?.bankID
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  بانک
                </label>
              </div>

              <div className="inputBox__form">
                <Controller
                  name="bankBranchID"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Select
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      options={bankBranchOptions}
                      onChange={(val) => onChange(val ? val.value : null)}
                      isDisabled={
                        isBankBranchComboLoading ||
                        isBankBranchComboFetching ||
                        !form_data.bankID
                      }
                      value={
                        bankBranchOptions.find(
                          (c) => c.value === form_data?.bankBranchID
                        ) || null
                      }
                      id="bankBranchID"
                      name="bankBranchID"
                      isClearable={true}
                      placeholder={
                        <div className="react-select-placeholder">شعبه</div>
                      }
                      noOptionsMessage={selectSettings.noOptionsMessage}
                      loadingMessage={selectSettings.loadingMessage}
                      styles={selectStyles}
                      isLoading={
                        isBankBranchComboLoading || isBankBranchComboFetching
                      }
                    />
                  )}
                />

                <label
                  htmlFor="bankBranchID"
                  className={
                    form_data?.bankBranchID
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  شعبه
                </label>
              </div>

              <div className="inputBox__form">
                {errors.accountNo && (
                  <span className="error-form">{errors.accountNo.message}</span>
                )}

                <input
                  type="text"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.accountNo) || ""}
                  name="accountNo"
                  id="accountNoHeir"
                  required
                  {...register("accountNo", {
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "شماره حساب باید فقط شامل اعداد باشد",
                    },
                  })}
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="accountNoHeir"
                >
                  شماره حساب
                </label>
              </div>

              <div className="inputBox__form">
                {errors.ledgerCode && (
                  <span className="error-form">
                    {errors.ledgerCode.message}
                  </span>
                )}

                <input
                  type="text"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.ledgerCode) || ""}
                  name="ledgerCode"
                  id="ledgerCodeHeir"
                  required
                  {...register("ledgerCode", {
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "ردیف ورثه باید فقط شامل اعداد باشد",
                    },
                  })}
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="ledgerCodeHeir"
                >
                  ردیف ورثه
                </label>
              </div>

              <div className="inputBox__form">
                {errors.insuranceCoef && (
                  <span className="error-form">
                    {errors.insuranceCoef.message}
                  </span>
                )}
                <input
                  type="text"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.insuranceCoef) || ""}
                  name="insuranceCoef"
                  id="insuranceCoefHeir"
                  required
                  {...register("insuranceCoef", {
                    pattern: {
                      value: /^[۰-۹0-9]+([.,][۰-۹0-9]+)?$/,
                      message: "از اعداد یا اعشار استفاده کنید",
                    },
                  })}
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="insuranceCoefHeir"
                >
                  ضریب بیمه
                </label>
              </div>

              <div className="inputBox__form">
                {errors.insuranceAmount && (
                  <span className="error-form">
                    {errors.insuranceAmount.message}
                  </span>
                )}

                <input
                  type="text"
                  className="inputBox__form--input"
                  value={
                    convertToPersianNumber(form_data?.insuranceAmount) || ""
                  }
                  name="insuranceAmount"
                  id="insuranceAmountHeir"
                  required
                  {...register("insuranceAmount", {
                    pattern: {
                      value: /^[آ-ی\s]+$/,
                      message: "از حروف فارسی استفاده کنید",
                    },
                  })}
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="insuranceAmountHeir"
                >
                  بیمه تبعی
                </label>
              </div>
            </div>
            <div style={{ marginRight: "auto" }}>
              <LoadingButton
                dir="ltr"
                endIcon={<SaveIcon />}
                onClick={handleSubmit}
                type="submit"
                loading={isUpdating}
                variant="contained"
                color="success"
                sx={{ fontFamily: "sahel" }}
              >
                <span>ذخیره</span>
              </LoadingButton>
            </div>
          </form>
        </section>
      )}
    </>
  );

  return content;
}

export default UpdateHeirForm;
