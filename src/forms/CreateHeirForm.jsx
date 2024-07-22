// react imports
import { useState, useEffect, useCallback, useRef } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports

import { useInsertHeirMutation } from "../slices/heirApiSlice";
import { useLazyGetLookupDataQuery } from "../slices/sharedApiSlice.js";

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

function CreateHeirForm({ setShowCreateHeirModal }) {
  const birthCalenderRef = useRef(null);
  const endSubCalenderRef = useRef(null);

  // DATE STATES
  const [selectedBirthDate, setSelectedBirthDate] = useState(null);
  const [isBirthCalenderOpen, setIsBirthCalenderOpen] = useState(false);
  const [selectedBaseFinishDate, setSelectedBaseFinishDate] = useState(null);
  const [isBaseFinishDateCalenderOpen, setIsBaseFinishDateCalenderOpen] =
    useState(false);

  // HEIR STATE
  const [heirObject, setHeirObject] = useState({});

  const [insertHeir, { isLoading }] = useInsertHeirMutation();

  // LOOP UP STATES
  const [bankBranchCombo, setBankBranchCombo] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const parentPersonID = searchParams.get("personID");
  const animatedComponents = makeAnimated();

  const [
    getLookupData,
    {
      isLoading: isBankBranchComboLoading,
      isFetching: isBankBranchComboFetching,
    },
  ] = useLazyGetLookupDataQuery();

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

  const pensionaryStatusOptions = optionsGenerator(
    pensionaryStatus,
    "pensionaryStatusID",
    "pensionaryStatusName"
  );

  const stateOptions = optionsGenerator(stateItems, "lookUpID", "lookUpName");

  const cityOptions = optionsGenerator(cityItems, "lookUpID", "lookUpName");

  const bankOptions = optionsGenerator(bankItems, "lookUpID", "lookUpName");
  const bankBranchOptions = optionsGenerator(
    bankBranchCombo,
    "lookUpID",
    "lookUpName"
  );

  const fetchBankBranchData = useCallback(
    async (bankID) => {
      try {
        const bankBranchRes = await getLookupData({
          lookUpType: "BankBranch",
          lookUpParentID: convertToEnglishNumber(bankID),
        }).unwrap();
        setBankBranchCombo(bankBranchRes.itemList);
      } catch (err) {
        console.log(err);
      }
    },
    [getLookupData, setBankBranchCombo]
  );

  // GET BANK BRANCH ON USER BANK SELECT
  useEffect(() => {
    if (heirObject.bankID) {
      fetchBankBranchData(heirObject.bankID);
    }
  }, [heirObject.bankID, fetchBankBranchData]);

  // DATE HANDLERS
  const handleBirthDateChange = (date) => {
    setSelectedBirthDate(date);
    setIsBirthCalenderOpen(false);
  };

  const handleBaseFinishDateChange = (date) => {
    setSelectedBaseFinishDate(date);
    setIsBaseFinishDateCalenderOpen(false);
  };

  const handleBirthOpenChange = (open) => {
    setIsBirthCalenderOpen(open);
  };

  const handleBaseFinishDateOpenChange = (open) => {
    setIsBaseFinishDateCalenderOpen(open);
  };

  // HANDLE HEIR OBJECT CHANGE
  const handleHeirObjectChange = (e) => {
    const { name, value } = e.target;
    setHeirObject({
      ...heirObject,
      [name]: convertToPersianNumber(value),
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

  const handleInsertHeir = async () => {
    try {
      // Adjusting for timezone difference
      let personBirthDate;
      let personBaseFinishDate;

      if (selectedBirthDate) {
        personBirthDate = new Date(selectedBirthDate);
        personBirthDate.setMinutes(
          personBirthDate.getMinutes() - personBirthDate.getTimezoneOffset()
        );
      } else {
        personBirthDate = null;
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

      const insertRes = await insertHeir({
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
      }).unwrap();
      setShowCreateHeirModal(false);
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
    [birthCalenderRef, endSubCalenderRef],
    [setIsBirthCalenderOpen, setIsBaseFinishDateCalenderOpen]
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
            name="personFirstName"
            value={heirObject?.personFirstName || ""}
            onChange={handleHeirObjectChange}
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
            value={heirObject?.personLastName || ""}
            onChange={handleHeirObjectChange}
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
            name="personNationalCode"
            value={heirObject?.personNationalCode || ""}
            onChange={handleHeirObjectChange}
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
            value={heirObject?.personCertificateNo || ""}
            onChange={handleHeirObjectChange}
            required
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
            value={heirObject?.personFatherName || ""}
            onChange={handleHeirObjectChange}
            required
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
          <input
            type="text"
            className="inputBox__form--input"
            value={heirObject?.personBirthPlace || ""}
            onChange={handleHeirObjectChange}
            required
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
            required
            value={heirObject?.personPhone || ""}
            onChange={handleHeirObjectChange}
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
            name="personCellPhone"
            value={heirObject?.personCellPhone || ""}
            onChange={handleHeirObjectChange}
            required
            id="personCellPhone222"
          />
          <label className="inputBox__form--label" htmlFor="personCellPhone222">
            تلفن همراه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            value={heirObject?.personArea}
            onChange={handleHeirObjectChange}
            required
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
            value={heirObject?.personRegion}
            onChange={handleHeirObjectChange}
            required
            name="personRegion"
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
            placeholder={<div className="react-select-placeholder">کشور</div>}
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
            placeholder={<div className="react-select-placeholder">استان</div>}
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
            placeholder={<div className="react-select-placeholder">شهر</div>}
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
            name="personPostalCode"
            value={heirObject?.personPostalCode || ""}
            onChange={handleHeirObjectChange}
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
            name="personSpecialDisease"
            value={heirObject?.personSpecialDisease || ""}
            onChange={handleHeirObjectChange}
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
            value={heirObject?.personAddress || ""}
            onChange={handleHeirObjectChange}
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
            onChange={handleHeirObjectChange}
            value={heirObject?.personDescription || ""}
            required
            name="personDescription"
            id="personDescription"
          ></textarea>
          <label className="inputBox__form--label" htmlFor="personDescription">
            توضیحات
          </label>
        </div>
      </form>

      <div className="Modal__header u-margin-top-sm">
        <h4 className="title-secondary"> اطلاعات وظیفه بگیری </h4>
      </div>

      <form className="grid grid--col-4" noValidate>
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
            isLoading={pensionaryStatusIsLoading || pensionaryStatusIsFetching}
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
          <div className="inputBox__form--readOnly-label">
            تاریخ مبنای قطع سهم
          </div>
        </div>
      </form>

      <div className="Modal__header u-margin-top-sm">
        <h4 className="title-secondary"> اطلاعات بانکی وظیفه بگیر </h4>
      </div>

      <form method="POST" className="grid grid--col-4" noValidate>
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
            placeholder={<div className="react-select-placeholder">بانک</div>}
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
            placeholder={<div className="react-select-placeholder">شعبه</div>}
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
            isLoading={isBankBranchComboLoading || isBankBranchComboFetching}
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
            required
            onChange={handleHeirObjectChange}
            value={heirObject?.accountNo || ""}
            name="accountNo"
            id="accountNoHeir"
          />
          <label className="inputBox__form--label" htmlFor="accountNoHeir">
            شماره حساب
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleHeirObjectChange}
            value={heirObject?.ledgerCode || ""}
            required
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
            onChange={handleHeirObjectChange}
            name="insuranceCoef"
            value={heirObject?.insuranceCoef || ""}
            required
            id="insuranceCoefHeir"
          />
          <label className="inputBox__form--label" htmlFor="insuranceCoefHeir">
            ضریب بیمه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleHeirObjectChange}
            value={heirObject?.insuranceAmount || ""}
            required
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
          onClick={handleInsertHeir}
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

export default CreateHeirForm;
