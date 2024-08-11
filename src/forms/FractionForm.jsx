// react imports
import { useState, useRef, useEffect } from "react";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { setFractionType } from "../slices/fractionDataSlice";
import { setData } from "../slices/calculateFractionDataSlice";
import { useInsertFractionExcelMutation } from "../slices/fractionApiSlice";
import { useLazyGetPersonsQuery } from "../slices/personApiSlice";

// hooks
import { useCloseCalender } from "../hooks/useCloseCalender";
import {
  useFetchOrganizations,
  useFetchFractionType,
  useFetchPersonnelStatementOffType,
} from "../hooks/useFetchLookUpData";

// mui imports
import {
  CalendarTodayOutlined as CalenderIcon,
  FactCheckOutlined as CheckIcon,
  DeleteOutline as RemoveIcon,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  Box,
  LinearProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  UploadOutlined as UploadIcon,
  ArchiveOutlined as ArchiveIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

// components
import ArchiveTree from "../components/ArchiveTree";

// library imports
import { toast } from "react-toastify";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import * as XLSX from "xlsx";

// helpers
import {
  convertToPersianNumber,
  convertToEnglishNumber,
  findById,
} from "../helper";

// utils
import {
  selectStyles,
  selectSettings,
  optionsGenerator,
} from "../utils/reactSelect";
import { datePickerStyles, datePickerWrapperStyles } from "../utils/datePicker";

function FractionForm() {
  // EXCEL FILE UPLOAD REF
  const excelFileUploadRef = useRef(null);

  // CONTROLL STATES
  const [isPeronIDAvailable, setIsPersonIDAvailable] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  // CALENEDER REF
  const letterCalenderRef = useRef(null);
  const paymenrCalenderRef = useRef(null);

  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();

  // EXPERIMENTAL
  const [frMode, setFrMode] = useState("group");

  // MAIN STATES
  const { data } = useSelector((state) => state.calculateFractionData);

  // EXCEL STATES
  const [uploadProgress, setUploadProgress] = useState(0);
  const [excelFile, setExcelFile] = useState(null);

  // DATE STATES
  const [selectedLetterDate, setSelectedLetterDate] = useState(null);
  const [selectedPaymentDate, setSelectedPaymentDate] = useState(null);

  // CALENDER STATES
  const [isLetterDateCalenderOpen, setIsLetterDateCalenderOpen] =
    useState(false);
  const [isPaymentCalenderOpen, setIsPaymentCalenderOpen] = useState(false);

  // ACCESS QUERIES
  const [
    insertExcel,
    { isLoading: isJariLoading, isFetching: isJariFetching },
  ] = useInsertFractionExcelMutation();

  const [
    searchPersons,
    { isLoading: isPersonsLoading, isFetching: isPersonsFetching },
  ] = useLazyGetPersonsQuery();

  // GET LOOKUP DATA
  const { organizations, organizationIsLoading, organizationIsFetching } =
    useFetchOrganizations({});

  const { fractionTypes, fractionTypesIsLoading, fractionTypesIsFetching } =
    useFetchFractionType();

  const {
    personnelStatementOffTypes,
    personnelStatementOffTypesIsLoading,
    personnelStatementOffTypesIsFetching,
  } = useFetchPersonnelStatementOffType();

  // SELECT OPTIONS
  const offTypesOptions = optionsGenerator(
    personnelStatementOffTypes,
    "personnelStatementOffTypeID",
    "personnelStatementOffTypeName"
  );

  const fractionTypesOptions = optionsGenerator(
    fractionTypes,
    "fractionTypeid",
    "fractionTypeName"
  );

  const organizationOptions = optionsGenerator(
    organizations,
    "organizationID",
    "organizationName"
  );

  const paymentTypeOptions = [
    { value: "d621c0cd-1381-44d9-9d59-a1c772931080", label: "چک" },
    { value: "39363fd7-5dc7-4195-89f0-5eb62c667127", label: "فیش" },
  ];

  // EXTRACT COEFS
  useEffect(() => {
    if (data.personnelStatementOffTypeID) {
      const selected = findById(
        personnelStatementOffTypes,
        data.personnelStatementOffTypeID,
        "personnelStatementOffTypeID"
      );

      dispatch(
        setData({
          ...data,
          personelPercent: selected?.fractionPersonnelCoef,
          organazationPercent: selected?.fractionOrganizationCoef,
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.personnelStatementOffTypeID, dispatch, personnelStatementOffTypes]);

  // DATE HANDLER
  const handleLetterCalenderOpenChange = (open) => {
    setIsLetterDateCalenderOpen(open);
  };

  const handlePaymentCalenderOpenChange = (open) => {
    setIsPaymentCalenderOpen(open);
  };

  const handleLetterDateChange = (date) => {
    if (!date) {
      console.log("Date is null or undefined");
      dispatch(setData({ ...data, letterDate: null }));
      setSelectedLetterDate(null);
      setIsLetterDateCalenderOpen(false);
      return;
    }

    let letterDate = new Date(date);
    console.log("Converted letterDate:", letterDate);

    if (isNaN(letterDate.getTime())) {
      console.error("Invalid date value");
      dispatch(setData({ ...data, letterDate: null }));
      setSelectedLetterDate(null);
      setIsLetterDateCalenderOpen(false);
      return;
    }

    letterDate.setMinutes(
      letterDate.getMinutes() - letterDate.getTimezoneOffset()
    );
    console.log("Adjusted letterDate:", letterDate);

    dispatch(setData({ ...data, letterDate: letterDate.toDateString() }));
    setSelectedLetterDate(date);
    setIsLetterDateCalenderOpen(false);
  };

  const handlePaymenrDateChange = (date) => {
    console.log("Selected date:", date);

    if (!date) {
      console.log("Date is null or undefined");
      dispatch(setData({ ...data, paymentDate: null }));
      setSelectedPaymentDate(null);
      setIsPaymentCalenderOpen(false);
      return;
    }

    let paymentDate = new Date(date);
    console.log("Converted paymentDate:", paymentDate);

    if (isNaN(paymentDate.getTime())) {
      console.error("Invalid date value");
      dispatch(setData({ ...data, paymentDate: null }));
      setSelectedPaymentDate(null);
      setIsPaymentCalenderOpen(false);
      return;
    }

    paymentDate.setMinutes(
      paymentDate.getMinutes() - paymentDate.getTimezoneOffset()
    );
    console.log("Adjusted paymentDate:", paymentDate);

    dispatch(setData({ ...data, paymentDate: paymentDate.toDateString() }));
    setSelectedPaymentDate(date);
    setIsPaymentCalenderOpen(false);
  };

  const handleFrTypeChange = (e) => {
    dispatch(setFractionType(e.target.value));
    setFrMode(e.target.value);
  };

  // HANDLE MAIN DATA CHANGE
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    dispatch(setData({ ...data, [name]: value }));
  };

  // HANDLE SELECT OPTION CHANGE
  const handleSelectOptionChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    if (selectedOption) {
      const { value } = selectedOption;
      dispatch(setData({ ...data, [name]: value || "" }));
    } else {
      dispatch(setData({ ...data, [name]: null }));
    }
  };

  const handleInsertExcel = async (data, type) => {
    console.log(type);
    try {
      const res = await insertExcel({ data, type }).unwrap();
      toast.success(res.message, {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  const handleSearchPerson = async () => {
    try {
      const searchRes = await searchPersons({
        personNationalCode: convertToEnglishNumber(data.personNationalCode),
      }).unwrap();
      if (searchRes.itemList.length === 0) {
        toast.error("نتیجه ای یافت نشد", {
          autoClose: 2000,
        });
        return;
      } else if (searchRes.itemList.length > 1) {
        toast.error("کد ملی معتبر نمیباشد!", {
          autoClose: 2000,
        });
        return;
      }

      const personID = searchRes.itemList[0].personID;

      dispatch(
        setData({
          ...data,
          personFirstName: searchRes.itemList[0].personFirstName,
          personLastName: searchRes.itemList[0].personLastName,
          personID: searchRes.itemList[0].personID,
        })
      );

      // Update URL params
      const params = new URLSearchParams(window.location.search);
      params.set("personID", personID);
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`
      );

      setIsPersonIDAvailable(true);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  const handleExcelFileUpload = () => {
    excelFileUploadRef.current.click();
  };

  const handleRemoveExcelFile = () => {
    setExcelFile(null);
    setUploadProgress(0);
  };

  const handleArchiveModalOpenChange = () => {
    setIsArchiveOpen(!isArchiveOpen);
  };

  const handleExcelFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setExcelFile(file);

      // Event handler for progress
      reader.onprogress = (event) => {
        const progress = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(progress);
      };

      reader.onload = (event) => {
        const excel = new Uint8Array(event.target.result);
        const workbook = XLSX.read(excel, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // EXTRACT HEADERS AND ROWS
        const headers = json[0];
        const rows = json.slice(1);

        // CREATE DATA OBJECT
        const items = rows
          .map((row) => {
            if (
              row.every(
                (cell) => cell === null || cell === undefined || cell === ""
              )
            ) {
              return null;
            }
            const obj = {};
            row.forEach((cell, index) => {
              obj[headers[index]] = convertToEnglishNumber(
                cell ? cell.toString() : ""
              );
            });
            obj["saved"] = true;
            obj["letterNO"] = convertToEnglishNumber(data.letterNO);
            obj["letterDate"] = new Date(data.letterDate);
            obj["paymentDate"] = new Date(data.paymentDate);
            obj["paymentTypeID"] = data.paymentTypeID;
            obj["paymentNO"] = convertToEnglishNumber(data.paymentNO);
            return obj;
          })
          .filter((item) => item !== null);
        const type = data?.fractionTypeID;
        handleInsertExcel(items, type);
      };

      reader.onloadend = () => {
        setTimeout(() => {
          setUploadProgress(0);
        }, 2000);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // FIX CLOSE CALENDER
  useCloseCalender(
    [letterCalenderRef, paymenrCalenderRef],
    [setIsLetterDateCalenderOpen, setIsPaymentCalenderOpen]
  );

  const content = (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-5" noValidate>
        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            options={fractionTypesOptions}
            components={animatedComponents}
            name="fractionTypeID"
            value={fractionTypesOptions.find(
              (item) => item.value === data?.relationshipWithParentID
            )}
            onChange={handleSelectOptionChange}
            isLoading={fractionTypesIsLoading || fractionTypesIsFetching}
            isClearable={true}
            placeholder={
              <div className="react-select-placeholder">نوع کسور</div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
          />

          <label
            className={
              data?.fractionTypeID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            نوع کسور
          </label>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input
              type="radio"
              id="groupTyped"
              name="frType"
              value="group"
              onChange={handleFrTypeChange}
              checked={frMode === "group"}
            />
            <label htmlFor="groupTyped" className="checkboxContainer__label">
              سازمانی
            </label>
          </div>

          <div className="checkboxContainer__item">
            <input
              type="radio"
              id="soloTyped"
              name="frType"
              value="solo"
              onChange={handleFrTypeChange}
            />
            <label htmlFor="soloTyped" className="checkboxContainer__label">
              انفرادی
            </label>
          </div>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleDataChange}
            name="letterNO"
            value={convertToPersianNumber(data.letterNO) || ""}
            required
            id="letterNO"
          />
          <label className="inputBox__form--label" htmlFor="letterNO">
            شماره نامه
          </label>
        </div>

        <div className="inputBox__form">
          <InputDatePicker
            onChange={handleLetterDateChange}
            value={selectedLetterDate}
            onOpenChange={handleLetterCalenderOpenChange}
            format={"jYYYY/jMM/jDD"}
            suffixIcon={<CalenderIcon color="action" />}
            open={isLetterDateCalenderOpen}
            style={datePickerStyles}
            wrapperStyle={datePickerWrapperStyles}
            placement="bottom"
            pickerProps={{
              ref: letterCalenderRef,
            }}
          />
          <div className="inputBox__form--readOnly-label">تاریخ نامه</div>
        </div>

        <div>&nbsp;</div>

        {frMode === "solo" && (
          <>
            <div className="inputBox__form">
              <Select
                closeMenuOnSelect={true}
                options={offTypesOptions}
                components={animatedComponents}
                onChange={handleSelectOptionChange}
                value={offTypesOptions.find(
                  (item) => item.value === data?.relationshipWithParentID
                )}
                name="personnelStatementOffTypeID"
                isLoading={
                  personnelStatementOffTypesIsLoading ||
                  personnelStatementOffTypesIsFetching
                }
                isClearable={true}
                placeholder={
                  <div className="react-select-placeholder">نوع سابقه</div>
                }
                noOptionsMessage={selectSettings.noOptionsMessage}
                loadingMessage={selectSettings.loadingMessage}
                styles={selectStyles}
              />

              <label
                className={
                  data?.personnelStatementOffTypeID
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
                نوع سابقه
              </label>
            </div>
            <div className="inputBox__form">
              <input
                type="text"
                className="inputBox__form--input"
                required
                name="personNationalCode"
                id="personNationalCode"
                onChange={handleDataChange}
                value={convertToPersianNumber(data.personNationalCode) || ""}
              />
              <label
                className="inputBox__form--label"
                htmlFor="personNationalCode"
              >
                <span>*</span> شماره ملی
              </label>
              <div className="inputBox__form--icon">
                {isPersonsLoading || isPersonsFetching ? (
                  <IconButton aria-label="search" color="info" disabled>
                    <CircularProgress size={20} value={100} />
                  </IconButton>
                ) : (
                  <Tooltip title="استعلام">
                    <span>
                      <IconButton
                        color="primary"
                        onClick={handleSearchPerson}
                        disabled={!data.personNationalCode}
                      >
                        <CheckIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">نام</div>
                <div className="inputBox__form--readOnly-content">
                  {data.personFirstName || "-"}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">
                  نام خانوادگی
                </div>
                <div className="inputBox__form--readOnly-content">
                  {data.personLastName || "-"}
                </div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">
                  شماره کارمندی
                </div>
                <div className="inputBox__form--readOnly-content">
                  {convertToPersianNumber(data.personID) || "-"}
                </div>
              </div>
            </div>
            <div className="inputBox__form">
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                onChange={handleSelectOptionChange}
                isClearable={true}
                options={organizationOptions}
                name="organazationID"
                placeholder={
                  <div className="react-select-placeholder">
                    <span>*</span> نام سازمان
                  </div>
                }
                noOptionsMessage={selectSettings.noOptionsMessage}
                loadingMessage={selectSettings.loadingMessage}
                isLoading={organizationIsLoading || organizationIsFetching}
                styles={selectStyles}
              />

              <label
                className={
                  data?.organazationID
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
                <span>*</span> نام سازمان
              </label>
            </div>

            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
          </>
        )}

        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            isClearable={true}
            onChange={handleSelectOptionChange}
            options={paymentTypeOptions}
            name="paymentTypeID"
            placeholder={
              <div className="react-select-placeholder">
                <span>*</span> نوع پرداخت
              </div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
          />

          <label
            className={
              data?.paymentTypeID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            <span>*</span> نوع پرداخت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleDataChange}
            name="paymentNO"
            value={convertToPersianNumber(data.paymentNO) || ""}
            required
            id="paymentNO"
          />
          <label className="inputBox__form--label" htmlFor="paymentNO">
            شماره
          </label>
        </div>
        {frMode === "solo" && (
          <>
            <div className="inputBox__form">
              <input
                type="text"
                className="inputBox__form--input"
                onChange={handleDataChange}
                name="amount"
                value={convertToPersianNumber(data.amount) || ""}
                required
                id="amount"
              />
              <label className="inputBox__form--label" htmlFor="amount">
                مبلغ
              </label>
            </div>
          </>
        )}

        <div className="inputBox__form">
          <InputDatePicker
            defaultValue={null}
            onChange={handlePaymenrDateChange}
            value={selectedPaymentDate}
            onOpenChange={handlePaymentCalenderOpenChange}
            format={"jYYYY/jMM/jDD"}
            suffixIcon={<CalenderIcon color="action" />}
            open={isPaymentCalenderOpen}
            style={datePickerStyles}
            wrapperStyle={datePickerWrapperStyles}
            placement="top"
            pickerProps={{
              ref: paymenrCalenderRef,
            }}
          />
          <div className="inputBox__form--readOnly-label">تاریخ پرداخت</div>
        </div>
      </form>
      {frMode === "group" ? (
        <div style={{ marginRight: "auto" }} className="flex-row flex-center">
          <div style={{ position: "relative" }}>
            <input
              type="file"
              ref={excelFileUploadRef}
              style={{ display: "none" }}
              onChange={handleExcelFileChange}
              accept=".xlsx, .xls"
            />

            <LoadingButton
              dir="ltr"
              variant="contained"
              color="warning"
              disabled={
                uploadProgress > 0 || excelFile
                  ? true
                  : false || !data.fractionTypeID
              }
              sx={{ fontFamily: "sahel" }}
              endIcon={<UploadIcon />}
              loading={isJariLoading || isJariFetching}
              onClick={handleExcelFileUpload}
            >
              <span>بارگزاری اکسل</span>
            </LoadingButton>

            {excelFile && (
              <div
                className="excel"
                style={{
                  position: "absolute",
                  top: "-100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "100%",
                }}
              >
                <IconButton
                  color="error"
                  size="small"
                  onClick={handleRemoveExcelFile}
                  sx={{ padding: 0 }}
                >
                  <RemoveIcon />
                </IconButton>
                <Tooltip title={excelFile.name}>
                  <span className="excel__name">{excelFile.name}</span>
                </Tooltip>
                <img src="./images/excel-icon.png" className="excel__image" />
              </div>
            )}

            <Box
              sx={{
                position: "absolute",
                left: "50%",
                bottom: "-40px",
                zIndex: 2,
                width: "90%",
                transform: "translateX(-50%)",
                visibility: uploadProgress > 0 ? "visible" : "hidden",
              }}
            >
              <LinearProgress
                variant="determinate"
                value={uploadProgress}
                color="warning"
                sx={{ borderRadius: "40px" }}
              />

              <span style={{ fontFamily: "IranYekan", fontSize: "12px" }}>
                {uploadProgress}%
              </span>
            </Box>
          </div>
        </div>
      ) : (
        <div style={{ marginRight: "auto" }}>
          <Button
            dir="ltr"
            endIcon={isArchiveOpen ? <CloseIcon /> : <ArchiveIcon />}
            variant="contained"
            disabled={!isPeronIDAvailable}
            color={isArchiveOpen ? "error" : "primary"}
            onClick={handleArchiveModalOpenChange}
            sx={{ fontFamily: "sahel" }}
          >
            {isArchiveOpen ? (
              <span>بستن آوشیو</span>
            ) : (
              <span>آرشیو مستندات</span>
            )}
          </Button>
        </div>
      )}

      {isArchiveOpen && (
        <div className="flex-row flex-center">
          <ArchiveTree />
        </div>
      )}
    </section>
  );

  return content;
}

export default FractionForm;
