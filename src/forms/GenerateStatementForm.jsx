// react imports
import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

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

// helpers
import { convertToPersianNumber, convertToEnglishNumber } from "../helper";

// utils
import { selectSettings, optionsGenerator } from "../utils/reactSelect";
import { datePickerStyles, datePickerWrapperStyles } from "../utils/datePicker";

function GenerateStatementForm({
  setShowGenerateStatementModal,
  setStatMessage,
  setShowStatModal,
}) {
  // CALENDER REFS
  const runDateCalenderRef = useRef(null);

  // DATE STATES
  const [selectedRunDate, setSelectedRunDate] = useState(null);
  const [isRunDateCalenderOpen, setIsRunDateCalenderOpen] = useState(false);

  // ACCESS REACT HOOK FORM CONTROL
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    watch,
  } = useForm();

  // ACCESS REACT HOOK FORM DATA
  const form_data = watch();

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

  const baseSalaryOptions = [
    "100",
    "11",
    "14",
    "16",
    "36",
    "37",
    "38",
    "39",
    "69",
    "5",
    "57",
    "6",
    "65",
    "96",
    "97",
  ];

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

  const onSubmit = async () => {
    try {
      // Adjusting for timezone difference
      const retirementStatementRunDate = new Date(selectedRunDate);
      retirementStatementRunDate.setMinutes(
        retirementStatementRunDate.getMinutes() -
          retirementStatementRunDate.getTimezoneOffset()
      );
      const generateRes = await generateNewRetirementStatement({
        ...form_data,
        retirementStatementRunDate,
        personID,
        requestID,
        newAmount: convertToEnglishNumber(form_data?.newAmount) || 0,
      }).unwrap();
      setShowGenerateStatementModal(false);
      toast.success(generateRes.message, {
        autoClose: 2000,
      });

      if (generateRes.error && generateRes.error.length > 0) {
        setStatMessage(convertToPersianNumber(generateRes.error));
        setShowStatModal(true);
      }
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
      <form
        method="POST"
        className="flex-col"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="grid grid--col-2">
          <div className="inputBox__form">
            <InputDatePicker
              value={selectedRunDate}
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
            <Controller
              name={"retirementStatementTypeID"}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={statementTypeOptions}
                  onChange={(val) => onChange(val ? val.value : null)}
                  value={statementTypeOptions.find(
                    (c) => c.value === form_data?.retirementStatementTypeID
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
                  styles={{
                    container: (base) => ({
                      ...base,
                      position: "relative",
                      height: "100%",
                    }),
                    control: (base) => ({
                      ...base,
                      fontFamily: "IranYekan",
                      cursor: "pointer",
                      fontSize: "12px",
                      height: "100%",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      overflow: "auto",
                      textOverflow: "ellipsis",
                      position: "relative",
                    }),
                    menu: (base) => ({
                      ...base,
                      fontFamily: "IranYekan",
                      zIndex: "5",
                      height: "200px",
                    }),
                    option: (base) => ({
                      ...base,
                      cursor: "pointer",
                    }),
                    menuList: (base) => ({
                      ...base,
                      fontFamily: "IranYekan",
                      zIndex: "5",
                      height: "200px",
                    }),
                  }}
                  isLoading={
                    statementTypesIsFetching || statementTypesIsLoading
                  }
                />
              )}
            />

            <label
              className={
                form_data?.retirementStatementTypeID
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              <span>*</span> نوع حکم
            </label>

            {errors.retirementStatementTypeID && (
              <span className="error-form">نوع حکم اجباری است</span>
            )}
          </div>

          {baseSalaryOptions.includes(form_data?.retirementStatementTypeID) && (
            <div className="inputBox__form">
              {errors.newAmount && (
                <span className="error-form">{errors.newAmount.message}</span>
              )}
              <input
                type="text"
                className="inputBox__form--input"
                name="newAmount"
                value={convertToPersianNumber(form_data?.newAmount) || ""}
                id="newAmount"
                required
                {...register("newAmount", {
                  required: "حقوق مبنا اجباری است",
                  pattern: {
                    value: /^[۰-۹0-9]+$/,
                    message: "از اعداد استفاده کنید",
                  },
                })}
              />
              <label className="inputBox__form--label" htmlFor="newAmount">
                <span>*</span> حقوق مبنا
              </label>
            </div>
          )}

          <div className="inputBox__form col-span-2 row-span-2">
            {errors.retirementStatementDesc && (
              <span className="error-form">
                {errors.retirementStatementDesc.message}
              </span>
            )}
            <textarea
              type="text"
              className="inputBox__form--input"
              value={convertToPersianNumber(form_data?.retirementStatementDesc)}
              name="retirementStatementDesc"
              id="retirementStatementDesc"
              required
              {...register("retirementStatementDesc", {
                pattern: {
                  value: /^[آ-ی\s۰-۹]+$/,
                  message: "از حروف و اعداد فارسی استفاده کنید",
                },
              })}
            ></textarea>
            <label
              className="inputBox__form--label"
              htmlFor="retirementStatementDesc"
            >
              شرح حکم
            </label>
          </div>
        </div>
        <div style={{ marginRight: "auto" }}>
          <LoadingButton
            dir="ltr"
            endIcon={<SaveIcon />}
            onClick={handleSubmit}
            type="submit"
            loading={isGenerating}
            variant="contained"
            disabled={!selectedRunDate}
            color="success"
            sx={{ fontFamily: "sahel" }}
          >
            <span>ذخیره</span>
          </LoadingButton>
        </div>
      </form>
    </section>
  );

  return content;
}

export default GenerateStatementForm;
