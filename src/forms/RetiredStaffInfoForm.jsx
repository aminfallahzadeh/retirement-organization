// react imports
import { useState, useEffect } from "react";

// redux imports
import { setPersonObject } from "../slices/retiredStateSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { useGetLookupDataQuery } from "../slices/sharedApiSlice.js";
import { useUpdateRetiredMutation } from "../slices/retiredApiSlice.js";

// mui imports
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  CalendarTodayOutlined as CalenderIcon,
  Save as SaveIcon,
  EditOutlined as EditIcon,
} from "@mui/icons-material";

// helpers
import { convertToPersianDate } from "../helper.js";

// libary imports
import { toast } from "react-toastify";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";

function RetiredStaffInfoForm() {
  const [employmentTypeCombo, setEmploymentTypeCombo] = useState([]);
  const [selectedRetriementDate, setSelectedRetriementDate] = useState(null);
  const [isRetriementCalenderOpen, setIsRetirementCalenderOpen] =
    useState(false);

  const { token } = useSelector((state) => state.auth);
  const { personObject } = useSelector((state) => state.retiredState);

  const dispatch = useDispatch();

  const {
    data: employmentTypeComboItems,
    isSuccess: isEmploymentTypeComboSuccess,
    error: employmentTypeComboError,
  } = useGetLookupDataQuery({
    token,
    lookUpType: "EmploymentType",
  });

  useEffect(() => {
    if (isEmploymentTypeComboSuccess) {
      setEmploymentTypeCombo(employmentTypeComboItems.itemList);
    }
  }, [isEmploymentTypeComboSuccess, employmentTypeComboItems]);

  useEffect(() => {
    setSelectedRetriementDate(
      convertToPersianDate(personObject.retirementDate)
    );
  }, [personObject.retirementDate]);

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

  useEffect(() => {
    if (selectedRetriementDate) {
      dispatch(
        setPersonObject({
          ...personObject,
          retirementDate: selectedRetriementDate.toISOString(),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRetriementDate]);

  const handlePersonObjectChange = (e) => {
    const { name, value } = e.target;
    dispatch(setPersonObject({ ...personObject, [name]: value }));
  };

  const handleRetiredOpenChange = (open) => {
    setIsRetirementCalenderOpen(open);
  };

  const handleRetiredDateChange = (date) => {
    setSelectedRetriementDate(date);
    setIsRetirementCalenderOpen(false);
  };

  const content = (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-3" noValidate>
        <div className="inputBox__form">
          <input
            type="text"
            id="retiredGroup"
            name="retiredGroup"
            className="inputBox__form--input"
            value={personObject?.retiredGroup ?? ""}
            onChange={handlePersonObjectChange}
            required
          />
          <label htmlFor="retiredGroup" className="inputBox__form--label">
            <span>*</span> گروه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="retiredOrganizationId"
            name="retiredOrganizationId"
            value={personObject?.retiredOrganizationId || ""}
            onChange={handlePersonObjectChange}
            className="inputBox__form--input"
            required
          />
          <label
            htmlFor="retiredOrganizationId"
            className="inputBox__form--label"
          >
            <span>*</span> آخرین محل خدمت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="retiredLastPosition"
            name="retiredLastPosition"
            value={personObject?.retiredLastPosition || ""}
            onChange={handlePersonObjectChange}
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
            type="text"
            id="employmentTypeID"
            name="employmentTypeID"
            value={personObject?.employmentTypeID || ""}
            onChange={handlePersonObjectChange}
            className="inputBox__form--input"
            required
          >
            <option value="">انتخاب کنید</option>
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
            className="inputBox__form--input"
            id="pensionaryIsActive"
            style={{ cursor: "pointer" }}
            name="pensionaryIsActive"
            required
            value={personObject?.pensionaryIsActive || " "}
            onChange={handlePersonObjectChange}
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
            type="text"
            id="retiredJobDegreeCoef"
            className="inputBox__form--input"
            value={personObject?.retiredJobDegreeCoef ?? ""}
            onChange={handlePersonObjectChange}
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
            type="text"
            id="retiredRealDuration"
            className="inputBox__form--input"
            value={personObject?.retiredRealDuration || ""}
            onChange={handlePersonObjectChange}
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
            type="text"
            id="retiredGrantDuration"
            className="inputBox__form--input"
            value={personObject?.retiredGrantDuration || ""}
            onChange={handlePersonObjectChange}
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
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ذخیره</span>
        </LoadingButton>

        <Button
          dir="ltr"
          endIcon={<EditIcon />}
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

export default RetiredStaffInfoForm;
