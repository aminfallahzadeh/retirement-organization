// react imports
import { useState, useEffect, useCallback } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import {
  useGetRelationshipQuery,
  useGetLookupDataQuery,
  useLazyGetLookupDataQuery,
  useGetPensionaryStatusQuery,
} from "../slices/sharedApiSlice.js";
import {
  useGetHeirQuery,
  useUpdateHeirMutation,
} from "../slices/heirApiSlice.js";

// mui imports
import { Box, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  Save as SaveIcon,
  CalendarTodayOutlined as CalenderIcon,
} from "@mui/icons-material";

// helpers
import {
  convertToPersianNumber,
  convertToPersianDate,
  convertToPersianDateFormatted,
  convertToEnglishNumber,
} from "../helper.js";

// libary imports
import { toast } from "react-toastify";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";

function UpdateHeirForm({ setShowEditHeirModal, personID }) {
  // LOOK UP STATES
  const [relationCombo, setRelationCombo] = useState([]);
  const [maritialStatusCombo, setMaritialStatusCombo] = useState([]);
  const [pensionaryStatusCombo, setPensionaryStatusCombo] = useState([]);
  const [bankCombo, setBankCombo] = useState([]);
  const [bankBranchCombo, setBankBranchCombo] = useState([]);
  const [countryCombo, setCountryCombo] = useState([]);
  const [stateCombo, setStateCombo] = useState([]);
  const [cityCombo, setCityCombo] = useState([]);

  // DATE STATES
  const [selectedBirthDate, setSelectedBirthDate] = useState(null);
  const [isBirthCalenderOpen, setIsBirthCalenderOpen] = useState(false);

  const [selectedBaseFinishDate, setSelectedBaseFinishDate] = useState(null);
  const [isBaseFinishDateCalenderOpen, setIsBaseFinishDateCalenderOpen] =
    useState(false);

  // HEIR OBJECT STATE
  const [heirObject, setHeirObject] = useState({});

  const [updateHeir, { isLoading: isUpdating }] = useUpdateHeirMutation();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const parentPersonID = searchParams.get("personID");

  // GET MAIN DATA
  const {
    data: heir,
    isSuccess,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetHeirQuery(personID);

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

  // GET LOOK UP DATA
  const { data: relationComboItems, isSuccess: isRelationComboSuccess } =
    useGetRelationshipQuery();

  const { data: maritialStatusComboItems, isSuccess: isMaritialComboSuccess } =
    useGetLookupDataQuery({ lookUpType: "MaritialStatus" });

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

  const [getLookupData, { isLoading: isBankBranchComboLoading }] =
    useLazyGetLookupDataQuery();

  const {
    data: pensionaryStatusComboItems,
    isSuccess: isPensionaryStatusComboSuccess,
  } = useGetPensionaryStatusQuery({ pensionaryStatusCategory: "H" });

  const {
    data: bankComboItems,
    isSuccess: isBankComboSuccess,
    isLoading: isBankComboLoading,
  } = useGetLookupDataQuery({
    lookUpType: "Bank",
  });

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

  useEffect(() => {
    if (isBankComboSuccess) {
      setBankCombo(bankComboItems.itemList);
    }
  }, [isBankComboSuccess, bankComboItems]);

  // GET & FETCH BANK BRANCH ON USER BANK SELECT
  useEffect(() => {
    if (heirObject.bankID) {
      fetchBankBranchData(heirObject.bankID);
    }
  }, [heirObject.bankID, fetchBankBranchData]);

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

  const handleUpdateHeir = async () => {
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
      }).unwrap();
      setShowEditHeirModal(false);
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
              <select
                type="text"
                className="inputBox__form--input"
                onChange={handleHeirObjectChange}
                value={heirObject?.relationshipWithParentID || " "}
                required
                name="relationshipWithParentID"
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
              <select
                className="inputBox__form--input"
                name="maritalStatusID"
                onChange={handleHeirObjectChange}
                value={heirObject?.maritalStatusID || " "}
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
              <label
                className="inputBox__form--label"
                htmlFor="maritalStatusID1"
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
              <select
                type="text"
                id="personCountry"
                name="personCountryID"
                value={heirObject?.personCountryID || " "}
                className="inputBox__form--input field"
                onChange={handleHeirObjectChange}
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
                value={heirObject?.personStateID || " "}
                onChange={handleHeirObjectChange}
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
                value={heirObject?.personCityID || " "}
                onChange={handleHeirObjectChange}
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

          <div className="Modal__header u-margin-top-sm">
            <h4 className="title-secondary"> اطلاعات وظیفه بگیری </h4>
          </div>

          <form className="grid grid--col-4">
            <div className="inputBox__form">
              <select
                className="inputBox__form--input"
                onChange={handleHeirObjectChange}
                value={
                  convertToEnglishNumber(heirObject?.pensionaryStatusID) || " "
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
              <label
                className="inputBox__form--label"
                htmlFor="pensionaryStatusID"
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
              <div className="inputBox__form--readOnly-label">
                تاریخ مبنای قطع سهم
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">
                  شماره وظیفه بگیری
                </div>
                <div className="inputBox__form--readOnly-content">
                  {convertToPersianNumber(heirObject?.heirID) || "-"}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">
                  تاریخ وظیفه بگیری
                </div>
                <div className="inputBox__form--readOnly-content">
                  {convertToPersianNumber(
                    convertToPersianDateFormatted(
                      heirObject?.pensionaryStartDate
                    )
                  ) || "-"}
                </div>
              </div>
            </div>
          </form>

          <div className="Modal__header u-margin-top-sm">
            <h4 className="title-secondary"> اطلاعات بانکی وظیفه بگیر </h4>
          </div>

          <form method="POST" className="grid grid--col-4">
            <div className="inputBox__form">
              <select
                disabled={isBankComboLoading}
                type="text"
                id="bankID"
                name="bankID"
                value={heirObject?.bankID || " "}
                onChange={handleHeirObjectChange}
                className="inputBox__form--input"
              >
                <option value=" ">انتخاب</option>
                {bankCombo.map((bank) => (
                  <option key={bank.lookUpID} value={bank.lookUpID}>
                    {bank.lookUpName}
                  </option>
                ))}
              </select>
              <label htmlFor="bankID" className="inputBox__form--label">
                بانک
              </label>
            </div>

            <div className="inputBox__form">
              <select
                disabled={
                  bankBranchCombo.length === 0 || isBankBranchComboLoading
                }
                type="text"
                id="bankBranchID"
                name="bankBranchID"
                value={heirObject?.bankBranchID || ""}
                onChange={handleHeirObjectChange}
                className="inputBox__form--input"
                required
              >
                <option value=" ">انتخاب</option>
                {bankBranchCombo.map((bankBranch) => (
                  <option key={bankBranch.lookUpID} value={bankBranch.lookUpID}>
                    {bankBranch.lookUpName}
                  </option>
                ))}
              </select>
              <label htmlFor="bankBranchID" className="inputBox__form--label">
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
