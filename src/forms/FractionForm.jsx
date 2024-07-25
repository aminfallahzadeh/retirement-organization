// react imports
import { useState, useEffect, useRef } from "react";

// redux imports
import { useDispatch } from "react-redux";
import { setFractionType } from "../slices/fractionDataSlice";
import { useGetLookupDataQuery } from "../slices/sharedApiSlice";
import { useGetPersonnelStatementOffTypeQuery } from "../slices/personnelStatementApiSlice";
import { useGetFractionTypeQuery } from "../slices/fractionApiSlice";
import { useLazyGetPersonsQuery } from "../slices/personApiSlice";

// hooks
import { useCloseCalender } from "../hooks/useCloseCalender";

// mui imports
import {
  CalendarTodayOutlined as CalenderIcon,
  CalculateOutlined as CalculateIcon,
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
import { selectStyles, selectSettings } from "../utils/reactSelect";
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
  const [isExcelFileUploaded, setIsExcelFileUploaded] = useState(false);
  const [excelFile, setExcelFile] = useState(null);

  // LOOK UP STATES
  const [offTypeCombo, setOffTypeCombo] = useState([]);
  const [fractionTypeCombo, setFractionTypeCombo] = useState([]);
  const [employmnetCombo, setEmploymnetCombo] = useState([]);

  // DATE STATES
  const [selectedLetterDate, setSelectedLetterDate] = useState(null);
  const [selectedPaymentDate, setSelectedPaymentDate] = useState(null);

  const [isLetterDateCalenderOpen, setIsLetterDateCalenderOpen] =
    useState(false);
  const [isPaymentCalenderOpen, setIsPaymentCalenderOpen] = useState(false);

  const [
    searchPersons,
    { isLoading: isPersonsLoading, isFetching: isPersonsFetching },
  ] = useLazyGetPersonsQuery();

  // GET LOOKUP DATA
  const {
    data: employmnetComboItems,
    isSuccess: isEmploymnetComboItemsSuccess,
    isLoading: isEmploymnetComboItemsLoading,
    isFetching: isEmploymnetComboItemsFetching,
    error: employmnetComboItemsError,
  } = useGetLookupDataQuery({ lookUpType: "EmploymentType" });

  const {
    data: fractionTypeComboItems,
    isSuccess: isFractionTypeComboItemsSuccess,
    isLoading: isFractionTypeComboItemsLoading,
    isFetching: isFractionTypeComboItemsFetching,
    error: fractionTypeComboItemsError,
  } = useGetFractionTypeQuery();

  const {
    data: offTypeComboItems,
    isSuccess: isOffTypeComboItemsSuccess,
    isLoading: isOffTypeComboItemsLoading,
    isFetching: isOffTypeComboItemsFetching,
    error: offTypeComboItemsError,
  } = useGetPersonnelStatementOffTypeQuery();

  // SELECT OPTIONS
  const offTypesOptions = offTypeCombo.map((item) => ({
    value: item.personnelStatementOffTypeID,
    label: item.personnelStatementOffTypeName,
  }));

  const fractionTypesOptions = fractionTypeCombo.map((item) => ({
    value: item.fractionTypeid,
    label: item.fractionTypeName,
  }));

  const employmentOptions = employmnetCombo.map((item) => ({
    value: item.lookUpID,
    label: item.lookUpName,
  }));

  const paymentTypeOptions = [
    { value: "1", label: "چک" },
    { value: "2", label: "فیش" },
  ];

  // FETCH LOOKUP DATA
  useEffect(() => {
    if (isOffTypeComboItemsSuccess) {
      setOffTypeCombo(offTypeComboItems.itemList);
    }
  }, [isOffTypeComboItemsSuccess, offTypeComboItems]);

  useEffect(() => {
    if (isFractionTypeComboItemsSuccess) {
      setFractionTypeCombo(fractionTypeComboItems.itemList);
    }
  }, [isFractionTypeComboItemsSuccess, fractionTypeComboItems]);

  useEffect(() => {
    if (isEmploymnetComboItemsSuccess) {
      setEmploymnetCombo(employmnetComboItems.itemList);
    }
  }, [isEmploymnetComboItemsSuccess, employmnetComboItems]);

  // HANLDE ERRORS
  useEffect(() => {
    if (offTypeComboItemsError) {
      console.log(offTypeComboItemsError);
    }
  }, [offTypeComboItemsError]);

  useEffect(() => {
    if (fractionTypeComboItemsError) {
      console.log(fractionTypeComboItemsError);
    }
  }, [fractionTypeComboItemsError]);

  useEffect(() => {
    if (employmnetComboItemsError) {
      console.log(employmnetComboItemsError);
    }
  }, [employmnetComboItemsError]);

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
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // FIND NATIONAL CODES FROM ALL CELLS
        const nationalCodes = [];
        json.forEach((row) => {
          row.forEach((cell) => {
            if (cell !== null && cell !== undefined && cell !== "") {
              nationalCodes.push(convertToEnglishNumber(cell.toString()));
            }
          });
        });
        // setNationalCodesFromExcel(nationalCodes);
        setIsExcelFileUploaded(true);
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
            isLoading={
              isFractionTypeComboItemsLoading ||
              isFractionTypeComboItemsFetching
            }
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
              isOffTypeComboItemsLoading || isOffTypeComboItemsFetching
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
                      <IconButton color="primary" onClick={handleSearchPerson}>
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

        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          isClearable={true}
          options={employmentOptions}
          name="employmentTypeID"
          placeholder={
            <div className="react-select-placeholder">
              <span>*</span> نام سازمان
            </div>
          }
          noOptionsMessage={selectSettings.noOptionsMessage}
          loadingMessage={selectSettings.loadingMessage}
          isLoading={
            isEmploymnetComboItemsFetching || isEmploymnetComboItemsLoading
          }
          styles={selectStyles}
        />

        <div></div>
        <div></div>
        <div></div>
        <div></div>

        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          isClearable={true}
          options={paymentTypeOptions}
          name="employmentTypeID"
          placeholder={
            <div className="react-select-placeholder">
              <span>*</span> نوع پرداخت
            </div>
          }
          noOptionsMessage={selectSettings.noOptionsMessage}
          loadingMessage={selectSettings.loadingMessage}
          styles={selectStyles}
        />

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="payNum"
          />
          <label className="inputBox__form--label" htmlFor="payNum">
            شماره
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
      </form>

      {frMode === "solo" && (
        <div className="fraction--total">
          <div className="fraction--total__items">
            <p>
              جمع مشمول کسور : <span>۱۰۰۰۰۰</span>
            </p>
            <p>
              سهم کارفرما : <span>۱۰۰۰۰۰</span>
            </p>
            <p>
              سهم کارمند : <span>۱۰۰۰۰۰</span>
            </p>
            <p>
              مانده بدهی : <span>۱۰۰۰۰۰</span>
            </p>
          </div>

          <div className="fraction--total__btn">
            <Button
              dir="ltr"
              endIcon={<CalculateIcon />}
              variant="contained"
              type="submit"
              color="warning"
              sx={{ fontFamily: "sahel" }}
            >
              <span>محاسبه</span>
            </Button>
          </div>
        </div>
      )}

      <div style={{ marginRight: "auto" }} className="flex-row">
        {frMode === "group" ? (
          <div
            style={{ marginRight: "auto" }}
            className="flex-row flex-center col-span-2"
          >
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
                disabled={uploadProgress > 0 || excelFile ? true : false}
                sx={{ fontFamily: "sahel" }}
                endIcon={<UploadIcon />}
                //  loading={
                //    isGetListFromExcelFetching || isGetListFromExcelLoading
                //  }
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
          <Button
            dir="ltr"
            endIcon={<ArchiveIcon />}
            variant="contained"
            type="submit"
            color="primary"
            sx={{ fontFamily: "sahel" }}
          >
            <span>آرشیو مستندات</span>
          </Button>
        )}
      </div>
    </section>
  );

  return content;
}

export default FractionForm;
