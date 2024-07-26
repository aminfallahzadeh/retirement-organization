// react imports
import { useState, useEffect, useRef } from "react";

// redux imports
import { useDispatch } from "react-redux";
import { setFractionType } from "../slices/fractionDataSlice";
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
} from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import * as XLSX from "xlsx";

// helpers
import { convertToPersianNumber, convertToEnglishNumber } from "../helper";

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

  // CALENEDER REF
  const letterCalenderRef = useRef(null);
  const paymenrCalenderRef = useRef(null);

  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();

  // EXPERIMENTAL
  const [frMode, setFrMode] = useState("group");

  // MAIN STATES
  const [data, setData] = useState({});

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
    { value: "1", label: "چک" },
    { value: "2", label: "فیش" },
  ];

  // DATE HANDLER
  const handleLetterCalenderOpenChange = (open) => {
    setIsLetterDateCalenderOpen(open);
  };

  const handlePaymentCalenderOpenChange = (open) => {
    setIsPaymentCalenderOpen(open);
  };

  const handleLetterDateChange = (date) => {
    setSelectedLetterDate(date);
    setIsLetterDateCalenderOpen(false);
  };

  const handlePaymenrDateChange = (date) => {
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
    setData({ ...data, [name]: value });
  };

  // HANDLE SELECT OPTION CHANGE
  const handleSelectOptionChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    if (selectedOption) {
      const { value } = selectedOption;
      setData({ ...data, [name]: value || "" });
    } else {
      setData({ ...data, [name]: null });
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
      setData({
        ...data,
        personFirstName: searchRes.itemList[0].personFirstName,
        personLastName: searchRes.itemList[0].personLastName,
        personID: searchRes.itemList[0].personID,
      });
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

  useEffect(() => {
    console.log(data);
  }, [data]);

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
        const items = rows.map((row) => {
          const obj = {};
          row.forEach((cell, index) => {
            obj[headers[index]] = convertToEnglishNumber(
              cell ? cell.toString() : ""
            );
          });
          return obj;
        });
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
              گروهی
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
            name="letterNum"
            value={convertToPersianNumber(data.letterNum) || ""}
            required
            id="letterNum"
          />
          <label className="inputBox__form--label" htmlFor="letterNum">
            شماره نامه
          </label>
        </div>
        <div className="inputBox__form">
          <InputDatePicker
            defaultValue={null}
            onChange={handleLetterDateChange}
            value={selectedLetterDate}
            onOpenChange={handleLetterCalenderOpenChange}
            format={"jYYYY/jMM/jDD"}
            suffixIcon={<CalenderIcon color="action" />}
            open={isLetterDateCalenderOpen}
            style={datePickerStyles}
            wrapperStyle={datePickerWrapperStyles}
            pickerProps={{
              ref: letterCalenderRef,
            }}
          />
          <div className="inputBox__form--readOnly-label">تاریخ نامه</div>
        </div>

        <div></div>

        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            options={offTypesOptions}
            components={animatedComponents}
            onChange={handleSelectOptionChange}
            value={offTypesOptions.find(
              (item) => item.value === data?.relationshipWithParentID
            )}
            name="offTypeID"
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
              data?.offTypeID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            نوع سابقه
          </label>
        </div>

        {frMode === "solo" ? (
          <>
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
          </>
        ) : (
          <>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </>
        )}

        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            onChange={handleSelectOptionChange}
            isClearable={true}
            options={organizationOptions}
            name="employmentTypeID"
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
              data?.employmentTypeID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            <span>*</span> نام سازمان
          </label>
        </div>

        <div></div>
        <div></div>
        <div></div>
        <div></div>

        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            isClearable={true}
            onChange={handleSelectOptionChange}
            options={paymentTypeOptions}
            name="payTypeID"
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
              data?.payTypeID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            <span>*</span> نام سازمان
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleDataChange}
            name="payNum"
            value={convertToPersianNumber(data.payNum) || ""}
            required
            id="payNum"
          />
          <label className="inputBox__form--label" htmlFor="payNum">
            شماره
          </label>
        </div>

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
            pickerProps={{
              ref: paymenrCalenderRef,
            }}
          />
          <div className="inputBox__form--readOnly-label">تاریخ پرداخت</div>
        </div>

        {frMode === "group" ? (
          <div style={{ marginRight: "auto" }} className="flex-row flex-center">
            {excelFile && (
              <div className="excel">
                <IconButton
                  color="error"
                  size="small"
                  onClick={handleRemoveExcelFile}
                  sx={{ padding: 0 }}
                >
                  <RemoveIcon />
                </IconButton>
                <span className="excel__name">{excelFile.name}</span>
                <img src="./images/excel-icon.png" className="excel__image" />
              </div>
            )}

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
              endIcon={<ArchiveIcon />}
              variant="contained"
              color="primary"
              sx={{ fontFamily: "sahel" }}
            >
              <span>آرشیو مستندات</span>
            </Button>
          </div>
        )}
      </form>
    </section>
  );

  return content;
}

export default FractionForm;
