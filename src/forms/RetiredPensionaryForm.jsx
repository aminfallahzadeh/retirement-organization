// react imports
import { useState, useEffect } from "react";

// redux imports
import { useDispatch } from "react-redux";
import { useGetLookupDataQuery } from "../slices/sharedApiSlice.js";
import {
  useUpdateRetiredPensionaryMutation,
  useGetRetiredPensionaryQuery,
} from "../slices/retiredApiSlice.js";

// mui imports
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  CalendarTodayOutlined as CalenderIcon,
  Save as SaveIcon,
  EditOutlined as EditIcon,
} from "@mui/icons-material";

// helpers
import {
  convertToPersianDate,
  convertToPersianNumber,
  convertToEnglishNumber,
} from "../helper.js";

// libary imports
import { toast } from "react-toastify";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";

function RetiredPensionaryForm({ personID }) {
  const [editable, setEditable] = useState(false);
  const [employmentTypeCombo, setEmploymentTypeCombo] = useState([]);
  const [selectedRetriementDate, setSelectedRetriementDate] = useState(null);
  const [isRetriementCalenderOpen, setIsRetirementCalenderOpen] =
    useState(false);
  const [pensionaryData, setPensionaryData] = useState({});

  const [updateRetiredPensionary, { isLoading: isUpdating }] =
    useUpdateRetiredPensionaryMutation();

  const dispatch = useDispatch();

  const {
    data: pensionary,
    isSuccess: isPensionarySuccess,
    error: pensionaryError,
  } = useGetRetiredPensionaryQuery(personID);

  // fetch data
  useEffect(() => {
    if (isPensionarySuccess) {
      setPensionaryData(pensionary?.itemList[0]);
    }

    return () => {
      setPensionaryData({});
    };
  }, [isPensionarySuccess, pensionary, dispatch]);

  // handle error
  useEffect(() => {
    if (pensionaryError) {
      console.log(pensionaryError);
      toast.error(pensionaryError?.data?.message || pensionaryError.error, {
        autoClose: 2000,
      });
    }
  }, [pensionaryError]);

  const {
    data: employmentTypeComboItems,
    isSuccess: isEmploymentTypeComboSuccess,
    error: employmentTypeComboError,
  } = useGetLookupDataQuery({
    lookUpType: "EmploymentType",
  });

  // fetch combo data
  useEffect(() => {
    if (isEmploymentTypeComboSuccess) {
      setEmploymentTypeCombo(employmentTypeComboItems.itemList);
    }
  }, [isEmploymentTypeComboSuccess, employmentTypeComboItems]);

  useEffect(() => {
    if (employmentTypeComboError) {
      console.log(employmentTypeComboError);
      toast.error(
        employmentTypeComboError?.data?.message ||
          employmentTypeComboError.error,
        {
          autoClose: 2000,
        }
      );
    }
  }, [employmentTypeComboError]);

  // handle dates
  useEffect(() => {
    setSelectedRetriementDate(
      convertToPersianDate(pensionaryData?.retirementDate)
    );
  }, [pensionaryData?.retirementDate]);

  // useEffect(() => {
  //   if (selectedRetriementDate) {
  //     setPensionaryData({
  //       ...pensionaryData,
  //       retirementDate: selectedRetriementDate.toISOString(),
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedRetriementDate]);

  // other handlers
  const handleEditable = () => {
    setEditable(true);
  };

  const handleRetiredOpenChange = (open) => {
    setIsRetirementCalenderOpen(open);
  };

  const handleRetiredDateChange = (date) => {
    setSelectedRetriementDate(date);
    setIsRetirementCalenderOpen(false);
  };

  // handle pensionary data change
  const handlePensionaryDataChange = (e) => {
    const { name, value } = e.target;
    setPensionaryData({ ...pensionaryData, [name]: value });
  };

  // hanlde update retired pensionary
  const handleUpdateRetiredPensionary = async () => {
    try {
      const updateRes = await updateRetiredPensionary({
        ...pensionaryData,
        retiredGroup: parseInt(
          convertToEnglishNumber(pensionaryData.retiredGroup)
        ),
        retiredOrganizationID: convertToEnglishNumber(
          pensionaryData.retiredOrganizationID
        ),
        pensionaryIsActive:
          pensionaryData.pensionaryIsActive === "true" ? true : false,
        retiredJobDegreeCoef: parseInt(
          convertToEnglishNumber(pensionaryData.retiredJobDegreeCoef)
        ),
        retiredRealDuration: parseInt(
          convertToEnglishNumber(pensionaryData.retiredRealDuration)
        ),
        retiredGrantDuration: parseInt(
          convertToEnglishNumber(pensionaryData.retiredGrantDuration)
        ),
      }).unwrap();
      setEditable(false);
      toast.success(updateRes.message, {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  const content = (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-3" noValidate>
        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="retiredGroup"
            name="retiredGroup"
            className="inputBox__form--input"
            value={convertToPersianNumber(pensionaryData?.retiredGroup) ?? ""}
            onChange={handlePensionaryDataChange}
            required
          />
          <label htmlFor="retiredGroup" className="inputBox__form--label">
            <span>*</span> گروه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="retiredOrganizationID"
            name="retiredOrganizationID"
            value={
              convertToPersianNumber(pensionaryData?.retiredOrganizationID) ??
              ""
            }
            onChange={handlePensionaryDataChange}
            className="inputBox__form--input"
            required
          />
          <label
            htmlFor="retiredOrganizationID"
            className="inputBox__form--label"
          >
            <span>*</span> آخرین محل خدمت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="retiredLastPosition"
            name="retiredLastPosition"
            value={pensionaryData?.retiredLastPosition || ""}
            onChange={handlePensionaryDataChange}
            className="inputBox__form--input"
            required
          />
          <label
            htmlFor="retiredLastPosition"
            className="inputBox__form--label"
          >
            <span>*</span> سمت
          </label>
        </div>
        <div className="inputBox__form">
          <select
            disabled={!editable}
            type="text"
            id="employmentTypeID"
            name="employmentTypeID"
            value={pensionaryData?.employmentTypeID || ""}
            onChange={handlePensionaryDataChange}
            className="inputBox__form--input"
            required
          >
            <option value=" ">انتخاب کنید</option>
            {employmentTypeCombo?.map((item) => (
              <option key={item.lookUpID} value={item.lookUpID}>
                {item.lookUpName}
              </option>
            ))}
          </select>
          <label htmlFor="employmentTypeID" className="inputBox__form--label">
            <span>*</span> نوع استخدام
          </label>
        </div>

        <div className="inputBox__form">
          <InputDatePicker
            disabled={!editable}
            value={selectedRetriementDate}
            onChange={handleRetiredDateChange}
            format={"jYYYY-jMM-jDD"}
            onOpenChange={handleRetiredOpenChange}
            suffixIcon={<CalenderIcon color="action" />}
            open={isRetriementCalenderOpen}
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
          <div className="inputBox__form--readOnly-label">تاریخ بازنشستگی</div>
        </div>

        <div className="inputBox__form">
          <select
            disabled={!editable}
            className="inputBox__form--input"
            id="pensionaryIsActive"
            style={{ cursor: "pointer" }}
            name="pensionaryIsActive"
            required
            value={pensionaryData?.pensionaryIsActive || " "}
            onChange={handlePensionaryDataChange}
          >
            <option value=" ">انتخاب کنید</option>
            <option value="true">فعال</option>
            <option value="false">غیر فعال</option>
          </select>
          <label className="inputBox__form--label" htmlFor="pensionaryIsActive">
            وضعیت
          </label>
        </div>

        <div className="inputBox__form StaffInfoForm__flex--item">
          <input
            disabled={!editable}
            type="text"
            id="retiredJobDegreeCoef"
            className="inputBox__form--input"
            value={
              convertToPersianNumber(pensionaryData?.retiredJobDegreeCoef) ?? ""
            }
            onChange={handlePensionaryDataChange}
            name="retiredJobDegreeCoef"
            required
          />
          <label
            htmlFor="retiredJobDegreeCoef"
            className="inputBox__form--label"
          >
            ضریب مدیریتی
          </label>
        </div>
        <div className="inputBox__form StaffInfoForm__flex--item">
          <input
            disabled={!editable}
            type="text"
            id="retiredRealDuration"
            className="inputBox__form--input"
            value={
              convertToPersianNumber(pensionaryData?.retiredRealDuration) ?? ""
            }
            onChange={handlePensionaryDataChange}
            name="retiredRealDuration"
            required
          />
          <label
            htmlFor="retiredRealDuration"
            className="inputBox__form--label"
          >
            سابقه حقیقی بازنشسته
          </label>
        </div>
        <div className="inputBox__form StaffInfoForm__flex--item">
          <input
            disabled={!editable}
            type="text"
            id="retiredGrantDuration"
            className="inputBox__form--input"
            value={
              convertToPersianNumber(pensionaryData?.retiredGrantDuration) ?? ""
            }
            onChange={handlePensionaryDataChange}
            name="retiredGrantDuration"
            required
          />
          <label
            htmlFor="retiredGrantDuration"
            className="inputBox__form--label"
          >
            سابقه ارفاقی بازنشسته
          </label>
        </div>
      </form>

      <div style={{ marginRight: "auto" }} className="flex-row">
        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          loading={isUpdating}
          onClick={handleUpdateRetiredPensionary}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ذخیره</span>
        </LoadingButton>

        <Button
          dir="ltr"
          endIcon={<EditIcon />}
          onClick={handleEditable}
          disabled={editable}
          variant="contained"
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ویرایش</span>
        </Button>
      </div>
    </section>
  );
  return content;
}

export default RetiredPensionaryForm;
