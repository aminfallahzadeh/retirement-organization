// react imports
import { useState, useEffect, useCallback } from "react";

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

  // ACCOUNT DATA STATE
  const [accountData, setAccountData] = useState({});

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
      setAccountData(retiredAccountData);
    }
  }, [isSuccess, retiredAccountData]);

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
    if (accountData.bankID) {
      fetchBankBranchData(accountData.bankID);
      // setAccountData({ ...accountData, bankBranchID: null });
    }
  }, [accountData.bankID, fetchBankBranchData]);

  const handleEditable = () => {
    setEditable(true);
  };

  const handleAccountDataChange = (e) => {
    const { name, value } = e.target;
    setAccountData({ ...accountData, [name]: value });
  };

  const handleUpdateRetiredAccount = async () => {
    try {
      const updateRes = await updateRetiredAccount({
        ...accountData,
        ledgerCode:
          parseInt(convertToEnglishNumber(accountData.ledgerCode)) || null,
        insuranceAmount:
          parseFloat(convertToEnglishNumber(accountData.insuranceAmount)) ||
          null,
        insuranceCoef:
          parseFloat(convertToEnglishNumber(accountData.insuranceCoef)) || null,
        accountNo: convertToEnglishNumber(accountData.accountNo),
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

  // HANDLE SELECT OPTION CHANGE
  const handleSelectOptionChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    if (selectedOption) {
      const { value } = selectedOption;
      setAccountData({ ...accountData, [name]: value || "" });
    } else {
      setAccountData({ ...accountData, [name]: null });
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
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={bankOptions}
                onChange={handleSelectOptionChange}
                isDisabled={!editable}
                value={bankOptions.find(
                  (item) => item.value === accountData?.bankID
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

              <label
                htmlFor="bankID"
                className={
                  accountData?.bankID
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
                بانک
              </label>
            </div>

            <div className="inputBox__form">
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={bankBranchOptions}
                onChange={handleSelectOptionChange}
                isDisabled={
                  !editable ||
                  isBankBranchComboLoading ||
                  isBankBranchComboFetching ||
                  !accountData.bankID
                }
                value={
                  bankBranchOptions.find(
                    (item) => item.value === accountData?.bankBranchID
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

              <label
                htmlFor="bankBranchID"
                className={
                  accountData?.bankBranchID
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
                شعبه
              </label>
            </div>

            {/* <div className="inputBox__form">
              <select
                disabled={!editable || isBankBranchComboLoading}
                type="text"
                id="bankBranchID"
                name="bankBranchID"
                value={accountData?.bankBranchID || " "}
                onChange={handleAccountDataChange}
                className="inputBox__form--input"
                required
              >
                <option value=" " disabled>
                  انتخاب
                </option>
                {bankBranchCombo.map((bankBranch) => (
                  <option key={bankBranch.lookUpID} value={bankBranch.lookUpID}>
                    {bankBranch.lookUpName}
                  </option>
                ))}
              </select>
              <label htmlFor="bankBranchID" className="inputBox__form--label">
                شعبه
              </label>
            </div> */}

            <div className="inputBox__form">
              <input
                disabled={!editable || isLoading}
                type="text"
                id="accountNo"
                name="accountNo"
                value={convertToPersianNumber(accountData?.accountNo) ?? ""}
                onChange={handleAccountDataChange}
                className="inputBox__form--input"
                required
              />
              <label htmlFor="accountNo" className="inputBox__form--label">
                شماره حساب
              </label>
            </div>

            <div className="inputBox__form">
              <input
                disabled={!editable}
                type="text"
                id="ledgerCode"
                name="ledgerCode"
                value={convertToPersianNumber(accountData?.ledgerCode) ?? ""}
                onChange={handleAccountDataChange}
                className="inputBox__form--input"
                required
              />
              <label htmlFor="ledgerCode" className="inputBox__form--label">
                دفتر کل
              </label>
            </div>

            <div className="inputBox__form">
              <input
                disabled={!editable}
                type="text"
                id="insuranceCoef"
                name="insuranceCoef"
                value={convertToPersianNumber(accountData?.insuranceCoef) ?? ""}
                onChange={handleAccountDataChange}
                className="inputBox__form--input"
                required
              />
              <label htmlFor="insuranceCoef" className="inputBox__form--label">
                ضریب بیمه
              </label>
            </div>

            <div className="inputBox__form">
              <input
                disabled={!editable}
                type="text"
                id="insuranceAmount"
                name="insuranceAmount"
                value={
                  convertToPersianNumber(accountData?.insuranceAmount) ?? ""
                }
                onChange={handleAccountDataChange}
                className="inputBox__form--input"
                required
              />
              <label
                htmlFor="insuranceAmount"
                className="inputBox__form--label"
              >
                بیمه تبعی
              </label>
            </div>
          </form>

          <div style={{ marginRight: "auto" }} className="flex-row">
            <LoadingButton
              dir="ltr"
              endIcon={<SaveIcon />}
              loading={isUpdating}
              disabled={!editable}
              onClick={handleUpdateRetiredAccount}
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

export default RetiredAccountForm;
