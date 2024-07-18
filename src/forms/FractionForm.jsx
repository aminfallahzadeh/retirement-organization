// react imports
import { useState, useEffect, useRef } from "react";

// redux imports
import { useGetLookupDataQuery } from "../slices/sharedApiSlice";
import { useGetPersonnelStatementOffTypeQuery } from "../slices/personnelStatementApiSlice";
import { useGetFractionTypeQuery } from "../slices/fractionApiSlice";

// hooks
import { useCloseCalender } from "../hooks/useCloseCalender";

// mui imports
import {
  CalendarTodayOutlined as CalenderIcon,
  CalculateOutlined as CalculateIcon,
  FactCheckOutlined as CheckIcon,
} from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import {
  UploadOutlined as UploadIcon,
  ArchiveOutlined as ArchiveIcon,
} from "@mui/icons-material";

// library imports
import moment from "moment-jalaali";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// components
import FractionPeriodGrid from "../grids/FractionPeriodGrid";

// utils
import { selectStyles, selectSettings } from "../utils/reactSelect";
import { datePickerStyles, datePickerWrapperStyles } from "../utils/datePicker";

function FractionForm() {
  const letterCalenderRef = useRef(null);
  const confirmCalenderRef = useRef(null);
  const paymenrCalenderRef = useRef(null);

  const animatedComponents = makeAnimated();

  // EXPERIMENTAL
  const [frMode, setFrMode] = useState(null);

  // LOOK UP STATES
  const [offTypeCombo, setOffTypeCombo] = useState([]);
  const [fractionTypeCombo, setFractionTypeCombo] = useState([]);
  const [employmnetCombo, setEmploymnetCombo] = useState([]);

  // DATE STATES
  const [selectedLetterDate, setSelectedLetterDate] = useState(null);
  const [selectedConfirmDate, setSelectedConfirmDate] = useState(moment());
  const [selectedPaymentDate, setSelectedPaymentDate] = useState(null);

  const [isLetterDateCalenderOpen, setIsLetterDateCalenderOpen] =
    useState(false);
  const [isConfirmDateCalenderOpen, setIsConfirmDateCalenderOpen] =
    useState(false);
  const [isPaymentCalenderOpen, setIsPaymentCalenderOpen] = useState(false);

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

  const handleConfirmCalenderOpenChange = (open) => {
    setIsConfirmDateCalenderOpen(open);
  };

  const handlePaymentCalenderOpenChange = (open) => {
    setIsPaymentCalenderOpen(open);
  };

  const handleLetterDateChange = (date) => {
    setSelectedLetterDate(date);
    setIsLetterDateCalenderOpen(false);
  };

  const handleConfrimDateChange = (date) => {
    setSelectedConfirmDate(date);
    setIsConfirmDateCalenderOpen(false);
  };

  const handlePaymenrDateChange = (date) => {
    setSelectedPaymentDate(date);
    setIsPaymentCalenderOpen(false);
  };

  const handleFrTypeChange = (e) => {
    setFrMode(e.target.value);
  };

  useCloseCalender(
    [letterCalenderRef, confirmCalenderRef, paymenrCalenderRef],
    [
      setIsLetterDateCalenderOpen,
      setIsConfirmDateCalenderOpen,
      setIsPaymentCalenderOpen,
    ]
  );

  const content = (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-5" noValidate>
        <Select
          closeMenuOnSelect={true}
          options={fractionTypesOptions}
          components={animatedComponents}
          isLoading={
            isFractionTypeComboItemsLoading || isFractionTypeComboItemsFetching
          }
          isClearable={true}
          placeholder={<div className="react-select-placeholder">نوع کسور</div>}
          noOptionsMessage={selectSettings.noOptionsMessage}
          loadingMessage={selectSettings.loadingMessage}
          styles={selectStyles}
        />

        <div className="checkboxContainer">
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

          <div className="checkboxContainer__item">
            <input
              type="radio"
              id="groupTyped"
              name="frType"
              value="group"
              onChange={handleFrTypeChange}
            />
            <label htmlFor="groupTyped" className="checkboxContainer__label">
              گروهی
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

        <div className="inputBox__form">
          <InputDatePicker
            defaultValue={null}
            onChange={handleConfrimDateChange}
            value={selectedConfirmDate}
            onOpenChange={handleConfirmCalenderOpenChange}
            format={"jYYYY/jMM/jDD"}
            suffixIcon={<CalenderIcon color="action" />}
            open={isConfirmDateCalenderOpen}
            style={datePickerStyles}
            wrapperStyle={datePickerWrapperStyles}
            pickerProps={{
              ref: confirmCalenderRef,
            }}
          />
          <div className="inputBox__form--readOnly-label">تاریخ ثبت</div>
        </div>

        <Select
          closeMenuOnSelect={true}
          options={offTypesOptions}
          components={animatedComponents}
          isLoading={isOffTypeComboItemsLoading || isOffTypeComboItemsFetching}
          isClearable={true}
          placeholder={
            <div className="react-select-placeholder">نوع سابقه</div>
          }
          noOptionsMessage={selectSettings.noOptionsMessage}
          loadingMessage={selectSettings.loadingMessage}
          styles={selectStyles}
        />

        {frMode === "solo" ? (
          <>
            <div className="inputBox__form">
              <input
                type="text"
                className="inputBox__form--input"
                required
                id="nationalCode"
              />
              <label className="inputBox__form--label" htmlFor="nationalCode">
                <span>*</span> شماره ملی
              </label>
              <div className="inputBox__form--icon">
                <Tooltip title="استعلام">
                  <span>
                    <IconButton color="primary">
                      <CheckIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">نام</div>
                <div className="inputBox__form--readOnly-content">{"-"}</div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">
                  نام خانوادگی
                </div>
                <div className="inputBox__form--readOnly-content">{"-"}</div>
              </div>
            </div>

            <div className="inputBox__form">
              <div className="inputBox__form--readOnly-input">
                <div className="inputBox__form--readOnly-label">
                  شماره کارمندی
                </div>
                <div className="inputBox__form--readOnly-content">{"-"}</div>
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
        <>
          <div className="flex-col flex-center">
            <h5 className="title-secondary">لیست دوره ها</h5>
          </div>
          <FractionPeriodGrid />
        </>
      )}

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
          <Button
            dir="ltr"
            endIcon={<UploadIcon />}
            variant="contained"
            type="submit"
            color="primary"
            sx={{ fontFamily: "sahel" }}
          >
            <span>بارگزاری اکسل</span>
          </Button>
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
