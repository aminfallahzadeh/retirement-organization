// react imports
import { useState, useEffect } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";
import {
  useUpdateRetiredPensionaryMutation,
  useGetRetiredPensionaryQuery,
} from "../slices/retiredApiSlice.js";

// hooks
import {
  useFetchEmploymentTypes,
  useFetchPensionaryStatus,
} from "../hooks/useFetchLookUpData.js";

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
import Select from "react-select";
import makeAnimated from "react-select/animated";

// utils
import {
  selectStyles,
  selectSettings,
  optionsGenerator,
} from "../utils/reactSelect";
import { datePickerStyles, datePickerWrapperStyles } from "../utils/datePicker";

function RetiredPensionaryForm() {
  const [editable, setEditable] = useState(false);

  const animatedComponents = makeAnimated();

  // LOOKUP DATA STATES
  // const [employmentTypeCombo, setEmploymentTypeCombo] = useState([]);
  // const [pernsionaryStatusCombo, setPensionaryStatusCombo] = useState([]);

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
    employmentTypes,
    employmentTypesIsLoading,
    employmentTypesIsFetching,
  } = useFetchEmploymentTypes();

  const {
    pensionaryStatus,
    pensionaryStatusIsLoading,
    pensionaryStatusIsFetching,
  } = useFetchPensionaryStatus({
    pensionaryStatusCategory: "R",
    pensionaryStatusIsDead: personDeathDate ? true : false,
  });

  // SELECT OPTIONS
  const employmentOptions = optionsGenerator(
    employmentTypes,
    "lookUpID",
    "lookUpName"
  );

  const pensionaryStatusOptions = optionsGenerator(
    pensionaryStatus,
    "pensionaryStatusID",
    "pensionaryStatusName"
  );

  // const {
  //   data: pensionaryStatusComboItems,
  //   isSuccess: isPensionaryStatusComboSuccess,
  // } = useGetPensionaryStatusQuery({
  //   pensionaryStatusCategory: "R",
  //   pensionaryStatusIsDead: personDeathDate ? true : false,
  // });

  // useEffect(() => {
  //   if (isPensionaryStatusComboSuccess) {
  //     setPensionaryStatusCombo(pensionaryStatusComboItems.itemList);
  //   }
  // }, [
  //   isPensionaryStatusComboSuccess,
  //   pensionaryStatusComboItems,
  //   pernsionaryStatusCombo,
  // ]);

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

  // HADNLE DATA CHANGE
  const handlePensionaryDataChange = (e) => {
    const { name, value } = e.target;
    setPensionaryData({ ...pensionaryData, [name]: value });
  };

  // HANDLE SELECT OPTION CHANGE
  const handleSelectOptionChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    if (selectedOption) {
      const { value } = selectedOption;
      setPensionaryData({ ...pensionaryData, [name]: value || "" });
    } else {
      setPensionaryData({ ...pensionaryData, [name]: null });
    }
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
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={employmentOptions}
                onChange={handleSelectOptionChange}
                isDisabled={!editable}
                value={employmentOptions.find(
                  (item) => item.value === pensionaryData?.employmentTypeID
                )}
                name="employmentTypeID"
                isClearable={true}
                placeholder={
                  <div className="react-select-placeholder">
                    <span>*</span> نوع استخدام
                  </div>
                }
                noOptionsMessage={selectSettings.noOptionsMessage}
                loadingMessage={selectSettings.loadingMessage}
                styles={selectStyles}
                isLoading={
                  employmentTypesIsLoading || employmentTypesIsFetching
                }
              />

              <label
                className={
                  pensionaryData?.employmentTypeID
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
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
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={pensionaryStatusOptions}
                onChange={handleSelectOptionChange}
                isDisabled={!editable}
                value={pensionaryStatusOptions.find(
                  (item) => item.value === pensionaryData?.pensionaryStatusID
                )}
                name="pensionaryStatusID"
                isClearable={true}
                placeholder={
                  <div className="react-select-placeholder">
                    <span>*</span> وضعیت
                  </div>
                }
                noOptionsMessage={selectSettings.noOptionsMessage}
                loadingMessage={selectSettings.loadingMessage}
                styles={selectStyles}
                isLoading={
                  pensionaryStatusIsLoading || pensionaryStatusIsFetching
                }
              />

              <label
                className={
                  pensionaryData?.pensionaryStatusID
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
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
