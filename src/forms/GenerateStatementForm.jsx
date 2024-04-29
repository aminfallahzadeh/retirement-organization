// react imports
import { useEffect, useState } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";
import { useGetRetirementStatementTypeQuery } from "../slices/sharedApiSlice.js";
import { useGenerateNewRetirementStatementMutation } from "../slices/retirementStatementApiSlice.js";

// mui imports
import { LoadingButton } from "@mui/lab";
import {
  Save as SaveIcon,
  CalendarTodayOutlined as CalenderIcon,
} from "@mui/icons-material";

// libary imports
import { toast } from "react-toastify";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";

function GenerateStatementForm({ setShowGenerateStatementModal }) {
  const { pensionaryID } = useSelector((state) => state.retiredState);

  const [slectedRunDate, setSelectedRunDate] = useState(null);
  const [isRunDateCalenderOpen, setIsRunDateCalenderOpen] = useState(false);

  const [statementTypeCombo, setStatementTypeCombo] = useState([]);

  const [statementObject, setStatementObject] = useState({});

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  const [generateNewRetirementStatement, { isLoading }] =
    useGenerateNewRetirementStatementMutation();

  const { data: retirementStatementTypesComboItems, isSuccess } =
    useGetRetirementStatementTypeQuery();

  useEffect(() => {
    if (isSuccess) {
      setStatementTypeCombo(retirementStatementTypesComboItems.itemList);
    }
  }, [isSuccess, retirementStatementTypesComboItems]);

  // CHANGE HANDLERS
  const handleRunDateOpenChange = (open) => {
    setIsRunDateCalenderOpen(open);
  };

  const handleStatementDataChange = (e) => {
    const { name, value } = e.target;
    setStatementObject((statementObject) => ({
      ...statementObject,
      [name]: value,
    }));
  };

  const handleRunDateChange = (date) => {
    setSelectedRunDate(date);
    setIsRunDateCalenderOpen(false);
  };

  const handleGenerateStatement = async () => {
    try {
      // Adjusting for timezone difference
      const retirementStatementRunDate = new Date(slectedRunDate);
      retirementStatementRunDate.setMinutes(
        retirementStatementRunDate.getMinutes() -
          retirementStatementRunDate.getTimezoneOffset()
      );
      const generateRes = await generateNewRetirementStatement({
        ...statementObject,
        retirementStatementRunDate,
        personID,
        pensionaryID,
      }).unwrap();
      console.log(generateRes);
      setShowGenerateStatementModal(false);
      toast.success(generateRes.message, {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  return (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-2">
        <div className="inputBox__form">
          <InputDatePicker
            value={slectedRunDate}
            defaultValue={null}
            onChange={handleRunDateChange}
            onOpenChange={handleRunDateOpenChange}
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
        <div className="inputBox__form">
          <select
            type="text"
            className="inputBox__form--input"
            name="retirementStatementTypeID"
            onChange={handleStatementDataChange}
            value={statementObject?.retirementStatementTypeID}
            required
            id="retirementStatementTypeID"
          >
            <option value=" ">انتخاب نوع حکم</option>
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

        <div className="inputBox__form col-span-2 row-span-2">
          <textarea
            type="text"
            className="inputBox__form--input"
            value={statementObject?.retirementStatementDesc}
            name="retirementStatementDesc"
            onChange={handleStatementDataChange}
            required
            id="retirementStatementDesc"
          ></textarea>
          <label
            className="inputBox__form--label"
            htmlFor="retirementStatementDesc"
          >
            شرح حکم
          </label>
        </div>
      </form>

      <div style={{ marginRight: "auto" }}>
        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          onClick={handleGenerateStatement}
          loading={isLoading}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ذخیره</span>
        </LoadingButton>
      </div>
    </section>
  );
}

export default GenerateStatementForm;
