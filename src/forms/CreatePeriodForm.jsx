// react imports
import { useState, useEffect } from "react";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { setPeriodsTableData } from "../slices/fractionDataSlice.js";

// mui imports
import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

// helpers
import { convertToPersianNumber, convertToEnglishNumber } from "../helper";
import { toast } from "react-toastify";

function CreatePeriodForm() {
  const [data, setData] = useState({});

  const { periodsTableData } = useSelector((state) => state.fractionData);

  const dispatch = useDispatch();

  // HADNLE MAIN DATA CHANGE
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleAddPeriod = () => {
    const isDuplicate = periodsTableData.some((item) => {
      return (
        item.periodMonth === convertToEnglishNumber(data.periodMonth) &&
        item.periodYear === convertToEnglishNumber(data.periodYear)
      );
    });

    if (isDuplicate) {
      toast.error("دوره تکراری است");
      return;
    }

    let periodDay;

    if (!data.periodDay || data.periodDay === "") {
      if (
        convertToEnglishNumber(data.periodMonth) === "01" ||
        convertToEnglishNumber(data.periodMonth) === "03" ||
        convertToEnglishNumber(data.periodMonth) === "04" ||
        convertToEnglishNumber(data.periodMonth) === "05" ||
        convertToEnglishNumber(data.periodMonth) === "06"
      ) {
        periodDay = "31";
      } else if (
        convertToEnglishNumber(data.periodMonth) === "07" ||
        convertToEnglishNumber(data.periodMonth) === "08" ||
        convertToEnglishNumber(data.periodMonth) === "09" ||
        convertToEnglishNumber(data.periodMonth) === "10" ||
        convertToEnglishNumber(data.periodMonth) === "11" ||
        convertToEnglishNumber(data.periodMonth) === "12"
      ) {
        periodDay = "30";
      }
    } else {
      periodDay = data.periodDay;
    }

    const newRecord = {
      ...data,
      periodDay,
      periodMonth: convertToEnglishNumber(data.periodMonth),
      periodYear: convertToEnglishNumber(data.periodYear),
      id: Date.now(),
    };
    dispatch(setPeriodsTableData(newRecord));
    setData({});
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <section className="formContainer-transparent flex-col">
      <form className="grid grid--col-4">
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
            <span>*</span> روز
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
            <span>*</span> ماه
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
            <span>*</span> سال
          </label>
        </div>

        <div className="flex-row flex-center">
          <Button
            dir="ltr"
            endIcon={<AddIcon />}
            variant="contained"
            color="success"
            sx={{ fontFamily: "sahel" }}
            onClick={handleAddPeriod}
          >
            <span>اضافه کردن دوره</span>
          </Button>
        </div>
      </form>
    </section>
  );
}

export default CreatePeriodForm;
