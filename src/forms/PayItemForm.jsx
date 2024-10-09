// REACT IMPORTS
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// MUI
import { Box, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// HELPERS
import { convertToPersianNumber } from "../helper";

function PayItemForm({ type, isLoading, isFetching }) {
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
                  <span>*</span> شناسه آیتم
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
                  <span>*</span> شرح آیتم
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
                  value={
                    convertToPersianNumber(form_data?.financialItemAmount) || ""
                  }
                  name="financialItemAmount"
                  id="financialItemAmount"
                  required
                  {...register("financialItemAmount", {
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
                  <span>*</span> مبلغ کل
                </label>
              </div>
            </div>

            <div style={{ marginRight: "auto" }}>
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
            </div>
          </form>
        </section>
      )}
    </>
  );
  return content;
}
export default PayItemForm;
