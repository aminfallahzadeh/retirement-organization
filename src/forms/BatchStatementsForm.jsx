// react imports
import { useState, useEffect } from "react";

// redux imports
import { useGetRetirementStatementTypeQuery } from "../slices/sharedApiSlice.js";

// mui imports
import { LoadingButton } from "@mui/lab";
import {
  CalendarTodayOutlined as CalenderIcon,
  Outbox as OutboxIcon,
} from "@mui/icons-material";

// libary imports
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";

function BatchStatementsForm() {
  // DATE STATES
  const [selectedRunDate, setSelectedRunDate] = useState(null);
  const [isRunCalenderOpen, setIsRunCalenderOpen] = useState(false);

  // LOOKUP STATEs
  const [statementTypeCombo, setStatementTypeCombo] = useState([]);

  const {
    data: retirementStatementTypesComboItems,
    isSuccess: isStatementTypeSuccess,
  } = useGetRetirementStatementTypeQuery({});

  useEffect(() => {
    if (isStatementTypeSuccess) {
      setStatementTypeCombo(retirementStatementTypesComboItems.itemList);
    }
  }, [isStatementTypeSuccess, retirementStatementTypesComboItems]);

  // DATE HANDLERS
  const handleRunDateChange = (date) => {
    setSelectedRunDate(date);
    setIsRunCalenderOpen(false);
  };

  const handleRunDateOpenChange = (open) => {
    setIsRunCalenderOpen(open);
  };

  const content = (
    <section className="formContainer flex-col">
      <form
        method="POST"
        className="grid grid--col-5 u-margin-top-md"
        noValidate
      >
        <div className="inputBox__form">
          <input
            type="text"
            id="year"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="year" className="inputBox__form--label">
            <span>*</span> سال
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            id="sazman"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="sazman" className="inputBox__form--label">
            <span>*</span> سازمان
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            id="sexG"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="sexG" className="inputBox__form--label">
            <span>*</span> جنسیت
          </label>
        </div>
        <div className="inputBox__form">
          <InputDatePicker
            value={selectedRunDate}
            onChange={handleRunDateChange}
            format={"jYYYY/jMM/jDD"}
            onOpenChange={handleRunDateOpenChange}
            suffixIcon={<CalenderIcon color="action" />}
            open={isRunCalenderOpen}
            style={{
              border: "2px solid #cfcfcf",
              borderRadius: "6px",
              marginLeft: "0.5rem",
            }}
            wrapperStyle={{
              border: "none",
              cursor: "pointer",
            }}
          />
          <div className="inputBox__form--readOnly-label">تاریخ اجرا</div>
        </div>

        <div className="inputBox__form">
          <select
            type="text"
            className="inputBox__form--input"
            name="retirementStatementTypeID"
            // onChange={handleStatementDataChange}
            // value={statementObject?.retirementStatementTypeID}
            required
            id="retirementStatementTypeID"
          >
            <option value=" " disabled>
              انتخاب کنید
            </option>
            {statementTypeCombo?.map((type) => (
              <option
                value={type.retirementStatementTypeID}
                key={type.retirementStatementTypeID}
              >
                {type.retirementStatementTypeName}
              </option>
            ))}
          </select>
          <label
            className="inputBox__form--label"
            htmlFor="retirementStatementTypeID"
          >
            <span>*</span> نوع حکم
          </label>
        </div>
      </form>

      <div className="u-margin-top-md grid grid--col-2">
        <div className="inputBox__form">
          <select
            id="statementType"
            className="inputBox__form--input"
            required
            value=" "
          >
            <option value=" " disabled>
              انتخاب کنید
            </option>
            <option>حقوق مبنا</option>
            <option>حقوق مبنای بازنشسته</option>
            <option>حقوق مبنای موظف</option>
            <otpion>تکمیلی بازنشسته</otpion>
            <option>تکمیلی موظف</option>
            <option>حق اولاد بازنشسته</option>
            <option>حق اولاد موظف</option>
            <option>عائله مندی بازنشسته</option>
            <option>عائله مندی موظف</option>
          </select>
          <label htmlFor="statementType" className="inputBox__form--label">
            تنظیمات آیتم های حکم
          </label>
        </div>

        <div className="inputBox__form row-span-3">
          <textarea
            type="text"
            id="StatemnetDisc"
            className="inputBox__form--input"
            required
          ></textarea>
          <label htmlFor="StatemnetDisc" className="inputBox__form--label">
            شرح حکم
          </label>
        </div>
      </div>

      <div style={{ marginRight: "auto" }}>
        <LoadingButton
          dir="ltr"
          endIcon={<OutboxIcon />}
          variant="contained"
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ارسال</span>
        </LoadingButton>
      </div>
    </section>
  );
  return content;
}

export default BatchStatementsForm;
