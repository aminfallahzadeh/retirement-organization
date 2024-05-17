// react imports
import { useState, useEffect, useCallback } from "react";

// redux imports
import { useDispatch } from "react-redux";
import {
  useLazyExistPaySlipQuery,
  useLazyGetPayListQuery,
  useIssuePayMutation,
} from "../slices/payApiSlice";
import { setSlipsTableData } from "../slices/slipsDataSlice";

// mui imports
import { LoadingButton } from "@mui/lab";
import {
  VisibilityOutlined as EyeIcon,
  ImportExportOutlined as ExportIcon,
} from "@mui/icons-material";

// helpers
import { convertToPersianNumber, convertToEnglishNumber } from "../helper";

// library imports
import { toast } from "react-toastify";

function SlipsForm() {
  const [isSlipExists, setIsSlipExists] = useState(null);

  // MAIN STATE
  const [slipObject, setSlipObject] = useState({});

  const dispatch = useDispatch();

  const [existPaySlip, { isLoading: isChecking }] = useLazyExistPaySlipQuery();
  const [getPayList, { isLoading: isGettingPayList }] =
    useLazyGetPayListQuery();

  const [issuePay, { isLoading: isIssuing, isSuccess, error }] =
    useIssuePayMutation();

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
  const handleSlipObjectChange = (e) => {
    const { name, value } = e.target;
    setSlipObject({ ...slipObject, [name]: value });
  };

  useEffect(() => {
    console.log(isSlipExists);
  }, [isSlipExists, slipObject]);

  // CHECK SLIP EXISTANCE ON USER DATA ENTER
  useEffect(() => {
    if (slipObject.payType && slipObject.year && slipObject.month) {
      slipChecker({
        payType: slipObject.payType,
        currentYear: slipObject.year,
        currentMonth: slipObject.month,
      });
    }
  }, [slipChecker, slipObject]);

  // GET PAY LST HANDLER
  const getPayListHandler = async () => {
    try {
      const res = await getPayList({
        personID: convertToEnglishNumber(slipObject.personID),
        currentYear: parseInt(slipObject.year),
        currentMonth: parseInt(slipObject.month),
      }).unwrap();
      dispatch(setSlipsTableData(res));
    } catch (err) {
      console.log(err);
    }
  };

  // ISSUE SLIP HANDLER
  const issuePayHandler = async () => {
    try {
      const res = await issuePay({
        personID: convertToEnglishNumber(slipObject.personID) || null,
        currentYear: parseInt(slipObject.year),
        currentMonth: parseInt(slipObject.month),
      }).unwrap();
      console.log(res);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    console.log(slipObject);
  }, [slipObject]);

  const content = (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <select
            name="payType"
            className="inputBox__form--input"
            onChange={handleSlipObjectChange}
            value={slipObject?.payType || " "}
            required
            id="payType"
          >
            <option value=" " disabled>
              انتخاب کنید{" "}
            </option>
            <option value="M">شهرداری</option>
            <option value="C" disabled>
              کشوری
            </option>
            <option value="E" disabled>
              مزایا
            </option>
          </select>
          <label className="inputBox__form--label" htmlFor="payType">
            نوع فیش
          </label>
        </div>

        <div className="inputBox__form">
          <select
            className="inputBox__form--input"
            name="year"
            onChange={handleSlipObjectChange}
            value={slipObject?.year || " "}
            required
            id="year"
          >
            <option value=" " disabled>
              انتخاب کنید
            </option>
            <option value="1390">۱۳۹۰</option>
            <option value="1391">۱۳۹۱</option>
            <option value="1392">۱۳۹۲</option>
            <option value="1393">۱۳۹۳</option>
            <option value="1394">۱۳۹۴</option>
            <option value="1395">۱۳۹۵</option>
            <option value="1396">۱۳۹۶</option>
            <option value="1397">۱۳۹۷</option>
            <option value="1398">۱۳۹۸</option>
            <option value="1399">۱۳۹۹</option>
            <option value="1400">۱۴۰۰</option>
            <option value="1401">۱۴۰۱</option>
            <option value="1402">۱۴۰۲</option>
            <option value="1403">۱۴۰۳</option>
            <option value="1404">۱۴۰۴</option>
            <option value="1405">۱۴۰۵</option>
            <option value="1406">۱۴۰۶</option>
            <option value="1407">۱۴۰۷</option>
            <option value="1408">۱۴۰۸</option>
            <option value="1409">۱۴۰۹</option>
            <option value="1410">۱۴۱۰</option>
            <option value="1411">۱۴۱۱</option>
            <option value="1412">۱۴۱۲</option>
            <option value="1413">۱۴۱۳</option>
            <option value="1414">۱۴۱۴</option>
            <option value="1415">۱۴۱۵</option>
            <option value="1416">۱۴۱۶</option>
            <option value="1417">۱۴۱۷</option>
            <option value="1418">۱۴۱۸</option>
            <option value="1419">۱۴۱۹</option>
            <option value="1420">۱۴۲۰</option>
          </select>
          <label className="inputBox__form--label" htmlFor="year">
            سال مالی
          </label>
        </div>

        <div className="inputBox__form">
          <select
            className="inputBox__form--input"
            required
            name="month"
            onChange={handleSlipObjectChange}
            value={convertToPersianNumber(slipObject?.month) || " "}
            id="month"
          >
            <option value=" " disabled>
              انتخاب کنید
            </option>
            <option value="1">فروردین</option>
            <option value="2">اردیبهشت</option>
            <option value="3">خرداد</option>
            <option value="4">تیر</option>
            <option value="5">مرداد</option>
            <option value="6">شهریور</option>
            <option value="7">مهر</option>
            <option value="8">آبان</option>
            <option value="9">آذر</option>
            <option value="10">دی</option>
            <option value="11">بهمن</option>
            <option value="12">اسفند</option>
          </select>
          <label className="inputBox__form--label" htmlFor="month">
            ماه
          </label>
        </div>

        {isSlipExists === false && (
          <div className="inputBox__form">
            <select
              name="condition"
              className="inputBox__form--input"
              onChange={handleSlipObjectChange}
              value={slipObject?.condition || " "}
              required
              id="condition"
            >
              <option value=" " disabled>
                انتخاب کنید{" "}
              </option>
              <option value="1">انفرادی</option>
              <option value="2">گروهی</option>
            </select>
            <label className="inputBox__form--label" htmlFor="condition">
              حالت درخواست
            </label>
          </div>
        )}

        {slipObject.condition === "1" && (
          <div className="inputBox__form">
            <input
              type="text"
              id="personID"
              name="personID"
              onChange={handleSlipObjectChange}
              required
              className="inputBox__form--input"
              value={convertToPersianNumber(slipObject?.personID) || ""}
            />
            <label className="inputBox__form--label" htmlFor="personID">
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
            disabled={Object.keys(slipObject).length < 5}
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
            loading={isChecking}
            disabled={
              Object.keys(slipObject).length < 5 || !slipObject.personID
            }
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
