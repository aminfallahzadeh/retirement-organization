// REACT
import { useForm, Controller } from "react-hook-form";

// REDUX
import { useDispatch } from "react-redux";
import { useLazyGetPayCompareReportQuery } from "../slices/reportApiSlice";
import { setPayCompareTableData } from "../slices/payCompareDataSlice";

// MUI
import { LoadingButton } from "@mui/lab";
import { Search as SearchIcon } from "@mui/icons-material";

// LIBRARIES
import { toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// HOOKS
import { useFetchPayItemType } from "../hooks/useFetchLookUpData";

// DATA
import { pensionaryTypeOptions } from "../data/retiredData";
import { currentMonthOptions } from "../data/groupSlipsData";

// UTILS
import {
  selectStyles,
  selectSettings,
  optionsGenerator,
} from "../utils/reactSelect";

// HELPERS
import {
  convertToPersianNumber,
  convertToEnglishNumber,
  separateByThousands,
} from "../helper";
import { useEffect } from "react";

function CompareSalaryReportForm() {
  const animatedComponents = makeAnimated();

  const dispatch = useDispatch();

  // ACCESS API QUERY
  const [getReport, { isLoading, isFetching }] =
    useLazyGetPayCompareReportQuery();

  // ACCESS REACT HOOK FORM CONTROL
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    register,
  } = useForm();

  // ACCESS REACT HOOK FORM DATA
  const form_data = watch();

  const onSubmit = async () => {
    try {
      const res = await getReport({
        CurrentYear: convertToEnglishNumber(form_data.currentYear),
        CurrentMonth: convertToEnglishNumber(form_data.currentMonth),
        PayItemTypeID: form_data.payItemID,
        pensionaryIsRetired: form_data.pensionaryIsRetired,
      }).unwrap();

      if (res.itemList.length === 0) {
        toast.error("نتیجه ای یافت نشد", {
          autoClose: 2000,
        });
        return;
      }

      const mappedData = res.itemList.map((item, index) => ({
        id: item.personnelID,
        compareRowNum: convertToPersianNumber(index + 1),
        payNationalCode: convertToPersianNumber(item.personNationalCode) || "-",
        payPersonID: convertToPersianNumber(item.personnelID) || "-",
        payFirstName: item.personFirstName || "-",
        payLastName: item.personLastName || "-",
        payCurrentMonth:
          separateByThousands(
            convertToPersianNumber(item.currentpayItemAmount)
          ) || "-",
        payLastMonth:
          separateByThousands(convertToPersianNumber(item.prepayItemAmount)) ||
          "-",
        payDiff:
          separateByThousands(convertToPersianNumber(item.diffpay)) || "-",
        payStatus: item.pensionaryStatusName || "-",
      }));

      dispatch(setPayCompareTableData(mappedData));
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  // GET LOOK UP DATA
  const { payItemTypes, payItemTypesIsLoading, payItemTypesIsFetching } =
    useFetchPayItemType();

  // SELECT OPTIONS
  const payItemTypeOptions = optionsGenerator(
    payItemTypes,
    "payItemTypeID",
    "payItemTypeName"
  );

  // CLEAR CACHE
  useEffect(() => {
    return () => {
      dispatch(setPayCompareTableData([]));
    };
  }, [dispatch]);

  const content = (
    <section className="formContainer flex-col">
      <form
        method="POST"
        className="flex-col"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid--col-4">
          <div className="inputBox__form">
            {errors.currentYear && (
              <span className="error-form">{errors.currentYear.message}</span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              name="currentYear"
              value={convertToPersianNumber(form_data?.currentYear) || ""}
              id="currentYear"
              required
              {...register("currentYear", {
                required: "سال جاری اجباری است",
                minLength: {
                  value: 4,
                  message: "ماه باید چهار رقمی باشد",
                },
                maxLength: {
                  value: 4,
                  message: "ماه باید چهار رقمی باشد",
                },
                pattern: {
                  value: /^[۰-۹0-9]+$/,
                  message: "از اعداد استفاده کنید",
                },
              })}
            />
            <label className="inputBox__form--label" htmlFor="currentYear">
              <span>*</span> سال جاری
            </label>
          </div>

          <div className="inputBox__form">
            <Controller
              name="currentMonth"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={currentMonthOptions}
                  onChange={(val) => onChange(val ? val.value : null)}
                  value={currentMonthOptions.find(
                    (c) => c.value === form_data?.currentMonth
                  )}
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">
                      <span>*</span> ماه جاری
                    </div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                />
              )}
            />

            <label
              className={
                form_data?.currentMonth
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              <span>*</span> ماه جاری
            </label>

            {errors.currentMonth && (
              <span className="error-form">ماه اجباری است</span>
            )}
          </div>

          <div className="inputBox__form">
            <Controller
              name="payItemID"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={payItemTypeOptions}
                  onChange={(val) => onChange(val ? val.value : null)}
                  value={payItemTypeOptions.find(
                    (c) => c.value === form_data?.payItemID
                  )}
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">
                      <span>*</span> آیتم حقوق
                    </div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                  isLoading={payItemTypesIsLoading || payItemTypesIsFetching}
                />
              )}
            />

            <label
              className={
                form_data?.payItemID
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              <span>*</span> آیتم حقوق
            </label>

            {errors.payItemID && (
              <span className="error-form"> آیتم حقوق اجباری است</span>
            )}
          </div>

          <div className="inputBox__form">
            <Controller
              name="pensionaryIsRetired"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={pensionaryTypeOptions}
                  onChange={(val) => onChange(val ? val.value : null)}
                  value={pensionaryTypeOptions.find(
                    (c) => c.value === form_data?.pensionaryIsRetired
                  )}
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">
                      <span>*</span> نوع بازنشسته
                    </div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                />
              )}
            />

            <label
              className={
                form_data?.pensionaryIsRetired
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              <span>*</span> نوع بازنشسته
            </label>

            {errors.pensionaryIsRetired && (
              <span className="error-form"> نوع بازنشسته اجباری است</span>
            )}
          </div>
        </div>

        <div style={{ marginRight: "auto" }} className="flex-row">
          <LoadingButton
            dir="ltr"
            type="submit"
            endIcon={<SearchIcon />}
            loading={isLoading || isFetching}
            onClick={handleSubmit}
            variant="contained"
            color="success"
            sx={{ fontFamily: "IranYekan" }}
          >
            <span>جست و جو</span>
          </LoadingButton>
        </div>
      </form>
    </section>
  );
  return content;
}

export default CompareSalaryReportForm;
