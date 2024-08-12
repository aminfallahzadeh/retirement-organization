// react imports
import { useState, useEffect, useCallback } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useDispatch } from "react-redux";
import {
  useLazyExistPaySlipQuery,
  useLazyGetPayListQuery,
  useIssuePayMutation,
  useInsertPayMutation,
} from "../slices/payApiSlice";
import { setSlipsTableData } from "../slices/slipsDataSlice";

// mui imports
import { LoadingButton } from "@mui/lab";
import {
  VisibilityOutlined as EyeIcon,
  ImportExportOutlined as ExportIcon,
} from "@mui/icons-material";

// helpers
import { convertToEnglishNumber } from "../helper";

// library imports
import { toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// utils
import { selectStyles, selectSettings } from "../utils/reactSelect";

function SlipsForm() {
  const [isSlipExists, setIsSlipExists] = useState(null);

  // MAIN STATE
  const [data, setData] = useState({});

  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();

  // SELECT OPTIONS
  const issueTypeOptions = [
    { value: "1", label: "گروهی" },
    { value: "2", label: "انفرادی" },
  ];

  const payTypeOptions = [
    { value: "M", label: "شهرداری" },
    { value: "C", label: "کشوری" },
    { value: "E", label: "مزایا" },
  ];

  const currentYearOptions = [
    { value: "1403", label: "۱۴۰۳" },
    { value: "1402", label: "۱۴۰۲" },
    { value: "1401", label: "۱۴۰۱" },
    { value: "1400", label: "۱۴۰۰" },
    { value: "1399", label: "۱۳۹۹" },
    { value: "1398", label: "۱۳۹۸" },
    { value: "1397", label: "۱۳۹۷" },
    { value: "1396", label: "۱۳۹۶" },
    { value: "1395", label: "۱۳۹۵" },
    { value: "1394", label: "۱۳۹۴" },
    { value: "1393", label: "۱۳۹۳" },
    { value: "1392", label: "۱۳۹۲" },
    { value: "1391", label: "۱۳۰۱" },
    { value: "1390", label: "۱۳۹۰" },
  ];

  const currentMonthOptions = [
    { value: "1", label: "فروردین" },
    { value: "2", label: "اردیبهشت" },
    { value: "3", label: "خرداد" },
    { value: "4", label: "تیر" },
    { value: "5", label: "مرداد" },
    { value: "6", label: "شهریور" },
    { value: "7", label: "مهر" },
    { value: "8", label: "آبان" },
    { value: "9", label: "آذر" },
    { value: "10", label: "دی" },
    { value: "11", label: "بهمن" },
    { value: "12", label: "اسفند" },
  ];

  const personsOptions = [
    { value: "49e66fb39a124555b9329c9b7994509a", label: "amin amin" },
    { value: "810e59798cc54b94b45cd0c776fff16b", label: "علی اسدی" },
    { value: "4fba2ae8420348fc9d16b21a55fef23f", label: "امیر بابیک" },
    { value: "e931cee492514557a6cba93fa7f3fbd4", label: "زهرا بابیک" },
    { value: "110000256", label: "مهدی بشارت صنعتی" },
    { value: "7777701a948e411aa204bc350utkt5", label: "سونیا گلدوست" },
    { value: "1c81794b5d4447aba8bea1ae915ae756", label: "بهمن محمدی" },
    { value: "19d06de3cf8c44a3b832b46ed0276b90", label: "مریم مهرجو" },
    { value: "7777701a948e411aa204bc350a56f155", label: "شیما میرباقری" },
    { value: "8b2a301a948e411aa204bc350a56f155", label: "احسان میرباقری" },
  ];

  // ACCESS QUERIES
  const [existPaySlip, { isLoading: isChecking }] = useLazyExistPaySlipQuery();
  const [getPayList, { isLoading: isGettingPayList }] =
    useLazyGetPayListQuery();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const requestID = searchParams.get("requestID");

  const [issuePay, { isLoading: isIssuing }] = useIssuePayMutation();
  const [insertPay, { isLoading: isInserting }] = useInsertPayMutation();

  // SLIP CHECKER FUNCTION
  const slipChecker = useCallback(
    async ({ payType, currentYear, currentMonth }) => {
      try {
        const res = await existPaySlip({
          payType,
          currentYear: parseInt(currentYear),
          currentMonth: parseInt(currentMonth),
        }).unwrap();
        setIsSlipExists(res);
      } catch (err) {
        console.log(err);
      }
    },
    [existPaySlip]
  );

  // CHANGE HANLDERS
  // const handleSlipObjectChange = (e) => {
  //   const { name, value } = e.target;
  //   setSlipObject({ ...slipObject, [name]: value });
  // };

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

  // CHECK SLIP EXISTANCE ON USER DATA ENTER
  useEffect(() => {
    if (data.payType && data.currentYear && data.currentMonth) {
      slipChecker({
        payType: data.payType,
        currentYear: data.currentYear,
        currentMonth: data.currentMonth,
      });
    }
  }, [slipChecker, data]);

  // GET PAY LST HANDLER
  const getPayListHandler = async () => {
    try {
      const res = await getPayList({
        currentYear: parseInt(data.currentYear),
        currentMonth: parseInt(data.currentMonth),
        payType: data.payType,
      }).unwrap();
      const mappedData = res.itemList.map((item, index) => ({
        id: item.payID,
        rowNum: index + 1,
        payFirstName: item.payFirstName,
        payLastName: item.payLastName,
        accountNo: item.accountNo,
        payDebitAmount: item.payDebitAmount,
        payCreditAmount: item.payCreditAmount,
        payAmount: item.payAmount,
        payDate: item.payDate,
      }));
      dispatch(setSlipsTableData(mappedData));
    } catch (err) {
      console.log(err);
    }
  };

  // ISSUE GROUP SLIP HANDLER
  const insertGroupPayHandler = async () => {
    try {
      const date = new Date();
      const res = await issuePay({
        currentYear: parseInt(data.currentYear),
        currentMonth: parseInt(data.currentMonth),
        requestID,
        payDate: date.toISOString(),
      }).unwrap();
      setIsSlipExists(true);
      getPayListHandler();
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

  const insertSoloPayHandler = async () => {
    try {
      const date = new Date();
      const res = await insertPay({
        payDate: date.toISOString(),
        currentYear: parseInt(data.currentYear),
        currentMonth: parseInt(data.currentMonth),
        requestID,
        personID: convertToEnglishNumber(data.personID),
      }).unwrap();
      setIsSlipExists(true);
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  const content = (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={issueTypeOptions}
            onChange={handleSelectOptionChange}
            value={issueTypeOptions.find(
              (item) => item.value === data?.issueType
            )}
            name="issueType"
            isClearable={true}
            placeholder={
              <div className="react-select-placeholder">
                <span>*</span> نوع صدور
              </div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
          />

          <label
            className={
              data?.issueType
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            <span>*</span> نوع صدور
          </label>
        </div>

        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={payTypeOptions}
            onChange={handleSelectOptionChange}
            value={payTypeOptions.find((item) => item.value === data?.payType)}
            name="payType"
            isClearable={true}
            placeholder={
              <div className="react-select-placeholder">
                <span>*</span> نوع فیش
              </div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
          />

          <label
            className={
              data?.payType
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            <span>*</span> نوع فیش
          </label>
        </div>

        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={currentYearOptions}
            onChange={handleSelectOptionChange}
            value={currentYearOptions.find(
              (item) => item.value === data?.currentYear
            )}
            name="currentYear"
            isClearable={true}
            placeholder={
              <div className="react-select-placeholder">
                <span>*</span> سال مالی
              </div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
          />

          <label
            className={
              data?.currentYear
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            <span>*</span> سال مالی
          </label>
        </div>

        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={currentMonthOptions}
            onChange={handleSelectOptionChange}
            value={currentMonthOptions.find(
              (item) => item.value === data?.currentMonth
            )}
            name="currentMonth"
            isClearable={true}
            placeholder={
              <div className="react-select-placeholder">
                <span>*</span> ماه
              </div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
          />

          <label
            className={
              data?.currentMonth
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            <span>*</span> ماه
          </label>
        </div>

        {data.issueType === "2" && isSlipExists === false && (
          <div className="inputBox__form">
            <Select
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={personsOptions}
              onChange={handleSelectOptionChange}
              value={personsOptions.find(
                (item) => item.value === data?.personID
              )}
              name="personID"
              isClearable={true}
              placeholder={
                <div className="react-select-placeholder">
                  <span>*</span> شماره کارمندی
                </div>
              }
              noOptionsMessage={selectSettings.noOptionsMessage}
              loadingMessage={selectSettings.loadingMessage}
              styles={selectStyles}
            />

            <label
              className={
                data?.personID
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              <span>*</span> شماره کارمندی
            </label>
          </div>
        )}
      </form>

      <div style={{ marginRight: "auto" }} className="flex-row">
        {isSlipExists === true ? (
          <LoadingButton
            dir="ltr"
            endIcon={<EyeIcon />}
            loading={isChecking || isGettingPayList}
            onClick={getPayListHandler}
            disabled={Object.keys(data).length < 4}
            variant="contained"
            color="primary"
            sx={{ fontFamily: "sahel" }}
          >
            <span>مشاهده</span>
          </LoadingButton>
        ) : (
          <LoadingButton
            dir="ltr"
            endIcon={<ExportIcon />}
            loading={isChecking || isInserting || isIssuing}
            onClick={
              data.issueType === "2"
                ? insertSoloPayHandler
                : insertGroupPayHandler
            }
            disabled={Object.keys(data).length < 4}
            variant="contained"
            color="warning"
            sx={{ fontFamily: "sahel" }}
          >
            <span>صدور</span>
          </LoadingButton>
        )}
      </div>
    </section>
  );

  return content;
}

export default SlipsForm;
