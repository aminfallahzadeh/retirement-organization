// react imports
import { useState, useEffect, useCallback } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import {
  useGetLookupDataQuery,
  useLazyGetLookupDataQuery,
} from "../slices/sharedApiSlice.js";
import { useGetRetiredAccountQuery } from "../slices/retiredApiSlice";
import { useUpdateRetiredAccountMutation } from "../slices/retiredApiSlice";

// mui imports
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  Save as SaveIcon,
  EditOutlined as EditIcon,
} from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";

// helpers
import { convertToPersianNumber, convertToEnglishNumber } from "../helper";

function RetiredAccountForm() {
  const [editable, setEditable] = useState(false);

  // LOOP UP STATES
  const [bankCombo, setBankCombo] = useState([]);
  const [bankBranchCombo, setBankBranchCombo] = useState([]);

  // ACCOUNT DATA STATE
  const [accountData, setAccountData] = useState({});

  // ACCESS QUERY PARAMS
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  const [updateRetiredAccount, { isLoading: isUpdating }] =
    useUpdateRetiredAccountMutation();

  const [getLookupData, { isLoading: isBankBranchComboLoading }] =
    useLazyGetLookupDataQuery();

  // GET MAIN DATA
  const {
    data: retiredAccountData,
    isSuccess,
    isLoading,
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

  // FETCH ACCOUNT DATA
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
    }
  }, [accountData.bankID, fetchBankBranchData]);

  // GET LOOKUP DATA
  const {
    data: bankComboItems,
    isSuccess: isBankComboSuccess,
    isLoading: isBankComboLoading,
  } = useGetLookupDataQuery({
    lookUpType: "Bank",
  });

  // FETCH LOOKUP DATA
  useEffect(() => {
    if (isBankComboSuccess) {
      setBankCombo(bankComboItems.itemList);
    }
  }, [isBankComboSuccess, bankComboItems]);

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
        ledgerCode: parseInt(accountData.ledgerCode),
        insuranceAmount: parseFloat(
          convertToEnglishNumber(accountData.insuranceAmount)
        ),
        insuranceCoef: parseFloat(
          convertToEnglishNumber(accountData.insuranceCoef)
        ),
        accountNo: convertToEnglishNumber(accountData.accountNo),
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

  return (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-3" noValidate>
        <div className="inputBox__form">
          <select
            disabled={!editable || isBankComboLoading}
            type="text"
            id="bankID"
            name="bankID"
            value={accountData.bankID || " "}
            onChange={handleAccountDataChange}
            className="inputBox__form--input"
          >
            <option value=" ">انتخاب</option>
            {bankCombo.map((bank) => (
              <option key={bank.lookUpID} value={bank.lookUpID}>
                {bank.lookUpName}
              </option>
            ))}
          </select>
          <label htmlFor="bankID" className="inputBox__form--label">
            بانک
          </label>
        </div>

        <div className="inputBox__form">
          <select
            disabled={!editable || isBankBranchComboLoading}
            type="text"
            id="bankBranchID"
            name="bankBranchID"
            value={accountData.bankBranchID || ""}
            onChange={handleAccountDataChange}
            className="inputBox__form--input"
            required
          >
            <option value=" ">انتخاب</option>
            {bankBranchCombo.map((bankBranch) => (
              <option key={bankBranch.lookUpID} value={bankBranch.lookUpID}>
                {bankBranch.lookUpName}
              </option>
            ))}
          </select>
          <label htmlFor="bankBranchID" className="inputBox__form--label">
            شعبه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable || isLoading}
            type="text"
            id="accountNo"
            name="accountNo"
            value={
              isLoading
                ? "در حال بارگذاری"
                : convertToPersianNumber(accountData.accountNo) ?? ""
            }
            onChange={handleAccountDataChange}
            className="inputBox__form--input"
            required
          />
          <label htmlFor="accountNo" className="inputBox__form--label">
            حساب
          </label>
        </div>

        <div className="inputBox__form">
          <input
            disabled={!editable}
            type="text"
            id="ledgerCode"
            name="ledgerCode"
            value={
              isLoading
                ? "در حال بارگذاری"
                : convertToPersianNumber(accountData.ledgerCode) ?? ""
            }
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
            value={
              isLoading
                ? "در حال بارگذاری"
                : convertToPersianNumber(accountData.insuranceCoef) ?? ""
            }
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
              isLoading
                ? "در حال بارگذاری"
                : convertToPersianNumber(accountData.insuranceAmount) ?? ""
            }
            onChange={handleAccountDataChange}
            className="inputBox__form--input"
            required
          />
          <label htmlFor="insuranceAmount" className="inputBox__form--label">
            بیمه تبعی
          </label>
        </div>
      </form>

      <div style={{ marginRight: "auto" }} className="flex-row">
        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          loading={isUpdating}
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
  );
}

export default RetiredAccountForm;
