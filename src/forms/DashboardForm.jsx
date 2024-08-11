// react imports
import { useState, useRef, useEffect } from "react";

// mui imports
import { LoadingButton } from "@mui/lab";
import {
  CalendarTodayOutlined as CalenderIcon,
  PlayArrowRounded as GenerateIcon,
} from "@mui/icons-material";

// hooks
import { useCloseCalender } from "../hooks/useCloseCalender";
import { useFetchOrganizations } from "../hooks/useFetchLookUpData";

// library imports
import { toast } from "react-toastify";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// utils
import {
  selectStyles,
  selectSettings,
  optionsGenerator,
} from "../utils/reactSelect";
import { datePickerStyles, datePickerWrapperStyles } from "../utils/datePicker";

function DashboardForm() {
  // CALENDER REFS
  const tillCalenderRef = useRef(null);
  const fromCalenderRef = useRef(null);

  // MAIN STATE
  const [data, setData] = useState({});

  // DATE STATES
  const [selectedTillDate, setSelectedTillDate] = useState(null);
  const [isTillDateCalenderOpen, setIsTillDateCalenderOpen] = useState(false);

  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [isFromCalenderOpen, setIsFromCalenderOpen] = useState(false);

  const animatedComponents = makeAnimated();

  // GET LOOK UP DATA
  const { organizations, organizationIsLoading, organizationIsFetching } =
    useFetchOrganizations({});

  // SELECT OPTIONS
  const retiredTypeOptions = [
    { value: "1", label: "بازنشسته" },
    { value: "2", label: "مستمری بگیر" },
    { value: "3", label: "هر دو" },
  ];

  const organizationOptions = optionsGenerator(
    organizations,
    "organizationID",
    "organizationName"
  );

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

  // DATE HANDLERS
  const handleTillDateChange = (date) => {
    setSelectedTillDate(date);
    setIsTillDateCalenderOpen(false);
  };

  const handleFromDateChange = (date) => {
    setSelectedFromDate(date);
    setIsFromCalenderOpen(false);
  };

  const handleTillCalenderOpenChange = (open) => {
    setIsTillDateCalenderOpen(open);
  };

  const handleFromCalenderOpenChange = (open) => {
    setIsFromCalenderOpen(open);
  };

  // FIX CLOSE CALENDER BUG
  useCloseCalender(
    [tillCalenderRef, fromCalenderRef],
    [setIsTillDateCalenderOpen, setIsFromCalenderOpen]
  );

  const content = (
    <section className="flex-col">
      <form method="POST" className="grid grid--col-5" noValidate>
        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            options={retiredTypeOptions}
            components={animatedComponents}
            onChange={handleSelectOptionChange}
            value={retiredTypeOptions.find(
              (item) => item.value === data?.retiredType
            )}
            name="retiredType"
            isClearable={true}
            placeholder={
              <div className="react-select-placeholder">نوع بازنشسته</div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
          />

          <label
            className={
              data?.retiredType
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            نوع بازنشسته
          </label>
        </div>

        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            options={organizationOptions}
            components={animatedComponents}
            onChange={handleSelectOptionChange}
            value={organizationOptions.find(
              (item) => item.value === data?.organizationTypeID
            )}
            name="organizationTypeID"
            isLoading={organizationIsLoading || organizationIsFetching}
            isClearable={true}
            placeholder={<div className="react-select-placeholder">سازمان</div>}
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
          />

          <label
            className={
              data?.organizationTypeID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            سازمان
          </label>
        </div>

        <div className="inputBox__form">
          <InputDatePicker
            onChange={handleFromDateChange}
            value={selectedFromDate}
            onOpenChange={handleFromCalenderOpenChange}
            format={"jYYYY/jMM/jDD"}
            suffixIcon={<CalenderIcon color="action" />}
            open={isFromCalenderOpen}
            style={datePickerStyles}
            wrapperStyle={datePickerWrapperStyles}
            placement="bottom"
            pickerProps={{
              ref: fromCalenderRef,
            }}
          />
          <div className="inputBox__form--readOnly-label">تاریخ از</div>
        </div>

        <div className="inputBox__form">
          <InputDatePicker
            onChange={handleTillDateChange}
            value={selectedTillDate}
            onOpenChange={handleTillCalenderOpenChange}
            format={"jYYYY/jMM/jDD"}
            suffixIcon={<CalenderIcon color="action" />}
            open={isTillDateCalenderOpen}
            style={datePickerStyles}
            wrapperStyle={datePickerWrapperStyles}
            placement="bottom"
            pickerProps={{
              ref: tillCalenderRef,
            }}
          />
          <div className="inputBox__form--readOnly-label">تاریخ تا</div>
        </div>
      </form>

      <div style={{ marginRight: "auto" }}>
        <LoadingButton
          dir="ltr"
          endIcon={<GenerateIcon />}
          //   onClick={handleInsertHeir}
          //   loading={isLoading}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>تولید گزارش</span>
        </LoadingButton>
      </div>
    </section>
  );
  return content;
}

export default DashboardForm;
