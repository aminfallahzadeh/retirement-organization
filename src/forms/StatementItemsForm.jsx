// react imports
import { useState, useEffect, useCallback, useRef } from "react";

// redux imports
import { useSelector } from "react-redux";
import {
  useGetListOfRetirementStatementItemQuery,
  useLazyGetListOfFormulaGroupSettingQuery,
  useGenerateGroupStatementMutation,
} from "../slices/retirementStatementApiSlice.js";

// hooks
import { useFetchRetirementStatementTypes } from "../hooks/useFetchLookUpData.js";
import { useCloseCalender } from "../hooks/useCloseCalender";

// mui imports
import {
  CalendarTodayOutlined as CalenderIcon,
  EditCalendarOutlined as DraftIcon,
  DoneRounded as DoneIcon,
  CloseRounded as CancelIcon,
} from "@mui/icons-material";
import { CircularProgress, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// library imports
import { toast } from "react-toastify";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// components
import GroupFormulaForm from "./GroupFormulaForm.jsx";
import GenerateGroupStatementGrid from "../grids/GenerateGroupStatementGrid.jsx";

// utils
import {
  selectStyles,
  selectSettings,
  optionsGenerator,
} from "../utils/reactSelect";
import { datePickerStyles, datePickerWrapperStyles } from "../utils/datePicker";

function StatementItemsForm({ isDraftGenerated, setIsDraftGenerated }) {
  const statementRunDateCalenderRef = useRef(null);

  const { userID } = useSelector((state) => state.auth);

  const searchParams = new URLSearchParams(location.search);
  const requestID = searchParams.get("requestID");

  // CONTROL STATES
  const [isItemsEdited, setIsItemsEdited] = useState(false);
  const [showGroupStatementGrid, setShowGroupStatementGrid] = useState(false);

  // MAIN STATES
  const [data, setData] = useState({});
  const [formulaGroups, setFormulaGroups] = useState([]);
  const [groupStatementTableData, setGroupStatementTableData] = useState(null);

  // LOOK UP STATES
  const [statementItems, setStatementItems] = useState([]);

  // DATE STATES
  const [selectedRunDate, setSelectedRunDate] = useState(null);
  const [isRunDateCalenderOpen, setIsRunDateCalenderOpen] = useState(false);

  const animatedComponents = makeAnimated();

  const [
    getFormulaGroups,
    {
      isLoading: getFormulaGroupsIsLoading,
      isFetching: getFormulaGroupsIsFetching,
    },
  ] = useLazyGetListOfFormulaGroupSettingQuery();

  const [
    generateGroupStatement,
    {
      isLoading: generateGroupStatementIsLoading,
      isFetching: generateGroupStatementIsFetching,
    },
  ] = useGenerateGroupStatementMutation();

  // FETCH FORMULA GROUPS FUNCTION
  const fetchFormulaGroups = useCallback(
    async (retirementStatementItemID) => {
      try {
        const res = await getFormulaGroups({
          retirementStatementItemID,
        }).unwrap();
        setFormulaGroups(res);
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error, {
          autoClose: 2000,
        });
      }
    },
    [getFormulaGroups]
  );

  // GET LOOKUP DATA FROM HOOK
  const { statementTypes, statementTypesIsFetching, statementTypesIsLoading } =
    useFetchRetirementStatementTypes();

  const {
    data: formulaGroupSettingComboItems,
    isSuccess: formulaGroupSettingIsSuccess,
    isFetching: formulaGroupSettingIsFetching,
    isLoading: formulaGroupSettingIsLoading,
    error: formulaGroupSettingError,
  } = useGetListOfRetirementStatementItemQuery();

  useEffect(() => {
    if (formulaGroupSettingIsSuccess) {
      setStatementItems(formulaGroupSettingComboItems);
    }
  }, [formulaGroupSettingIsSuccess, formulaGroupSettingComboItems]);

  // FETCH FORMULA GROUPS ON USER SELECTED ITEM
  useEffect(() => {
    if (data.retirementStatementItemID) {
      fetchFormulaGroups(data.retirementStatementItemID.value);
    }
  }, [data.retirementStatementItemID, fetchFormulaGroups]);

  useEffect(() => {
    if (formulaGroupSettingError) {
      console.log(formulaGroupSettingError);
    }
  }, [formulaGroupSettingError]);

  // SELECT OPTIONS
  const statementTypeOptions = optionsGenerator(
    statementTypes,
    "retirementStatementTypeID",
    "retirementStatementTypeName"
  );

  const formulaGroupSettingOptions = statementItems
    // ONLY SHOW ACTIVE ITEMS
    .filter((item) => item.isActive)
    .map((item) => ({
      value: item.retirementStatementItemID,
      label: item.retirementStatementItemName,
    }));

  // DATE HANDLER
  const hadnleRunDateOpenChange = (open) => {
    setIsRunDateCalenderOpen(open);
  };

  const handleRunDateChange = (date) => {
    setSelectedRunDate(date);
    setIsRunDateCalenderOpen(false);
  };

  // OTHER HANDLERS
  const handleStatementItemChange = (selectedOption, actionMeta) => {
    const name = actionMeta.name;
    const value = selectedOption;
    setData({ ...data, [name]: value });
  };

  const handleStatementDescriptionChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };

  // GENERATE GROUP STATEMENT HANDLER
  const generateGroupStatementHandler = async () => {
    try {
      // Adjusting for timezone difference
      let runDate;

      if (selectedRunDate) {
        runDate = new Date(selectedRunDate);
        runDate.setMinutes(runDate.getMinutes() - runDate.getTimezoneOffset());
      } else {
        runDate = null;
      }

      const res = await generateGroupStatement({
        runDate: runDate.toISOString(),
        retirementStatementTypeID: data.retirementStatementTypeID.value,
        insertUserID: userID,
        requestID,
        retirementStatementDesc: data.retirementStatementDesc || null,
      }).unwrap();
      setShowGroupStatementGrid(true);
      const mappedData = res.map((item, index) => ({
        id: item.retirementStatementID,
        groupStatementRowNum: index + 1,
        statementSerial: item.retirementStatementSerial || "-",
        statementType: item.retirementStatementTypeName || "-",
        statementNumber: item.retirementStatementNo || "-",
        statemenrIssueDate: item.retirementStatementIssueDate || "-",
        statementRunDate: item.retirementStatementRunDate || "-",
      }));
      setGroupStatementTableData(mappedData);
      setIsDraftGenerated(true);
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

  // FIX CLOSE CALENDER BUG
  useCloseCalender([statementRunDateCalenderRef], [setIsRunDateCalenderOpen]);

  const content = (
    <>
      {!isDraftGenerated && (
        <section className="flex-col formContainer">
          <form method="POST" className="grid grid--col-4" noValidate>
            <div className="inputBox__form">
              <InputDatePicker
                defaultValue={null}
                value={selectedRunDate}
                onChange={handleRunDateChange}
                onOpenChange={hadnleRunDateOpenChange}
                format={"jYYYY/jMM/jDD"}
                suffixIcon={<CalenderIcon color="action" />}
                open={isRunDateCalenderOpen}
                style={datePickerStyles}
                wrapperStyle={datePickerWrapperStyles}
                pickerProps={{
                  ref: statementRunDateCalenderRef,
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
                isClearable={true}
                name="retirementStatementTypeID"
                onChange={handleStatementItemChange}
                isLoading={statementTypesIsLoading || statementTypesIsFetching}
                placeholder={
                  <div className="react-select-placeholder">
                    <span>*</span> نوع حکم
                  </div>
                }
                noOptionsMessage={selectSettings.noOptionsMessage}
                loadingMessage={selectSettings.loadingMessage}
                styles={selectStyles}
              />

              <label
                className={
                  data?.retirementStatementTypeID
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
                name="retirementStatementDesc"
                onChange={handleStatementDescriptionChange}
                required
                id="retirementStatementDesc"
              ></textarea>
              <label
                className="inputBox__form--label"
                htmlFor="retirementStatementDesc"
              >
                <span>*</span> شرح حکم
              </label>
            </div>

            <div className="inputBox__form">
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={formulaGroupSettingOptions}
                onChange={handleStatementItemChange}
                name="retirementStatementItemID"
                isClearable={true}
                placeholder={
                  <div className="react-select-placeholder">
                    تنظیمات آیتم های حکم
                  </div>
                }
                noOptionsMessage={selectSettings.noOptionsMessage}
                loadingMessage={selectSettings.loadingMessage}
                styles={selectStyles}
                isLoading={
                  formulaGroupSettingIsFetching || formulaGroupSettingIsLoading
                }
              />

              <label
                className={
                  data?.retirementStatementItemID
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
                تنظیمات آیتم های حکم
              </label>
            </div>
            <div>&nbsp;</div>
          </form>
        </section>
      )}

      {getFormulaGroupsIsFetching || getFormulaGroupsIsLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem 10rem",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : data.retirementStatementItemID && formulaGroups ? (
        <>
          {!isDraftGenerated && (
            <GroupFormulaForm
              formulaGroups={formulaGroups}
              setIsItemsEdited={setIsItemsEdited}
            />
          )}

          <div style={{ marginRight: "auto" }}>
            <LoadingButton
              dir="ltr"
              variant="contained"
              color="primary"
              onClick={generateGroupStatementHandler}
              loading={
                generateGroupStatementIsLoading ||
                generateGroupStatementIsFetching
              }
              disabled={
                !data.retirementStatementTypeID ||
                !selectedRunDate ||
                !isItemsEdited ||
                showGroupStatementGrid
              }
              sx={{ fontFamily: "IranYekan" }}
              endIcon={<DraftIcon />}
            >
              <span>صدور پیش نویس</span>
            </LoadingButton>
          </div>
        </>
      ) : null}

      {showGroupStatementGrid && (
        <>
          <GenerateGroupStatementGrid
            groupStatementTableData={groupStatementTableData}
            isLoading={generateGroupStatementIsLoading}
            isFetching={generateGroupStatementIsFetching}
          />

          <div style={{ marginRight: "auto" }} className="flex-row">
            <LoadingButton
              dir="ltr"
              variant="contained"
              color="error"
              sx={{ fontFamily: "IranYekan" }}
              endIcon={<CancelIcon />}
            >
              <span>لغو</span>
            </LoadingButton>
            <LoadingButton
              dir="ltr"
              variant="contained"
              color="success"
              sx={{ fontFamily: "IranYekan" }}
              endIcon={<DoneIcon />}
            >
              <span>تایید</span>
            </LoadingButton>
          </div>
        </>
      )}
    </>
  );

  return content;
}

export default StatementItemsForm;
