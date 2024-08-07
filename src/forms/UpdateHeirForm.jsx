// react imports
import { useState, useEffect, useCallback, useRef } from "react";

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

  // HEIR OBJECT STATE
  const [heirObject, setHeirObject] = useState({});

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
      setHeirObject(heir);
    }

    return () => {
      setHeirObject({});
    };
  }, [isSuccess, heir, refetch]);

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
    if (heirObject.bankID) {
      fetchBankBranchData(heirObject.bankID);
    }
  }, [heirObject.bankID, fetchBankBranchData]);

  // GET & FETCH BANK BRANCH ON USER BANK SELECT
  useEffect(() => {
    if (heirObject.bankID) {
      fetchBankBranchData(heirObject.bankID);
    }
  }, [heirObject.bankID, fetchBankBranchData]);

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
    setSelectedBirthDate(convertToPersianDate(heirObject?.personBirthDate));
  }, [heirObject?.personBirthDate]);

  useEffect(() => {
    setSelectedBaseFinishDate(
      convertToPersianDate(heirObject?.personBaseFinishDate)
    );
  }, [heirObject?.personBaseFinishDate]);

  // HANDLE RELATED OBJECT CHANGE
  const handleHeirObjectChange = (e) => {
    const { name, value } = e.target;
    setHeirObject({
      ...heirObject,
      [name]: value,
    });
  };

  // HANDLE SELECT OPTION CHANGE
  const handleSelectOptionChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    if (selectedOption) {
      const { value } = selectedOption;
      setHeirObject({ ...heirObject, [name]: value || "" });
    } else {
      setHeirObject({ ...heirObject, [name]: null });
    }
  };

  const hadnleRefreshStatusHistoryTable = () => {
    refetchStatusHistory();
  };

  const handleUpdateHeir = async () => {
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
        ...heirObject,
        relationshipWithParentID: convertToEnglishNumber(
          heirObject?.relationshipWithParentID
        ),
        personNationalCode: convertToEnglishNumber(
          heirObject?.personNationalCode
        ),
        personCertificateNo: convertToEnglishNumber(
          heirObject?.personCertificateNo
        ),
        personBirthDate,
        maritalStatusID: convertToEnglishNumber(heirObject?.maritalStatusID),
        personPhone: convertToEnglishNumber(heirObject?.personPhone),
        personCellPhone: convertToEnglishNumber(heirObject?.personCellPhone),
        personRegion:
          parseInt(convertToEnglishNumber(heirObject?.personRegion)) || null,
        personArea:
          parseInt(convertToEnglishNumber(heirObject?.personArea)) || null,
        personCountryID: convertToEnglishNumber(heirObject?.personCountryID),
        personStateID: convertToEnglishNumber(heirObject?.personStateID),
        personCityID: convertToEnglishNumber(heirObject?.personCityID),
        personPostalCode: convertToEnglishNumber(heirObject?.personPostalCode),
        pensionaryStatusID: convertToEnglishNumber(
          heirObject?.pensionaryStatusID
        ),
        personBaseFinishDate,
        bankID: convertToEnglishNumber(heirObject?.bankID),
        bankBranchID: convertToEnglishNumber(heirObject?.bankBranchID),
        accountNo: convertToEnglishNumber(heirObject?.accountNo),
        insuranceCoef:
          parseFloat(convertToEnglishNumber(heirObject?.insuranceCoef)) || 0,
        insuranceAmount:
          parseFloat(convertToEnglishNumber(heirObject?.insuranceAmount)) || 0,
        ledgerCode:
          parseInt(convertToEnglishNumber(heirObject.ledgerCode)) || 0,
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
        <section className="formContainer-transparent formContainer--width-lg flex-col">
          <form method="POST" className="grid grid--col-3">
            <div className="inputBox__form">
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={relationOptions}
                onChange={handleSelectOptionChange}
                value={relationOptions.find(
                  (item) => item.value === heirObject?.relationshipWithParentID
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
                  heirObject?.relationshipWithParentID
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
                value={heirObject?.personFirstName || ""}
                onChange={handleHeirObjectChange}
                name="personFirstName"
                required
                id="personFirstName1"
              />
              <label
                className="inputBox__form--label"
                htmlFor="personFirstName1"
              >
                <span>*</span> نام
              </label>
            </div>
            <div className="inputBox__form">
              <input
                type="text"
                className="inputBox__form--input"
                name="personLastName"
                value={heirObject?.personLastName || ""}
                onChange={handleHeirObjectChange}
                required
                id="personLastName1"
              />
              <label
                className="inputBox__form--label"
                htmlFor="personLastName1"
              >
                <span>*</span> نام خانوادگی
              </label>
            </div>

            <div className="inputBox__form">
              <input
                type="text"
                className="inputBox__form--input"
                onChange={handleHeirObjectChange}
                value={
                  convertToPersianNumber(heirObject?.personNationalCode) ?? ""
                }
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
                onChange={handleHeirObjectChange}
                value={
                  convertToPersianNumber(heirObject?.personCertificateNo) || ""
                }
                required
                name="personCertificateNo"
                id="personCertificateNo2"
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
                onChange={handleHeirObjectChange}
                value={heirObject?.personFatherName || ""}
                required
                name="personFatherName"
                id="personFatherName1"
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
              <input
                type="text"
                className="inputBox__form--input"
                required
                name="personBirthPlace"
                onChange={handleHeirObjectChange}
                value={heirObject?.personBirthPlace || ""}
                id="personBirthPlace1"
              />
              <label
                className="inputBox__form--label"
                htmlFor="personBirthPlace1"
              >
                محل تولد
              </label>
            </div>
            <div className="inputBox__form">
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={maritialStatusOptions}
                onChange={handleSelectOptionChange}
                value={maritialStatusOptions.find(
                  (item) => item.value === heirObject?.maritalStatusID
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
                  heirObject?.maritalStatusID
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
                وضعیت تاهل
              </label>
            </div>

            <div className="inputBox__form">
              <input
                type="text"
                className="inputBox__form--input"
                value={convertToPersianNumber(heirObject?.personPhone) || ""}
                onChange={handleHeirObjectChange}
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
                onChange={handleHeirObjectChange}
                value={
                  convertToPersianNumber(heirObject?.personCellPhone) || ""
                }
                name="personCellPhone"
                required
                id="personCellPhone222"
              />
              <label
                className="inputBox__form--label"
                htmlFor="personCellPhone222"
              >
                تلفن همراه
              </label>
            </div>

            <div className="inputBox__form">
              <input
                type="text"
                className="inputBox__form--input"
                required
                onChange={handleHeirObjectChange}
                value={convertToPersianNumber(heirObject?.personArea) || ""}
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
                onChange={handleHeirObjectChange}
                value={convertToPersianNumber(heirObject?.personRegion) || ""}
                id="personRegion1"
              />
              <label className="inputBox__form--label" htmlFor="personRegion1">
                منطقه سکونت
              </label>
            </div>
            <div className="inputBox__form">
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={countryOptions}
                onChange={handleSelectOptionChange}
                value={countryOptions.find(
                  (item) => item.value === heirObject?.personCountryID
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

              <label
                className={
                  heirObject?.personCountryID
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
                  (item) => item.value === heirObject?.personStateID
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

              <label
                className={
                  heirObject?.personStateID
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
                  (item) => item.value === heirObject?.personCityID
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

              <label
                className={
                  heirObject?.personCityID
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
                onChange={handleHeirObjectChange}
                value={
                  convertToPersianNumber(heirObject?.personPostalCode) || ""
                }
                name="personPostalCode"
                id="personPostalCode1"
              />
              <label
                className="inputBox__form--label"
                htmlFor="personPostalCode1"
              >
                کد پستی
              </label>
            </div>
            <div className="inputBox__form">
              <input
                type="text"
                className="inputBox__form--input"
                required
                onChange={handleHeirObjectChange}
                value={heirObject?.personSpecialDisease || ""}
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
                onChange={handleHeirObjectChange}
                value={heirObject?.personAddress || ""}
                name="personAddress"
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
                value={heirObject?.personDescription || ""}
                onChange={handleHeirObjectChange}
                required
                name="personDescription"
                id="personDescription"
              ></textarea>
              <label
                className="inputBox__form--label"
                htmlFor="personDescription"
              >
                توضیحات
              </label>
            </div>
          </form>

          <div className="flex-col flex-center">
            <h4 className="title-secondary"> اطلاعات وظیفه بگیری </h4>
          </div>

          <form className="grid grid--col-4">
            <div className="inputBox__form">
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={pensionaryStatusOptions}
                onChange={handleSelectOptionChange}
                value={pensionaryStatusOptions.find(
                  (item) => item.value === heirObject?.pensionaryStatusID
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

              <label
                className={
                  heirObject?.pensionaryStatusID
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
                <span>*</span> وضعیت موظف
              </label>
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
                onChange={handleHeirObjectChange}
                value={convertToPersianNumber(heirObject?.heirID) || "-"}
                name="heirID"
                id="heirID"
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
                onChange={handleHeirObjectChange}
                value={
                  convertToPersianNumber(
                    convertToPersianDateFormatted(
                      heirObject?.pensionaryStartDate
                    )
                  ) || "-"
                }
                name="pensionaryStartDate"
                id="pensionaryStartDate"
              />
              <label
                className="inputBox__form--label"
                htmlFor="pensionaryStartDate"
              >
                تاریخ وظیفه بگیری
              </label>
            </div>
          </form>

          <div className="flex-col flex-center">
            <h5 className="title-secondary">تاریخچه وضعیت ها</h5>
          </div>

          <PensionaryStatusHistoryGrid
            statusHistoryTableData={statusHistoryTableData}
            isLoading={isStatusHistoryLoading}
            isFetching={isStatusHistoryFetching}
            handleRefresh={hadnleRefreshStatusHistoryTable}
          />

          <div className="Modal__header u-margin-top-sm">
            <h4 className="title-secondary">اطلاعات خویش فرمایی</h4>
          </div>

          <div className="flex-col flex-center">
            <h4 className="title-secondary"> اطلاعات بانکی وظیفه بگیر </h4>
          </div>

          <form method="POST" className="grid grid--col-4">
            <div className="inputBox__form">
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={bankOptions}
                onChange={handleSelectOptionChange}
                value={bankOptions.find(
                  (item) => item.value === heirObject?.bankID
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

              <label
                htmlFor="bankID"
                className={
                  heirObject?.bankID
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
                بانک
              </label>
            </div>

            <div className="inputBox__form">
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={bankBranchOptions}
                onChange={handleSelectOptionChange}
                isDisabled={
                  isBankBranchComboLoading ||
                  isBankBranchComboFetching ||
                  !heirObject.bankID
                }
                value={
                  bankBranchOptions.find(
                    (item) => item.value === heirObject?.bankBranchID
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

              <label
                htmlFor="bankBranchID"
                className={
                  heirObject?.bankBranchID
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
                شعبه
              </label>
            </div>
            <div className="inputBox__form">
              <input
                type="text"
                className="inputBox__form--input"
                onChange={handleHeirObjectChange}
                value={convertToPersianNumber(heirObject?.accountNo) || ""}
                required
                name="accountNo"
                id="accountNoHeir"
              />
              <label className="inputBox__form--label" htmlFor="accountNoHeir">
                حساب
              </label>
            </div>
            <div className="inputBox__form">
              <input
                type="text"
                className="inputBox__form--input"
                required
                onChange={handleHeirObjectChange}
                value={convertToPersianNumber(heirObject?.ledgerCode) || ""}
                name="ledgerCode"
                id="ledgerCodeHeir"
              />
              <label className="inputBox__form--label" htmlFor="ledgerCodeHeir">
                ردیف ورثه
              </label>
            </div>

            <div className="inputBox__form">
              <input
                type="text"
                className="inputBox__form--input"
                required
                onChange={handleHeirObjectChange}
                value={convertToPersianNumber(heirObject?.insuranceCoef) || ""}
                name="insuranceCoef"
                id="insuranceCoefHeir"
              />
              <label
                className="inputBox__form--label"
                htmlFor="insuranceCoefHeir"
              >
                ضریب بیمه
              </label>
            </div>
            <div className="inputBox__form">
              <input
                type="text"
                className="inputBox__form--input"
                required
                onChange={handleHeirObjectChange}
                value={
                  convertToPersianNumber(heirObject?.insuranceAmount) || ""
                }
                name="insuranceAmount"
                id="insuranceAmountHeir"
              />
              <label
                className="inputBox__form--label"
                htmlFor="insuranceAmountHeir"
              >
                بیمه تبعی
              </label>
            </div>
          </form>
          <div style={{ marginRight: "auto" }}>
            <LoadingButton
              dir="ltr"
              endIcon={<SaveIcon />}
              onClick={handleUpdateHeir}
              loading={isUpdating}
              variant="contained"
              color="success"
              sx={{ fontFamily: "sahel" }}
            >
              <span>ذخیره</span>
            </LoadingButton>
          </div>
        </section>
      )}
    </>
  );

  return content;
}

export default UpdateHeirForm;
