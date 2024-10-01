// REACT
import { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";

// REDUX
import { useDispatch } from "react-redux";

// MUI
import { LoadingButton } from "@mui/lab";
import { VisibilityOutlined as EyeIcon } from "@mui/icons-material";

// LIBRARIES
import { toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// UTILS
import { selectStyles, selectSettings } from "../utils/reactSelect";

function CompareSalaryReportForm() {
  // ACCESS REACT HOOK FORM CONTROL
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    register,
  } = useForm();

  // ACCESS REACT HOOK FORM DATA
  const form_data = watch();

  const content = (
    <section className="formContainer flex-col">
      <form
        method="POST"
        className="flex-col"
        noValidate
        // onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid--col-4">
          <div className="inputBox__form">
            {errors.personFirstName && (
              <span className="error-form">
                {errors.personFirstName.message}
              </span>
            )}
            <input
              type="text"
              className="inputBox__form--input"
              name="personFirstName"
              value={form_data?.personFirstName || ""}
              id="personFirstName1"
              required
              {...register("personFirstName", {
                required: "نام اجباری است",
                pattern: {
                  value: /^[آ-ی\s]+$/,
                  message: "از حروف فارسی استفاده کنید",
                },
              })}
            />
            <label className="inputBox__form--label" htmlFor="personFirstName1">
              <span>*</span> ماه جاری
            </label>
          </div>

          <div className="inputBox__form">
            <Controller
              name="issueType"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  closeMenuOnSelect={true}
                  //   components={animatedComponents}
                  //   options={issueTypeOptions}
                  //   onChange={(val) => onChange(val ? val.value : null)}
                  //   value={issueTypeOptions.find(
                  //     (c) => c.value === form_data?.issueType
                  //   )}
                  isClearable={true}
                  //   isDisabled={true}
                  placeholder={
                    <div className="react-select-placeholder">
                      <span>*</span> آیتم حقوق
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
                form_data?.issueType
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              <span>*</span> آیتم حقوق
            </label>
          </div>

          <div className="inputBox__form">
            <Controller
              name="issueType"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  closeMenuOnSelect={true}
                  //   components={animatedComponents}
                  //   options={issueTypeOptions}
                  //   onChange={(val) => onChange(val ? val.value : null)}
                  //   value={issueTypeOptions.find(
                  //     (c) => c.value === form_data?.issueType
                  //   )}
                  isClearable={true}
                  //   isDisabled={true}
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
                form_data?.issueType
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              <span>*</span> نوع بازنشسته
            </label>
          </div>
        </div>

        <div style={{ marginRight: "auto" }} className="flex-row">
          <LoadingButton
            dir="ltr"
            endIcon={<EyeIcon />}
            //   loading={isChecking || isGettingPayList}
            //   onClick={getPayListHandler}
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
