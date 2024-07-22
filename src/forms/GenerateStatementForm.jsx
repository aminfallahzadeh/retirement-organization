// react imports
import { useState, useRef } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useGenerateNewRetirementStatementMutation } from "../slices/retirementStatementApiSlice.js";

// mui imports
import { LoadingButton } from "@mui/lab";
import {
  Save as SaveIcon,
  CalendarTodayOutlined as CalenderIcon,
} from "@mui/icons-material";

// hooks
import { useFetchRetirementStatementTypes } from "../hooks/useFetchLookUpData";
import { useCloseCalender } from "../hooks/useCloseCalender";

// libary imports
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

function GenerateStatementForm({ setShowGenerateStatementModal }) {
  // CALENDER REFS
  const runDateCalenderRef = useRef(null);

  // DATE STATES
  const [slectedRunDate, setSelectedRunDate] = useState(null);
  const [isRunDateCalenderOpen, setIsRunDateCalenderOpen] = useState(false);

  const [statementObject, setStatementObject] = useState({});

  const location = useLocation();
  const animatedComponents = makeAnimated();

  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");
  const requestID = searchParams.get("requestID");

  const [generateNewRetirementStatement, { isLoading: isGenerating }] =
    useGenerateNewRetirementStatementMutation();

  // GET LOOK UP DATA
  const { statementTypes, statementTypesIsFetching, statementTypesIsLoading } =
    useFetchRetirementStatementTypes();

  // SELECT OPTIONS
  const statementTypeOptions = optionsGenerator(
    statementTypes,
    "retirementStatementTypeID",
    "retirementStatementTypeName"
  );

  // CHANGE HANDLERS
  const handleRunDateOpenChange = (open) => {
    setIsRunDateCalenderOpen(open);
  };

  const handleRunDateChange = (date) => {
    setSelectedRunDate(date);
    setIsRunDateCalenderOpen(false);
  };

  // HANDLE MAIN DATA CHANGE
  const handleStatementDataChange = (e) => {
    const { name, value } = e.target;
    setStatementObject((statementObject) => ({
      ...statementObject,
      [name]: value,
    }));
  };

  // HANDLE SELECT OPTION CHANGE
  const handleSelectOptionChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    if (selectedOption) {
      const { value } = selectedOption;
      setStatementObject({ ...statementObject, [name]: value || "" });
    } else {
      setStatementObject({ ...statementObject, [name]: null });
    }
  };

  const handleGenerateStatement = async () => {
    try {
      // Adjusting for timezone difference
      const retirementStatementRunDate = new Date(slectedRunDate);
      retirementStatementRunDate.setMinutes(
        retirementStatementRunDate.getMinutes() -
          retirementStatementRunDate.getTimezoneOffset()
      );
      const generateRes = await generateNewRetirementStatement({
        ...statementObject,
        retirementStatementRunDate,
        personID,
        requestID,
      }).unwrap();
      setShowGenerateStatementModal(false);
      toast.success(generateRes.message, {
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
  useCloseCalender([runDateCalenderRef], [setIsRunDateCalenderOpen]);

  const content = (
    <section className="formContainer-transparent flex-col">
      <form method="POST" className="grid grid--col-2">
        <div className="inputBox__form">
          <InputDatePicker
            value={slectedRunDate}
            format={"jYYYY/jMM/jDD"}
            onChange={handleRunDateChange}
            onOpenChange={handleRunDateOpenChange}
            suffixIcon={<CalenderIcon color="action" />}
            open={isRunDateCalenderOpen}
            style={datePickerStyles}
            wrapperStyle={datePickerWrapperStyles}
            pickerProps={{
              ref: runDateCalenderRef,
            }}
          />
          <div className="inputBox__form--readOnly-label">
            <span>*</span> تاریخ اجرا
          </div>
        </div>
        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={statementTypeOptions}
            onChange={handleSelectOptionChange}
            value={statementTypeOptions.find(
              (item) =>
                item.value === statementObject?.retirementStatementTypeID
            )}
            name="retirementStatementTypeID"
            isClearable={true}
            placeholder={
              <div className="react-select-placeholder">
                <span>*</span> نوع حکم
              </div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
            isLoading={statementTypesIsFetching || statementTypesIsLoading}
          />

          <label
            className={
              statementObject?.retirementStatementTypeID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            <span>*</span> نوع حکم
          </label>
        </div>

        <div className="inputBox__form col-span-2 row-span-2">
          <textarea
            type="text"
            className="inputBox__form--input"
            value={statementObject?.retirementStatementDesc}
            name="retirementStatementDesc"
            onChange={handleStatementDataChange}
            required
            id="retirementStatementDesc"
          ></textarea>
          <label
            className="inputBox__form--label"
            htmlFor="retirementStatementDesc"
          >
            شرح حکم
          </label>
        </div>
      </form>

      <div style={{ marginRight: "auto" }}>
        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          onClick={handleGenerateStatement}
          loading={isGenerating}
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

export default GenerateStatementForm;
