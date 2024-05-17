// react imports
import { useState, useEffect, useCallback } from "react";

// redux imports
import { useLazyExistPaySlipQuery } from "../slices/payApiSlice";

// mui imports
import { LoadingButton } from "@mui/lab";
import {
  VisibilityOutlined as EyeIcon,
  ImportExportOutlined as ExportIcon,
} from "@mui/icons-material";

// helpers
import { convertToPersianNumber } from "../helper";

function SlipsForm() {
  const [isSlipExists, setIsSlipExists] = useState(false);

  // MAIN STATE
  const [slipObject, setSlipObject] = useState({});

  const [existPaySlip, { isLoading: isChecking }] = useLazyExistPaySlipQuery();

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

  const content = (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <select
            type="text"
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

        {slipObject.payType === "M" && (
          <div className="inputBox__form">
            <select
              type="text"
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

        <div className="inputBox__form">
          <select
            type="text"
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
            type="text"
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
      </form>

      <div style={{ marginRight: "auto" }} className="flex-row">
        {isSlipExists === true ? (
          <LoadingButton
            dir="ltr"
            endIcon={<EyeIcon />}
            loading={isChecking}
            disabled={Object.keys(slipObject).length < 4}
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
            disabled={Object.keys(slipObject).length < 4}
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
