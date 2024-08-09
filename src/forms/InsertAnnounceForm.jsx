// react imports
import { useState, useEffect, useRef } from "react";

// redux imports
import { useInsertAnnounceMutation } from "../slices/announceApiSlice";

// hooks
import { useCloseCalender } from "../hooks/useCloseCalender";

// mui imports
import { LoadingButton } from "@mui/lab";
import {
  Save as SaveIcon,
  CalendarTodayOutlined as CalenderIcon,
} from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";

// utils
import { datePickerStyles, datePickerWrapperStyles } from "../utils/datePicker";

function InsertAnnounceForm() {
  const runDateCalenderRef = useRef(null);

  // MAIN STATE
  const [data, setData] = useState({});

  // CALENDER STATES
  const [selectedSendDate, setSelectedSendDate] = useState(null);
  const [isSendDateCalenderOpen, setIsSendDateCalenderOpen] = useState(false);

  // ACCESS INSERT ANNOUNCE QUERY
  const [insertAnnounce, { isLoading, isFetching }] =
    useInsertAnnounceMutation();

  // HADNLERS
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSendDateChange = (date) => {
    setSelectedSendDate(date);
    setIsSendDateCalenderOpen(false);
  };

  const handleSendCalenderOpenChange = (open) => {
    setIsSendDateCalenderOpen(open);
  };

  // DEBUGGING
  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(selectedSendDate);
  }, [selectedSendDate]);

  const handleInsertAnnounce = async () => {
    try {
      let runDate;

      if (selectedSendDate) {
        runDate = new Date(selectedSendDate);
        runDate.setMinutes(runDate.getMinutes() - runDate.getTimezoneOffset());
      } else {
        runDate = null;
      }

      const res = await insertAnnounce({
        runDate,
        title: data.title,
        isDeleted: false,
        description: data.description,
      }).unwrap();
      console.log(res);
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
  useCloseCalender([runDateCalenderRef], [setIsSendDateCalenderOpen]);

  const content = (
    <section className="flex-col formContainer">
      <form method="POST" className="grid grid--col-2">
        <div className="inputBox__form">
          <input
            type="text"
            name="title"
            value={data.title || ""}
            id="title"
            onChange={handleDataChange}
            className="inputBox__form--input"
            required
          />
          <label htmlFor="title" className="inputBox__form--label">
            <span>*</span> عنوان اطلاعیه
          </label>
        </div>

        <div className="inputBox__form">
          <InputDatePicker
            value={selectedSendDate}
            onChange={handleSendDateChange}
            format={"jYYYY/jMM/jDD"}
            onOpenChange={handleSendCalenderOpenChange}
            suffixIcon={<CalenderIcon color="action" />}
            open={isSendDateCalenderOpen}
            style={datePickerStyles}
            wrapperStyle={datePickerWrapperStyles}
            pickerProps={{
              ref: runDateCalenderRef,
            }}
          />
          <div className="inputBox__form--readOnly-label">
            <span>*</span> تاریخ ارسال
          </div>
        </div>

        <div className="inputBox__form col-span-2 row-span-3">
          <textarea
            type="text"
            id="description"
            name="description"
            onChange={handleDataChange}
            className="inputBox__form--input"
            required
          ></textarea>
          <label htmlFor="description" className="inputBox__form--label">
            <span>*</span> متن اطلاعیه
          </label>
        </div>
      </form>

      <div style={{ marginRight: "auto" }}>
        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          onClick={handleInsertAnnounce}
          loading={isLoading || isFetching}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ذخیره</span>
        </LoadingButton>
      </div>
    </section>
  );
  return content;
}

export default InsertAnnounceForm;
