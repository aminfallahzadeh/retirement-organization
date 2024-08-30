// react imports
import { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useLazyGetLookupDataQuery } from "../slices/sharedApiSlice.js";
import { useGetRetiredAccountQuery } from "../slices/retiredApiSlice";
import { useUpdateRetiredAccountMutation } from "../slices/retiredApiSlice";

// hooks
import { useFetchLookUpData } from "../hooks/useFetchLookUpData";

// mui imports
import { Button, Box, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  Save as SaveIcon,
  EditOutlined as EditIcon,
} from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// helpers
import { convertToPersianNumber, convertToEnglishNumber } from "../helper";

// utils
import {
  selectStyles,
  selectSettings,
  optionsGenerator,
} from "../utils/reactSelect";

function RetiredAccountForm() {
  const [editable, setEditable] = useState(false);

  const animatedComponents = makeAnimated();

  // LOOP UP STATES
  const [bankBranchCombo, setBankBranchCombo] = useState([]);

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

  // ACCESS QUERY PARAMS
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  const [updateRetiredAccount, { isLoading: isUpdating }] =
    useUpdateRetiredAccountMutation();

  const [
    getLookupData,
    {
      isLoading: isBankBranchComboLoading,
      isFetching: isBankBranchComboFetching,
    },
  ] = useLazyGetLookupDataQuery();

  // GET LOOKUP DATA
  const {
    lookUpItems: bankItems,
    lookUpItemsIsLoading: bankItemsIsLoading,
    lookUpItemsIsFetching: bankItemsIsFetching,
  } = useFetchLookUpData({ lookUpType: "Bank" });

  // CREATE SELECT OPTIONS
  const bankOptions = optionsGenerator(bankItems, "lookUpID", "lookUpName");
  const bankBranchOptions = optionsGenerator(
    bankBranchCombo,
    "lookUpID",
    "lookUpName"
  );

  // GET MAIN DATA
  const {
    data: retiredAccountData,
    isSuccess,
    isLoading,
    isFetching,
    error,
  } = useGetRetiredAccountQuery(personID);

  const fetchBankBranchData = useCallback(
    async (bankID) => {
      try {
        const bankBranchRes = await getLookupData({
          lookUpType: "BankBranch",
          lookUpParentID: bankID,
        }).unwrap();
        setBankBranchCombo(bankBranchRes.itemList);
      } catch (err) {
        console.log(err);
      }
    },
    [getLookupData, setBankBranchCombo]
  );

  // FETCH MAIN DATA
  useEffect(() => {
    if (isSuccess) {
      Object.keys(retiredAccountData).forEach((key) => {
        setValue(key, retiredAccountData[key]);
      });
    }
  }, [isSuccess, retiredAccountData, setValue]);

  // ERROR HANDLING
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  // GET & FETCH BANK BRANCH ON USER BANK SELECT
  useEffect(() => {
    if (form_data.bankID) {
      fetchBankBranchData(form_data.bankID);
      // setAccountData({ ...accountData, bankBranchID: null });
    }
  }, [form_data.bankID, fetchBankBranchData]);

  const handleEditable = () => {
    setEditable(true);
  };

  const onSubmit = async () => {
    try {
      const updateRes = await updateRetiredAccount({
        ...form_data,
        ledgerCode:
          parseInt(convertToEnglishNumber(form_data.ledgerCode)) || null,
        insuranceAmount:
          parseFloat(convertToEnglishNumber(form_data.insuranceAmount)) || null,
        insuranceCoef:
          parseFloat(convertToEnglishNumber(form_data.insuranceCoef)) || null,
        accountNo: convertToEnglishNumber(form_data.accountNo),
        personID,
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
                <Controller
                  name="bankID"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Select
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      options={bankOptions}
                      onChange={(val) => onChange(val ? val.value : null)}
                      isDisabled={!editable}
                      value={bankOptions.find(
                        (c) => c.value === form_data?.bankID
                      )}
                      id="bankID"
                      name="bankID"
                      isClearable={true}
                      placeholder={
                        <div className="react-select-placeholder">بانک</div>
                      }
                      noOptionsMessage={selectSettings.noOptionsMessage}
                      loadingMessage={selectSettings.loadingMessage}
                      styles={selectStyles}
                      isLoading={bankItemsIsLoading || bankItemsIsFetching}
                    />
                  )}
                />

                <label
                  htmlFor="bankID"
                  className={
                    form_data?.bankID
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  بانک
                </label>
              </div>

              <div className="inputBox__form">
                <Controller
                  name="bankBranchID"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Select
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      options={bankBranchOptions}
                      onChange={(val) => onChange(val ? val.value : null)}
                      isDisabled={
                        !editable ||
                        isBankBranchComboLoading ||
                        isBankBranchComboFetching ||
                        !form_data.bankID
                      }
                      value={
                        bankBranchOptions.find(
                          (c) => c.value === form_data?.bankBranchID
                        ) || null
                      }
                      id="bankBranchID"
                      name="bankBranchID"
                      isClearable={true}
                      placeholder={
                        <div className="react-select-placeholder">شعبه</div>
                      }
                      noOptionsMessage={selectSettings.noOptionsMessage}
                      loadingMessage={selectSettings.loadingMessage}
                      styles={selectStyles}
                      isLoading={
                        isBankBranchComboLoading || isBankBranchComboFetching
                      }
                    />
                  )}
                />

                <label
                  htmlFor="bankBranchID"
                  className={
                    form_data?.bankBranchID
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  شعبه
                </label>
              </div>

              <div className="inputBox__form">
                {errors.accountNo && (
                  <span className="error-form">{errors.accountNo.message}</span>
                )}
                <input
                  disabled={!editable || isLoading}
                  type="text"
                  id="accountNo"
                  name="accountNo"
                  value={convertToPersianNumber(form_data?.accountNo) ?? ""}
                  className="inputBox__form--input"
                  required
                  {...register("accountNo", {
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "شماره حساب باید فقط شامل اعداد باشد",
                    },
                  })}
                />
                <label htmlFor="accountNo" className="inputBox__form--label">
                  شماره حساب
                </label>
              </div>

              <div className="inputBox__form">
                {errors.ledgerCode && (
                  <span className="error-form">
                    {errors.ledgerCode.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  id="ledgerCode"
                  name="ledgerCode"
                  value={convertToPersianNumber(form_data?.ledgerCode) ?? ""}
                  className="inputBox__form--input"
                  required
                  {...register("ledgerCode", {
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "دفتر کل باید فقط شامل اعداد باشد",
                    },
                  })}
                />
                <label htmlFor="ledgerCode" className="inputBox__form--label">
                  دفتر کل
                </label>
              </div>

              <div className="inputBox__form">
                {errors.insuranceCoef && (
                  <span className="error-form">
                    {errors.insuranceCoef.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  id="insuranceCoef"
                  name="insuranceCoef"
                  value={convertToPersianNumber(form_data?.insuranceCoef) ?? ""}
                  className="inputBox__form--input"
                  required
                  {...register("insuranceCoef", {
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "ضریب بیمه باید فقط شامل اعداد باشد",
                    },
                  })}
                />
                <label
                  htmlFor="insuranceCoef"
                  className="inputBox__form--label"
                >
                  ضریب بیمه
                </label>
              </div>

              <div className="inputBox__form">
                {errors.insuranceAmount && (
                  <span className="error-form">
                    {errors.insuranceAmount.message}
                  </span>
                )}
                <input
                  disabled={!editable}
                  type="text"
                  id="insuranceAmount"
                  name="insuranceAmount"
                  value={
                    convertToPersianNumber(form_data?.insuranceAmount) ?? ""
                  }
                  className="inputBox__form--input"
                  required
                  {...register("insuranceAmount", {
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "بیمه تبعی باید فقط شامل اعداد باشد",
                    },
                  })}
                />
                <label
                  htmlFor="insuranceAmount"
                  className="inputBox__form--label"
                >
                  بیمه تبعی
                </label>
              </div>
            </div>
            <div style={{ marginRight: "auto" }} className="flex-row">
              <LoadingButton
                dir="ltr"
                endIcon={<SaveIcon />}
                loading={isUpdating}
                disabled={!editable}
                onClick={handleSubmit}
                type="submit"
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

export default RetiredAccountForm;
