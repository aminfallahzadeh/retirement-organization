// react imports
import { useState, useRef, useEffect } from "react";

// redux imports
import { useLazyDashboardReportQuery } from "../slices/reportApiSlice";

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

// components
import DashboardSumGrid from "../grids/DashboardGrids/DashboardSumGrid";
import DashboardHouseRightGrid from "../grids/DashboardGrids/DashboardHouseRightGrid";

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

  // CONTROL STATES
  const [showGrids, setShowGrids] = useState(false);

  // MAIN STATE
  const [data, setData] = useState({});

  // GRID DATA STATES
  const [sumTableData, setSumTableData] = useState([]);
  const [houseRightTableData, setHouseRightTableData] = useState([]);

  // DATE STATES
  const [selectedTillDate, setSelectedTillDate] = useState(null);
  const [isTillDateCalenderOpen, setIsTillDateCalenderOpen] = useState(false);

  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [isFromCalenderOpen, setIsFromCalenderOpen] = useState(false);

  const animatedComponents = makeAnimated();

  // ACCESS DASHBOARD REPORT QUERY
  const [
    getDashboardReport,
    {
      isLoading: dashboardReportIsLoading,
      isFetching: dashboardReportIsFetching,
    },
  ] = useLazyDashboardReportQuery();

  // GET LOOK UP DATA
  const { organizations, organizationIsLoading, organizationIsFetching } =
    useFetchOrganizations({});

  // SELECT OPTIONS
  const retiredTypeOptions = [
    { value: "true", label: "بازنشسته" },
    { value: "false", label: "مستمری بگیر" },
    { value: "", label: "هر دو" },
  ];

  const organizationOptions = optionsGenerator(
    organizations,
    "organizationID",
    "organizationName"
  );

  // SEPERATORS
  const sumTableKeys = [
    "AliveRetireds",
    "AliveRetiredsMen",
    "AliveRetiredsWomen",
  ];

  const houseRightTableKeys = [
    "HomeRightOfAllAliveRetireds",
    "HomeRightOfAliveMenRetireds",
    "HomeRightOfAliveWomenRetireds",
  ];

  // CREATE SUM TABLE DATA FUNCTION
  const createSumTableData = (data, keys, setState) => {
    const result = data
      .filter((item) => keys.includes(item.dscEng))
      .reduce((acc, item) => {
        acc[item.dscEng] = item.val;
        return acc;
      }, {});

    setState([result]);
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

  const getDashbaordReportHandler = async () => {
    try {
      let startDate;
      let finishDate;

      if (selectedFromDate) {
        startDate = new Date(selectedFromDate);
        startDate.setMinutes(
          startDate.getMinutes() + startDate.getTimezoneOffset()
        );
      } else {
        startDate = null;
      }

      if (selectedTillDate) {
        finishDate = new Date(selectedTillDate);
        finishDate.setMinutes(
          finishDate.getMinutes() + finishDate.getTimezoneOffset()
        );
      } else {
        finishDate = null;
      }

      const res = await getDashboardReport({
        startDate: startDate.toISOString(),
        finishDate: finishDate.toISOString(),
        applicantTypeIsRetired: data.applicantTypeIsRetired,
        organizationID: data.organizationID,
      }).unwrap(``);
      console.log(res);
      createSumTableData(res.itemList, sumTableKeys, setSumTableData);
      createSumTableData(
        res.itemList,
        houseRightTableKeys,
        setHouseRightTableData
      );
      setShowGrids(true);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  // FIX CLOSE CALENDER BUG
  useCloseCalender(
    [tillCalenderRef, fromCalenderRef],
    [setIsTillDateCalenderOpen, setIsFromCalenderOpen]
  );

  useEffect(() => {
    console.log("sum data", sumTableData);
  }, [sumTableData]);

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
              (item) => item.value === data?.applicantTypeIsRetired
            )}
            name="applicantTypeIsRetired"
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
              data?.applicantTypeIsRetired
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
              (item) => item.value === data?.organizationID
            )}
            name="organizationID"
            isLoading={organizationIsLoading || organizationIsFetching}
            isClearable={true}
            placeholder={<div className="react-select-placeholder">سازمان</div>}
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
          />

          <label
            className={
              data?.organizationID
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
          onClick={getDashbaordReportHandler}
          loading={dashboardReportIsLoading || dashboardReportIsFetching}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>تولید گزارش</span>
        </LoadingButton>
      </div>
      {showGrids && (
        <div className="flex flex-row">
          <DashboardSumGrid data={sumTableData} />
          <DashboardHouseRightGrid data={houseRightTableData} />
        </div>
      )}
    </section>
  );
  return content;
}

export default DashboardForm;
