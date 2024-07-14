// react imports
import { useState } from "react";

// mui imports
import { CalendarTodayOutlined as CalenderIcon } from "@mui/icons-material";

// library imports
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";

function StatementItemsForm() {
  const [selectedRunDate, setSelectedRunDate] = useState(null);
  const [isRunDateCalenderOpen, setIsRunDateCalenderOpen] = useState(false);

  // DATE HANDLER
  const hadnleRunDateOpenChange = (open) => {
    setIsRunDateCalenderOpen(open);
  };

  const handleRunDateChange = (date) => {
    setSelectedRunDate(date);
    setIsRunDateCalenderOpen(false);
  };

  return (
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
          <div className="inputBox__form--readOnly-label">
            <span>*</span> تاریخ اجرا
          </div>
        </div>
      </form>
    </section>
  );
}

export default StatementItemsForm;
