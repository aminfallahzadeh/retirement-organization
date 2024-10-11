// REACT IMPORTS
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// MUI
import { Box, CircularProgress, Checkbox } from "@mui/material";

// REDUX
import { useGetFinancialItemQuery } from "../slices/financialItemApiSlice";

// HELPERS
import {
  convertToPersianNumber,
  separateByThousands,
  removeSeparators,
  convertToEnglishNumber,
} from "../helper";

// LIBRARIES
import { toast } from "react-toastify";

function ViewPayItemForm({ id }) {
  // ACCESS REACT HOOK FORM CONTROL
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = useForm();

  // DEBUGGING
  const onSubmit = (data) => {
    console.log(data);
  };

  // ACCESS FORM DATA
  const form_data = watch();

  const {
    data,
    isLoading: isgetItemLoading,
    isFetching: isGetItemFetching,
    isSuccess,
    error,
  } = useGetFinancialItemQuery(id);

  // FETCH MAIN DATA
  useEffect(() => {
    if (isSuccess) {
      const item = data?.itemList[0];
      Object.keys(item).forEach((key) => {
        setValue(key, item[key]);

        if (item.instalementAmount || item.instalementAmount) {
          setValue("isInstallment", true);
        }
      });
    }
  }, [isSuccess, data?.itemList, setValue]);

  // HANDLE ERROR
  useEffect(() => {
    if (error && error.status !== "FETCH_ERROR") {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  // CUSTOM ONCHANGE HANDLER
  const customOnChange = (e) => {
    let value = convertToEnglishNumber(removeSeparators(e.target.value));
    setValue(e.target.name, value);
  };

  const content = (
    <>
      {isgetItemLoading || isGetItemFetching ? (
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
        <section className="formContainer-transparent formContainer--width-lg flex-col">
          <form
            method="POST"
            className="flex-col"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid grid--col-3">
              <div className="inputBox__form">
                {errors.payItemTypeID && (
                  <span className="error-form">
                    {errors.payItemTypeID.message}
                  </span>
                )}
                <input
                  type="text"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.payItemTypeID) || ""}
                  name="payItemTypeID"
                  id="payItemTypeID"
                  required
                  disabled
                  {...register("payItemTypeID", {
                    required: "شناسه آیتم اجباری است",
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "شناسه فقط شامل اعداد باشد",
                    },
                  })}
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="payItemTypeID"
                >
                  شناسه آیتم
                </label>
              </div>

              <div className="inputBox__form">
                {errors.payItemTypeName && (
                  <span className="error-form">
                    {errors.payItemTypeName.message}
                  </span>
                )}
                <input
                  type="text"
                  className="inputBox__form--input"
                  value={form_data?.payItemTypeName || ""}
                  name="payItemTypeName"
                  id="payItemTypeName"
                  required
                  disabled
                  {...register("payItemTypeName", {
                    required: "شرح آیتم اجباری است",
                    pattern: {
                      value: /^[آ-ی\s۰-۹]+$/,
                      message: "از حروف و اعداد فارسی استفاده کنید",
                    },
                  })}
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="payItemTypeName"
                >
                  شرح آیتم
                </label>
              </div>

              <div className="inputBox__form">
                {errors.financialItemAmount && (
                  <span className="error-form">
                    {errors.financialItemAmount.message}
                  </span>
                )}
                <input
                  type="text"
                  className="inputBox__form--input"
                  disabled
                  value={
                    separateByThousands(
                      convertToPersianNumber(form_data.financialItemAmount)
                    ) || ""
                  }
                  name="financialItemAmount"
                  id="financialItemAmount"
                  required
                  {...register("financialItemAmount", {
                    onChange: customOnChange,
                    required: "مبلغ اجباری است",
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "مبلغ فقط شامل اعداد باشد",
                    },
                  })}
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="financialItemAmount"
                >
                  مبلغ کل
                </label>
              </div>

              <h4
                className="title-quaternary"
                style={{ justifySelf: "start", alignSelf: "center" }}
              >
                تاریخ شروع محاسبه فیش :
              </h4>

              <div className="inputBox__form">
                {errors.executeYear && (
                  <span className="error-form">
                    {errors.executeYear.message}
                  </span>
                )}
                <input
                  type="text"
                  disabled
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.executeYear) || ""}
                  name="executeYear"
                  id="executeYear"
                  required
                  {...register("executeYear", {
                    required: "سال اجباری است",
                    minLength: {
                      value: 4,
                      message: "سال باید ۴ رقمی باشد",
                    },
                    maxLength: {
                      value: 4,
                      message: "سال باید ۴ رقمی باشد",
                    },
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "سال شامل اعداد باشد",
                    },
                  })}
                />
                <label className="inputBox__form--label" htmlFor="executeYear">
                  سال
                </label>
              </div>

              <div className="inputBox__form">
                {errors.executeYear && (
                  <span className="error-form">
                    {errors.executeYear.message}
                  </span>
                )}
                <input
                  type="text"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.executeMonth) || ""}
                  name="executeMonth"
                  id="executeMonth"
                  required
                  disabled
                  {...register("executeMonth", {
                    required: "ماه اجباری است",
                    minLength: {
                      value: 2,
                      message: "ماه باید ۲ رقمی باشد",
                    },
                    maxLength: {
                      value: 2,
                      message: "ماه باید ۲ رقمی باشد",
                    },
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "ماه شامل اعداد باشد",
                    },
                  })}
                />
                <label className="inputBox__form--label" htmlFor="executeYear">
                  ماه
                </label>
              </div>

              <div
                className="checkboxContainer__item"
                style={{ justifySelf: "start", alignSelf: "center" }}
              >
                <Checkbox
                  size="small"
                  color="success"
                  checked={!!form_data?.isInstallment}
                  name="isInstallment"
                  id="isInstallment"
                  disabled
                  sx={{
                    padding: 0.5,
                  }}
                  {...register("isInstallment")}
                />
                <label
                  htmlFor="isInstallment"
                  className="checkboxContainer__label"
                >
                  قسطی
                </label>
              </div>

              {form_data.isInstallment && (
                <>
                  <div className="inputBox__form">
                    {errors.instalementCount && (
                      <span className="error-form">
                        {errors.instalementCount.message}
                      </span>
                    )}
                    <input
                      type="text"
                      disabled
                      className="inputBox__form--input"
                      value={
                        convertToPersianNumber(form_data?.instalementCount) ||
                        ""
                      }
                      name="instalementCount"
                      id="instalementCount"
                      required
                      {...register("instalementCount", {
                        required: "تعداد قسط اجباری است",
                        pattern: {
                          value: /^[۰-۹0-9]+$/,
                          message: "تعداد قسط شامل اعداد باشد",
                        },
                      })}
                    />
                    <label
                      className="inputBox__form--label"
                      htmlFor="instalementCount"
                    >
                      تعداد قسط
                    </label>
                  </div>

                  <div className="inputBox__form">
                    {errors.instalementAmount && (
                      <span className="error-form">
                        {errors.instalementAmount.message}
                      </span>
                    )}
                    <input
                      type="text"
                      className="inputBox__form--input"
                      value={
                        convertToPersianNumber(form_data?.instalementAmount) ||
                        ""
                      }
                      name="instalementAmount"
                      id="instalementAmount"
                      required
                      disabled
                      {...register("instalementAmount", {
                        required: "مبلغ قسط اجباری است",
                        pattern: {
                          value: /^[۰-۹0-9]+$/,
                          message: "مبلغ قسط شامل اعداد باشد",
                        },
                      })}
                    />
                    <label
                      className="inputBox__form--label"
                      htmlFor="instalementAmount"
                    >
                      مبلغ قسط
                    </label>
                  </div>
                </>
              )}
            </div>

            {/* <div style={{ marginRight: "auto" }}>
              <LoadingButton
                dir="ltr"
                endIcon={<SaveIcon />}
                variant="contained"
                onClick={handleSubmit}
                type="submit"
                // loading={isUpdating}
                color="success"
                sx={{ fontFamily: "sahel" }}
              >
                <span>ذخیره</span>
              </LoadingButton>
            </div> */}
          </form>
        </section>
      )}
    </>
  );
  return content;
}
export default ViewPayItemForm;
