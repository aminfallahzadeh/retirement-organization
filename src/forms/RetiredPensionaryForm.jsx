// react imports
import { useState, useEffect } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";
import {
  useGetLookupDataQuery,
  useGetPensionaryStatusQuery,
} from "../slices/sharedApiSlice.js";
import {
  useUpdateRetiredPensionaryMutation,
  useGetRetiredPensionaryQuery,
} from "../slices/retiredApiSlice.js";

// mui imports
import { Button, Box, CircularProgress } from "@mui/material";
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

function RetiredPensionaryForm() {
  const [editable, setEditable] = useState(false);

  // LOOKUP DATA STATES
  const [employmentTypeCombo, setEmploymentTypeCombo] = useState([]);
  const [pernsionaryStatusCombo, setPensionaryStatusCombo] = useState([]);

  // DATE STATES
  const [selectedRetriementDate, setSelectedRetriementDate] = useState(null);
  const [isRetriementCalenderOpen, setIsRetirementCalenderOpen] =
    useState(false);

  // PENSIONARY STATES
  const [pensionaryData, setPensionaryData] = useState(null);

  const [updateRetiredPensionary, { isLoading: isUpdating }] =
    useUpdateRetiredPensionaryMutation();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  const { personDeathDate } = useSelector((state) => state.retiredState);

  const {
    data: pensionary,
    isSuccess: isPensionarySuccess,
    isLoading,
    isFetching,
    error: pensionaryError,
    refetch: refetchPensionary,
  } = useGetRetiredPensionaryQuery(personID);

  // fetch data
  useEffect(() => {
    if (isPensionarySuccess) {
      setPensionaryData(pensionary?.itemList[0]);
    }
  }, [isPensionarySuccess, pensionary]);

  // handle error
  useEffect(() => {
    if (pensionaryError) {
      console.log(pensionaryError);
      toast.error(pensionaryError?.data?.message || pensionaryError.error, {
        autoClose: 2000,
      });
    }
  }, [pensionaryError]);

  // GET LOOK UP DATA
  const {
    data: employmentTypeComboItems,
    isSuccess: isEmploymentTypeComboSuccess,
  } = useGetLookupDataQuery({
    lookUpType: "EmploymentType",
  });

  const {
    data: pensionaryStatusComboItems,
    isSuccess: isPensionaryStatusComboSuccess,
  } = useGetPensionaryStatusQuery({
    pensionaryStatusCategory: "R",
    pensionaryStatusIsDead: personDeathDate ? true : false,
  });

  // FETCH LOOK UP DATA
  useEffect(() => {
    if (isEmploymentTypeComboSuccess) {
      setEmploymentTypeCombo(employmentTypeComboItems.itemList);
    }
  }, [isEmploymentTypeComboSuccess, employmentTypeComboItems]);

  useEffect(() => {
    if (isPensionaryStatusComboSuccess) {
      setPensionaryStatusCombo(pensionaryStatusComboItems.itemList);
    }
  }, [
    isPensionaryStatusComboSuccess,
    pensionaryStatusComboItems,
    pernsionaryStatusCombo,
  ]);

  // HANDLE DATEs
  useEffect(() => {
    setSelectedRetriementDate(
      convertToPersianDate(pensionaryData?.retirementDate)
    );
  }, [pensionaryData?.retirementDate]);

  // CHANGE HANDLERs
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
      // Adjusting for timezone difference
      let retirementDate;

      if (selectedRetriementDate) {
        retirementDate = new Date(selectedRetriementDate);
        retirementDate.setMinutes(
          retirementDate.getMinutes() - retirementDate.getTimezoneOffset()
        );
      } else {
        retirementDate = null;
      }

      const updateRes = await updateRetiredPensionary({
        ...pensionaryData,
        retiredGroup: parseInt(
          convertToEnglishNumber(pensionaryData.retiredGroup)
        ),
        retiredOrganizationID: convertToEnglishNumber(
          pensionaryData.retiredOrganizationID
        ),
        retiredJobDegreeCoef: parseInt(
          convertToEnglishNumber(pensionaryData.retiredJobDegreeCoef)
        ),
        retiredRealDuration: parseInt(
          convertToEnglishNumber(pensionaryData.retiredRealDuration)
        ),
        retiredGrantDuration: parseInt(
          convertToEnglishNumber(pensionaryData.retiredGrantDuration)
        ),
        retirementDate,
        personID,
      }).unwrap();
      refetchPensionary();
      setEditable(false);
      // setIsPensionarySaved(true);
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
    <>
      {isLoading || isFetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem 10rem",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <section className="flex-col">
          <form method="POST" className="grid grid--col-3" noValidate>
            <div className="inputBox__form">
              <input
                disabled={!editable}
                type="text"
                id="retiredGroup"
                name="retiredGroup"
                className="inputBox__form--input"
                value={
                  convertToPersianNumber(pensionaryData?.retiredGroup) ?? ""
                }
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
                  convertToPersianNumber(
                    pensionaryData?.retiredOrganizationID
                  ) ?? ""
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
                value={pensionaryData?.employmentTypeID || " "}
                onChange={handlePensionaryDataChange}
                className="inputBox__form--input"
                required
              >
                <option value=" " disabled>
                  انتخاب کنید
                </option>
                {employmentTypeCombo?.map((item) => (
                  <option key={item.lookUpID} value={item.lookUpID}>
                    {item.lookUpName}
                  </option>
                ))}
              </select>
              <label
                htmlFor="employmentTypeID"
                className="inputBox__form--label"
              >
                <span>*</span> نوع استخدام
              </label>
            </div>

            <div className="inputBox__form">
              <InputDatePicker
                disabled={!editable}
                value={selectedRetriementDate}
                defaultValue={null}
                onChange={handleRetiredDateChange}
                onOpenChange={handleRetiredOpenChange}
                format={"jYYYY/jMM/jDD"}
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
              <div className="inputBox__form--readOnly-label">
                تاریخ بازنشستگی
              </div>
            </div>

            <div className="inputBox__form">
              <select
                disabled={!editable}
                className="inputBox__form--input"
                id="pensionaryStatusID"
                style={{ cursor: "pointer" }}
                name="pensionaryStatusID"
                required
                value={pensionaryData?.pensionaryStatusID || " "}
                onChange={handlePensionaryDataChange}
              >
                <option value=" " disabled>
                  انتخاب کنید
                </option>
                {pernsionaryStatusCombo.map((item) => (
                  <option
                    key={item.pensionaryStatusID}
                    value={item.pensionaryStatusID}
                  >
                    {item.pensionaryStatusName}
                  </option>
                ))}
              </select>
              <label
                className="inputBox__form--label"
                htmlFor="pensionaryIsActive"
              >
                <span>*</span> وضعیت
              </label>
            </div>

            <div className="inputBox__form StaffInfoForm__flex--item">
              <input
                disabled={!editable}
                type="text"
                id="retiredJobDegreeCoef"
                className="inputBox__form--input"
                value={
                  convertToPersianNumber(
                    pensionaryData?.retiredJobDegreeCoef
                  ) ?? ""
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
                  convertToPersianNumber(pensionaryData?.retiredRealDuration) ??
                  ""
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
                  convertToPersianNumber(
                    pensionaryData?.retiredGrantDuration
                  ) ?? ""
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
              disabled={!editable}
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
      )}
    </>
  );
  return content;
}

export default RetiredPensionaryForm;
