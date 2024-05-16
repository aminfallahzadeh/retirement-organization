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
import { convertToPersianNumber, convertToEnglishNumber } from "../helper";

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
          currentYear,
          currentMonth,
        }).unwrap();
        console.log(res);
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
    console.log(slipObject);
  }, [slipObject]);

  // CHECK SLIP EXISTANCE ON USER DATA ENTER
  useEffect(() => {
    if (slipObject.payType) {
      slipChecker(slipObject.payType);
    }
  }, [slipChecker, slipObject.payType]);

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

        {slipObject.fishType === "M" && (
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
          <input
            type="text"
            className="inputBox__form--input"
            name="year"
            onChange={handleSlipObjectChange}
            value={convertToPersianNumber(slipObject?.year) || ""}
            required
            id="year"
          />
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
            <option value="فروردین">فروردین</option>
            <option value="اردیبهشت">اردیبهشت</option>
            <option value="خرداد">خرداد</option>
            <option value="تیر">تیر</option>
            <option value="مرداد">مرداد</option>
            <option value="شهریور">شهریور</option>
            <option value="مهر">مهر</option>
            <option value="آبان">آبان</option>
            <option value="آذر">آذر</option>
            <option value="دی">دی</option>
            <option value="بهمن">بهمن</option>
            <option value="اسفند">اسفند</option>
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
