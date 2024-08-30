// react imports
import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

// redux imports
import { useSelector } from "react-redux";
import {
  useUpdateRetiredPensionaryMutation,
  useGetRetiredPensionaryQuery,
  useGetAllPensionariesQuery,
} from "../slices/retiredApiSlice.js";

// hooks
import {
  useFetchPensionaryStatus,
  useFetchLookUpData,
  useFetchOrganizations,
} from "../hooks/useFetchLookUpData.js";
import { useCloseCalender } from "../hooks/useCloseCalender";

// mui imports
import { Button, Box, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  CalendarTodayOutlined as CalenderIcon,
  Save as SaveIcon,
  EditOutlined as EditIcon,
} from "@mui/icons-material";

// components
import PensionaryStatusHistoryGrid from "../grids/PensionaryStatusHistoryGrid";

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
  const retirementCalenderRef = useRef(null);
  const changeStatusCalenderRef = useRef(null);

  // CONTORL STATES
  const [editable, setEditable] = useState(false);

  const animatedComponents = makeAnimated();

  // DATE STATES
  const [selectedRetriementDate, setSelectedRetriementDate] = useState(null);
  const [selectedChangeStatusDate, setSelectedChangeStatusDate] =
    useState(null);

  // CALENDER STATES
  const [isChangeStatusCalenderOpen, setIsChangeStatusCalenderOpen] =
    useState(false);
  const [isRetriementCalenderOpen, setIsRetirementCalenderOpen] =
    useState(false);

  // TABLE STATES
  const [statusHistoryTableData, setStatusHistoryTableData] = useState([]);

  // ACCESS REACT HOOK FORM CONTROL
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    watch,
    setValue,
  } = useForm();

  // ACCESS REACT HOOK FORM DATA
  const form_data = watch();

  // ACCESS UPDATE QUERY
  const [updateRetiredPensionary, { isLoading: isUpdating }] =
    useUpdateRetiredPensionaryMutation();

  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  const { personDeathDate } = useSelector((state) => state.retiredState);

  // GET PENSIONARY STATUS HISTORY
  const {
    data: statusHistory,
    isSuccess: isStatusHistorySuccess,
    isLoading: isStatusHistoryLoading,
    isFetching: isStatusHistoryFetching,
    refetch: refetchStatusHistory,
    error: statusHistoryError,
  } = useGetAllPensionariesQuery(personID);

  // GET PENSIONARY DATA
  const {
    data: pensionary,
    isSuccess: isPensionarySuccess,
    isLoading,
    isFetching,
    error: pensionaryError,
    refetch: refetchPensionary,
  } = useGetRetiredPensionaryQuery(personID);

  // FETCH STATUS DATA
  useEffect(() => {
    refetchStatusHistory();
    if (isStatusHistorySuccess) {
      const mappedData = statusHistory?.itemList.map((item, index) => ({
        id: item.pensionaryID,
        pensionaryStatusRowNum: index + 1,
        pensionaryStatusName: item.pensionaryStatusName || "-",
        pensionaryStartdate:
          convertToPersianDate(item.pensionaryStartdate) || "-",
      }));
      setStatusHistoryTableData(mappedData);
    }

    return () => {
      setStatusHistoryTableData([]);
    };
  }, [refetchStatusHistory, isStatusHistorySuccess, statusHistory]);

  // FETCH MAIN DATA
  useEffect(() => {
    if (isPensionarySuccess) {
      const data = pensionary?.itemList[0];

      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
    }
  }, [isPensionarySuccess, pensionary, setValue]);

  // HANDLE MAIN DATA ERROR
  useEffect(() => {
    if (pensionaryError) {
      console.log(pensionaryError);
      toast.error(pensionaryError?.data?.message || pensionaryError.error, {
        autoClose: 2000,
      });
    }
  }, [pensionaryError]);

  useEffect(() => {
    if (statusHistoryError) {
      console.log(statusHistoryError);
      toast.error(
        statusHistoryError?.data?.message || statusHistoryError.error,
        {
          autoClose: 2000,
        }
      );
    }
  }, [statusHistoryError]);

  // GET LOOK UP DATA
  const { organizations, organizationIsLoading, organizationIsFetching } =
    useFetchOrganizations({});

  const {
    lookUpItems: employmentTypes,
    lookUpItemsIsLoading: employmentTypesIsLoading,
    lookUpItemsIsFetching: employmentTypesIsFetching,
  } = useFetchLookUpData({ lookUpType: "EmploymentType" });

  const {
    pensionaryStatus,
    pensionaryStatusIsLoading,
    pensionaryStatusIsFetching,
  } = useFetchPensionaryStatus({
    pensionaryStatusCategory: "R",
    pensionaryStatusIsDead: personDeathDate,
  });

  // SELECT OPTIONS
  const organizationOptions = optionsGenerator(
    organizations,
    "organizationID",
    "organizationName"
  );

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

  // HANDLE DATEs
  useEffect(() => {
    setSelectedRetriementDate(convertToPersianDate(form_data?.retirementDate));
  }, [form_data?.retirementDate]);

  useEffect(() => {
    setSelectedChangeStatusDate(
      convertToPersianDate(form_data?.pensionaryStartDate)
    );
  }, [form_data?.pensionaryStartDate]);

  // CHANGE HANDLERs
  const handleEditable = () => {
    setEditable(true);
  };

  const hadnleRefreshStatusHistoryTable = () => {
    refetchStatusHistory();
  };

  const handleRetiredOpenChange = (open) => {
    setIsRetirementCalenderOpen(open);
  };

  const handleChangeStatusOpenChange = (open) => {
    setIsChangeStatusCalenderOpen(open);
  };

  const handleRetiredDateChange = (date) => {
    setSelectedRetriementDate(date);
    setIsRetirementCalenderOpen(false);
  };

  const handleChangeStatusDateChange = (date) => {
    setSelectedChangeStatusDate(date);
    setIsChangeStatusCalenderOpen(false);
  };

  // hanlde update retired pensionary
  const onSubmit = async () => {
    try {
      // Adjusting for timezone difference
      let retirementDate;
      let pensionaryStartDate;

      if (selectedRetriementDate) {
        retirementDate = new Date(selectedRetriementDate);
        retirementDate.setMinutes(
          retirementDate.getMinutes() - retirementDate.getTimezoneOffset()
        );
      } else {
        retirementDate = null;
      }

      if (selectedChangeStatusDate) {
        pensionaryStartDate = new Date(selectedChangeStatusDate);
        pensionaryStartDate.setMinutes(
          pensionaryStartDate.getMinutes() -
            pensionaryStartDate.getTimezoneOffset()
        );
      } else {
        pensionaryStartDate = null;
      }

      const updateRes = await updateRetiredPensionary({
        ...form_data,
        retiredGroup: parseInt(convertToEnglishNumber(form_data.retiredGroup)),
        retiredOrganizationID: convertToEnglishNumber(
          form_data.retiredOrganizationID
        ),
        retiredJobDegreeCoef: parseInt(
          convertToEnglishNumber(form_data.retiredJobDegreeCoef)
        ),
        retiredRealDuration: parseInt(
          convertToEnglishNumber(form_data.retiredRealDuration)
        ),
        retiredGrantDuration: parseInt(
          convertToEnglishNumber(form_data.retiredGrantDuration)
        ),
        retirementDate,
        pensionaryStartDate,
        personID,
      }).unwrap();
      refetchPensionary();
      setEditable(false);
      refetchStatusHistory();
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

  // FIX CLOSE CALENDER BUG
  useCloseCalender(
    [retirementCalenderRef, changeStatusCalenderRef],
    [setIsRetirementCalenderOpen, setIsChangeStatusCalenderOpen]
  );

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
          <form
            method="POST"
            className="flex-col"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid grid--col-4">
              <div className="inputBox__form">
                {errors.retiredGroup && (
                  <span className="error-form">
                    {errors.retiredGroup.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  id="retiredGroup"
                  name="retiredGroup"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.retiredGroup) ?? ""}
                  required
                  {...register("retiredGroup", {
                    required: "گروه اجباری است",
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "گروه باید فقط شامل اعداد باشد",
                    },
                  })}
                />
                <label htmlFor="retiredGroup" className="inputBox__form--label">
                  <span>*</span> گروه
                </label>
              </div>

              <div className="inputBox__form">
                <Controller
                  name="retiredOrganizationID"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <Select
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      options={organizationOptions}
                      onChange={(val) => onChange(val ? val.value : null)}
                      isDisabled={!editable}
                      value={organizationOptions.find(
                        (c) => c.value === form_data?.retiredOrganizationID
                      )}
                      name="retiredOrganizationID"
                      isClearable={true}
                      placeholder={
                        <div className="react-select-placeholder">
                          <span>*</span> آخرین محل خدمت
                        </div>
                      }
                      noOptionsMessage={selectSettings.noOptionsMessage}
                      loadingMessage={selectSettings.loadingMessage}
                      styles={selectStyles}
                      isLoading={
                        organizationIsLoading || organizationIsFetching
                      }
                    />
                  )}
                />

                <label
                  className={
                    form_data?.retiredOrganizationID
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  <span>*</span> آخرین محل خدمت
                </label>

                {errors.retiredOrganizationID && (
                  <span className="error-form"> محل خدمت اجباری است</span>
                )}
              </div>

              <div className="inputBox__form">
                {errors.retiredLastPosition && (
                  <span className="error-form">
                    {errors.retiredLastPosition.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  id="retiredLastPosition"
                  name="retiredLastPosition"
                  value={form_data?.retiredLastPosition || ""}
                  className="inputBox__form--input"
                  required
                  {...register("retiredLastPosition", {
                    pattern: {
                      value: /^[آ-ی\s]+$/,
                      message: "از حروف فارسی استفاده کنید",
                    },
                  })}
                />
                <label
                  htmlFor="retiredLastPosition"
                  className="inputBox__form--label"
                >
                  سمت
                </label>
              </div>

              <div className="inputBox__form">
                <Controller
                  name="employmentTypeID"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <Select
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      options={employmentOptions}
                      onChange={(val) => onChange(val ? val.value : null)}
                      isDisabled={!editable}
                      value={employmentOptions.find(
                        (c) => c.value === form_data?.employmentTypeID
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
                  )}
                />

                <label
                  className={
                    form_data?.employmentTypeID
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  <span>*</span> نوع استخدام
                </label>

                {errors.employmentTypeID && (
                  <span className="error-form">نوع استخدام اجباری است</span>
                )}
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
                  style={datePickerStyles}
                  wrapperStyle={datePickerWrapperStyles}
                  pickerProps={{
                    ref: retirementCalenderRef,
                  }}
                />
                <div className="inputBox__form--readOnly-label">
                  تاریخ بازنشستگی
                </div>
              </div>

              <div className="inputBox__form">
                <Controller
                  name="pensionaryStatusID"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <Select
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      options={pensionaryStatusOptions}
                      onChange={(val) => onChange(val ? val.value : null)}
                      isDisabled={!editable}
                      value={pensionaryStatusOptions.find(
                        (c) => c.value === form_data?.pensionaryStatusID
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
                  )}
                />

                <label
                  className={
                    form_data?.pensionaryStatusID
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  <span>*</span> وضعیت
                </label>

                {errors.pensionaryStatusID && (
                  <span className="error-form">وضعیت اجباری است</span>
                )}
              </div>

              <div className="inputBox__form">
                <InputDatePicker
                  disabled={!editable}
                  value={selectedChangeStatusDate}
                  defaultValue={null}
                  onChange={handleChangeStatusDateChange}
                  onOpenChange={handleChangeStatusOpenChange}
                  format={"jYYYY/jMM/jDD"}
                  suffixIcon={<CalenderIcon color="action" />}
                  open={isChangeStatusCalenderOpen}
                  style={datePickerStyles}
                  wrapperStyle={datePickerWrapperStyles}
                  pickerProps={{
                    ref: changeStatusCalenderRef,
                  }}
                />
                <div className="inputBox__form--readOnly-label">
                  تاریخ تغییر وضعیت
                </div>
              </div>

              <div className="inputBox__form">
                {errors.retiredJobDegreeCoef && (
                  <span className="error-form">
                    {errors.retiredJobDegreeCoef.message}
                  </span>
                )}

                <input
                  disabled={!editable}
                  type="text"
                  id="retiredJobDegreeCoef"
                  className="inputBox__form--input"
                  value={
                    convertToPersianNumber(form_data?.retiredJobDegreeCoef) ??
                    ""
                  }
                  name="retiredJobDegreeCoef"
                  required
                  {...register("retiredJobDegreeCoef", {
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "ضریب مدیریتی باید شامل اعداد باشد",
                    },
                  })}
                />
                <label
                  htmlFor="retiredJobDegreeCoef"
                  className="inputBox__form--label"
                >
                  ضریب مدیریتی
                </label>
              </div>

              <div className="inputBox__form">
                {errors.retiredRealDuration && (
                  <span className="error-form">
                    {errors.retiredRealDuration.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  id="retiredRealDuration"
                  className="inputBox__form--input"
                  value={
                    convertToPersianNumber(form_data?.retiredRealDuration) ?? ""
                  }
                  name="retiredRealDuration"
                  required
                  {...register("retiredRealDuration", {
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "سابفه حقیقی باید شامل اعداد باشد",
                    },
                  })}
                />
                <label
                  htmlFor="retiredRealDuration"
                  className="inputBox__form--label"
                >
                  سابقه حقیقی بازنشسته
                </label>
              </div>
              <div className="inputBox__form">
                {errors.retiredGrantDuration && (
                  <span className="error-form">
                    {errors.retiredGrantDuration.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  id="retiredGrantDuration"
                  className="inputBox__form--input"
                  value={
                    convertToPersianNumber(form_data?.retiredGrantDuration) ??
                    ""
                  }
                  name="retiredGrantDuration"
                  required
                  {...register("retiredGrantDuration", {
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "سابقه ارفاقی باید شامل اعداد باشد",
                    },
                  })}
                />
                <label
                  htmlFor="retiredGrantDuration"
                  className="inputBox__form--label"
                >
                  سابقه ارفاقی بازنشسته
                </label>
              </div>
            </div>

            <div className="flex-col flex-center">
              <h5 className="title-secondary">تاریخچه وضعیت ها</h5>
            </div>

            <PensionaryStatusHistoryGrid
              statusHistoryTableData={statusHistoryTableData}
              isLoading={isStatusHistoryLoading}
              isFetching={isStatusHistoryFetching}
              handleRefresh={hadnleRefreshStatusHistoryTable}
            />

            <div style={{ marginRight: "auto" }} className="flex-row">
              <LoadingButton
                dir="ltr"
                endIcon={<SaveIcon />}
                loading={isUpdating}
                disabled={!editable}
                type="submit"
                onClick={handleSubmit}
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
          </form>
        </section>
      )}
    </>
  );
  return content;
}

export default RetiredPensionaryForm;
