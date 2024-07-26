// react imports
import { useState } from "react";

// redux imports
import { useDispatch } from "react-redux";
import { setPeriodsTableData } from "../slices/fractionDataSlice.js";

// mui imports
import { Button } from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";

// helpers
import { convertToPersianNumber } from "../helper";

function CreatePeriodForm({ setShowAddPeriodModal }) {
  const [data, setData] = useState({});

  const dispatch = useDispatch();

  // HADNLE MAIN DATA CHANGE
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleAddPeriod = () => {
    const newRecord = {
      ...data,
      id: Date.now(),
    };
    dispatch(setPeriodsTableData(newRecord));
    setData({});
    setShowAddPeriodModal(false);
  };

  return (
    <section className="formContainer-transparent flex-col">
      <form className="grid grid--col-2">
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            name="periodDay"
            value={convertToPersianNumber(data.periodDay) || ""}
            onChange={handleDataChange}
            required
            id="periodDay"
          />
          <label className="inputBox__form--label" htmlFor="periodDay">
            روز
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            name="periodMonth"
            value={convertToPersianNumber(data.periodMonth) || ""}
            onChange={handleDataChange}
            required
            id="periodMonth"
          />
          <label className="inputBox__form--label" htmlFor="periodMonth">
            ماه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            name="periodYear"
            value={convertToPersianNumber(data.periodYear) || ""}
            onChange={handleDataChange}
            required
            id="periodYear"
          />
          <label className="inputBox__form--label" htmlFor="periodYear">
            سال
          </label>
        </div>
      </form>

      <div style={{ marginRight: "auto" }}>
        <Button
          dir="ltr"
          endIcon={<SaveIcon />}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
          onClick={handleAddPeriod}
        >
          <span>ذخیره</span>
        </Button>
      </div>
    </section>
  );
}

export default CreatePeriodForm;
