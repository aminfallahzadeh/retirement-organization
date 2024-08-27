// react imports
import { useState, useRef, useEffect } from "react";

// redux imports
import { useLazyDashboardReportQuery } from "../slices/reportApiSlice";

// mui imports
import { Box, CircularProgress } from "@mui/material";
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
import Modal from "../components/Modal";
import DashboardSumGrid from "../grids/DashboardGrids/DashboardSumGrid";
import DashboardHouseRightGrid from "../grids/DashboardGrids/DashboardHouseRightGrid";
import UnderWarantyAmountMenGrid from "../grids/DashboardGrids/UnderWarantyAmountMenGrid";
import UnderWarantyAmountWomenGrid from "../grids/DashboardGrids/UnderWarantyAmountWomenGrid";
import RelatedRightMenGrid from "../grids/DashboardGrids/RelatedRightMenGrid";
import RelatedRightWomenGrid from "../grids/DashboardGrids/RelatedRightWomenGrid";
import SupplementaryGrid from "../grids/DashboardGrids/SupplementaryGrid";
import SacrificeCondtionsGrid from "../grids/DashboardGrids/SacrificeCondtionsGrid";
import SacrificeAmountGrid from "../grids/DashboardGrids/SacrificeAmountGrid";
import MinSalaryGrid from "../grids/DashboardGrids/MinSalaryGrid";

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
  const [uderWarantyMenTableData, setUderWarantyMenTableData] = useState([]);
  const [underWarantyWomenTableData, setUnderWarantyWomenTableData] = useState(
    []
  );
  const [relatedRightMenTableData, setRelatedRightMenTableData] = useState([]);
  const [relatedRightWomenTableData, setRelatedRightWomenTableData] = useState(
    []
  );
  const [supplementaryTableData, setSupplementaryTableData] = useState([]);
  const [ssacrificeTableData, setSsacrificeTableData] = useState([]);
  const [sacrificeAmountTableData, setSacrificeAmountTableData] = useState([]);
  const [minSalaryTableData, setMinSalaryTableData] = useState([]);

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
    { value: "null", label: "هر دو" },
  ];

  const organizationOptions = optionsGenerator(
    organizations,
    "organizationID",
    "organizationName"
  );

  // DATA TABLE KEYS
  // RETIRED SUM KEYS
  const retiredSumTableKeys = [
    "AliveRetireds",
    "AliveRetiredsMen",
    "AliveRetiredsWomen",
  ];

  const deadSumTableKeys = [
    "DeadRetireds",
    "DeadMenRetireds",
    "DeadWomenRetireds",
  ];

  const allSumTableKeys = ["AllRetireds", "AllMenRetireds", "AllWomenRetireds"];

  // HOME RIGHT KEYS
  const retiredHomeRightKeys = [
    "HomeRightOfAllAliveRetireds",
    "HomeRightOfAliveMenRetireds",
    "HomeRightOfAliveWomenRetireds",
  ];

  const deadHomeRightKeys = [
    "HomeRightOfAllDeadRetireds",
    "HomeRightOfDeadMenRetireds",
    "HomeRightOfDeadWomenRetireds",
  ];

  const allHomeRightKeys = [
    "HomeRightOfAllRetireds",
    "HomeRightOfAllMenRetireds",
    "HomeRightOfAllWomenRetireds",
  ];

  // UNDER WARRANTY MEN KEYS
  const underWarantyMenAliveKeys = [
    "SpouseOfAliveMenRetireds",
    "SonOfAliveMenRetireds",
    "DaughterOfAliveMenRetireds",
  ];

  const underWarantyMenDeadKeys = [
    "SpouseOfDeadMenRetireds",
    "SonOfDeadMenRetireds",
    "DaughterOfDeadMenRetireds",
  ];

  const underWarantyMenAllKeys = [
    "SpouseOfAllMenRetireds",
    "SonOfAllMenRetireds",
    "DaughterOfAllMenRetireds",
  ];

  // UNDER WARTANTY WOMEN KEYS
  const uderWarantyWomenAliveKeys = [
    "SpouseOfAliveWomenRetireds",
    "SonOfAliveWomenRetireds",
    "DaughterOfAliveWomenRetireds",
  ];

  const uderWarantyWomenDeadKeys = [
    "SpouseOfDeadWomenRetireds",
    "SonOfDeadWomenRetireds",
    "DaughterOfDeadWomenRetireds",
  ];

  const uderWarantyWomenAllKeys = [
    "SpouseOfAllWomenRetireds",
    "SonOfAllWomenRetireds",
    "DaughterOfAllWomenRetireds",
  ];

  const relatedRightMenKeys = [
    "SumMaritalAmountsOfMenRetireds",
    "SumDaughterAmountsOfMenRetireds",
    "SumSonAmountsOfMenRetireds",
  ];

  const relatedRightWomenKeyss = [
    "SumMaritalAmountsOfWomenRetireds",
    "SumDaughterAmountsOfWomenRetireds",
    "SumSonAmountsOfWomenRetireds",
  ];

  const supplementaryKeys = [
    "SumSupplementaryAmounts",
    "SumSupplementaryAmountsOfWomenRetireds",
    "SumSupplementaryAmountsOfMenRetireds",
  ];

  const sacrificeConditionsKeys = [
    "CountOfAllPensionariesWith1SacrificationState",
    "CountOfAllPensionariesWith2SacrificationState",
    "CountOfAllPensionariesWith3SacrificationState",
  ];

  const sacrificeAmountKeys = [
    "Sacrificed",
    "SacrificedFamily",
    "ChildOfSacrificed",
    "Warrior",
    "Captive",
    "Valiant",
  ];

  const minSalaryKeys = [
    "MinSalaryWith30YearsExperience",
    "MaxSalary",
    "MinSalaryWithLessThan30YearsExperience",
  ];

  useEffect(() => {
    console.log(data);
  }, [data]);

  // RESET REPORT ON DATA CHANGE
  useEffect(() => {
    setShowGrids(false);
  }, [data, selectedFromDate, selectedTillDate]);

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

      // TABLE DATA
      let sumTableKeys;
      let homeRightKeys;
      let underWarantyMenKeys;
      let uderWarantyWomenKeys;

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

      if (startDate && finishDate) {
        const yearDifference =
          finishDate.getFullYear() - startDate.getFullYear();
        const monthDifference = finishDate.getMonth() - startDate.getMonth();
        const dayDifference = finishDate.getDate() - startDate.getDate();

        if (
          yearDifference > 1 ||
          (yearDifference === 1 && (monthDifference > 0 || dayDifference > 0))
        ) {
          toast.error("فاصله بین تاریخ‌ها نباید بیش از یک سال باشد", {
            autoClose: 2000,
          });
          return;
        }
      }

      if (data.applicantTypeIsRetired === "true") {
        sumTableKeys = retiredSumTableKeys;
      } else if (data.applicantTypeIsRetired === "false") {
        sumTableKeys = deadSumTableKeys;
      } else {
        sumTableKeys = allSumTableKeys;
      }

      if (data.applicantTypeIsRetired === "true") {
        homeRightKeys = retiredHomeRightKeys;
      } else if (data.applicantTypeIsRetired === "false") {
        homeRightKeys = deadHomeRightKeys;
      } else {
        homeRightKeys = allHomeRightKeys;
      }

      if (data.applicantTypeIsRetired === "true") {
        underWarantyMenKeys = underWarantyMenAliveKeys;
      } else if (data.applicantTypeIsRetired === "false") {
        underWarantyMenKeys = underWarantyMenDeadKeys;
      } else {
        underWarantyMenKeys = underWarantyMenAllKeys;
      }

      if (data.applicantTypeIsRetired === "true") {
        uderWarantyWomenKeys = uderWarantyWomenAliveKeys;
      } else if (data.applicantTypeIsRetired === "false") {
        uderWarantyWomenKeys = uderWarantyWomenDeadKeys;
      } else {
        uderWarantyWomenKeys = uderWarantyWomenAllKeys;
      }

      const res = await getDashboardReport({
        startDate: startDate.toISOString(),
        finishDate: finishDate.toISOString(),
        applicantTypeIsRetired:
          data.applicantTypeIsRetired === "null"
            ? null
            : data.applicantTypeIsRetired,
        organizationID: data.organizationID,
      }).unwrap();
      console.log(res.itemList);
      console.log(sumTableKeys);
      createSumTableData(res.itemList, sumTableKeys, setSumTableData);
      createSumTableData(res.itemList, homeRightKeys, setHouseRightTableData);
      createSumTableData(
        res.itemList,
        underWarantyMenKeys,
        setUderWarantyMenTableData
      );
      createSumTableData(
        res.itemList,
        uderWarantyWomenKeys,
        setUnderWarantyWomenTableData
      );
      createSumTableData(
        res.itemList,
        relatedRightMenKeys,
        setRelatedRightMenTableData
      );
      createSumTableData(
        res.itemList,
        relatedRightWomenKeyss,
        setRelatedRightWomenTableData
      );
      createSumTableData(
        res.itemList,
        supplementaryKeys,
        setSupplementaryTableData
      );
      createSumTableData(
        res.itemList,
        sacrificeConditionsKeys,
        setSsacrificeTableData
      );
      createSumTableData(
        res.itemList,
        sacrificeAmountKeys,
        setSacrificeAmountTableData
      );
      createSumTableData(res.itemList, minSalaryKeys, setMinSalaryTableData);
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

  const content = (
    <>
      {dashboardReportIsLoading || dashboardReportIsFetching ? (
        <Modal title={"در حال ایجاد گزارش"}>
          <p className="paragraph-primary" style={{ textAlign: "center" }}>
            لطفا منتظر بمانید...
          </p>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "2rem 10rem",
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        </Modal>
      ) : null}
      <section className="flex-col u-margin-bottom-md">
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
                <div className="react-select-placeholder">
                  <span>*</span> نوع بازنشسته
                </div>
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
              <span>*</span> نوع بازنشسته
            </label>
          </div>

          <div className="inputBox__form">
            <Select
              closeMenuOnSelect={true}
              options={[
                { value: "null", label: "همه موارد" },
                ...organizationOptions,
              ]}
              components={animatedComponents}
              onChange={handleSelectOptionChange}
              value={organizationOptions.find(
                (item) => item.value === data?.organizationID
              )}
              name="organizationID"
              isLoading={organizationIsLoading || organizationIsFetching}
              isClearable={true}
              placeholder={
                <div className="react-select-placeholder">
                  <span>*</span> سازمان
                </div>
              }
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
              <span>*</span> سازمان
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
            <div className="inputBox__form--readOnly-label">
              <span>*</span> تاریخ از
            </div>
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
            <div className="inputBox__form--readOnly-label">
              <span>*</span> تاریخ تا
            </div>
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
          <div className="flex-col flex-center">
            <div className="flex-center">
              <h5
                className="title-secondary"
                style={{ marginBottom: "0", marginTop: "20px" }}
              >
                {`گزارش آماری ${
                  data.applicantTypeIsRetired === "true"
                    ? "بازنشسته"
                    : data.applicantTypeIsRetired === "false"
                    ? "مستمری بگیر"
                    : "بازنشسته و مستمری بگیر"
                }`}
              </h5>
            </div>

            <div className="flex-row">
              <DashboardSumGrid
                data={sumTableData}
                retiredType={data.applicantTypeIsRetired}
              />
              <DashboardHouseRightGrid
                data={houseRightTableData}
                retiredType={data.applicantTypeIsRetired}
              />
            </div>

            <div className="flex-center">
              <h5
                className="title-secondary"
                style={{ marginBottom: "0", marginTop: "20px" }}
              >
                تعداد افراد تحت تکفل
              </h5>
            </div>

            <div className="flex-row">
              <div className="flex-col">
                <UnderWarantyAmountMenGrid
                  data={uderWarantyMenTableData}
                  retiredType={data.applicantTypeIsRetired}
                />
                <SupplementaryGrid data={supplementaryTableData} />
              </div>
              <div className="flex-col">
                <UnderWarantyAmountWomenGrid
                  data={underWarantyWomenTableData}
                  retiredType={data.applicantTypeIsRetired}
                />
                <SacrificeCondtionsGrid data={ssacrificeTableData} />
              </div>
            </div>

            <div className="flex-center">
              <h5
                className="title-secondary"
                style={{ marginBottom: "0", marginTop: "20px" }}
              >
                حق عائله و اولاد افراد تحت تکفل
              </h5>
            </div>

            <div className="flex-row">
              <RelatedRightMenGrid data={relatedRightMenTableData} />
              <RelatedRightWomenGrid data={relatedRightWomenTableData} />
            </div>

            <div className="flex-col flex-center">
              <SacrificeAmountGrid data={sacrificeAmountTableData} />
            </div>
            <MinSalaryGrid data={minSalaryTableData} />
          </div>
        )}
      </section>
    </>
  );
  return content;
}

export default DashboardForm;
