// react imports
import { useState, useEffect } from "react";

// redux imports
import { useSelector } from "react-redux";
import { useGetLookupDataQuery } from "../slices/sharedApiSlice.js";
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

function RetiredAdditionalInfo({ personID }) {
  const [bankCombo, setBankCombo] = useState([]);
  const [bankBranchCombo, setBankBranchCombo] = useState([]);
  const [accountData, setAccountData] = useState({});
  const { token } = useSelector((state) => state.auth);

  const [updateRetiredAccount, { isLoading: isUpdating }] =
    useUpdateRetiredAccountMutation();

  const {
    data: retiredAccountData,
    isSuccess,
    error,
  } = useGetRetiredAccountQuery({
    token,
    personID,
  });

  const handleAccountDataChange = (e) => {
    const { name, value } = e.target;
    setAccountData({ ...accountData, [name]: value });
  };

  useEffect(() => {
    if (isSuccess) {
      setAccountData(retiredAccountData);
    }
  }, [isSuccess, retiredAccountData]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  const {
    data: bankComboItems,
    isSuccess: isBankComboSuccess,
    error: bankComboError,
  } = useGetLookupDataQuery({
    token,
    lookUpType: "Bank",
    lookUpId: accountData.bankID,
  });

  const {
    data: bankBranchComboItems,
    isSuccess: isBankBranchComboSuccess,
    error: bankBranchComboError,
  } = useGetLookupDataQuery({
    token,
    lookUpType: "BankBranch",
    lookUpId: accountData.bankBranchID,
  });

  useEffect(() => {
    if (isBankComboSuccess) {
      setBankCombo(bankComboItems.itemList);
    }
  }, [isBankComboSuccess, bankComboItems]);

  useEffect(() => {
    if (bankComboError) {
      toast.error(bankComboError?.data?.message || bankComboError.error, {
        autoClose: 2000,
      });
    }
  }, [bankComboError]);

  useEffect(() => {
    if (isBankBranchComboSuccess) {
      setBankBranchCombo(bankBranchComboItems.itemList);
    }
  }, [isBankBranchComboSuccess, bankBranchComboItems]);

  useEffect(() => {
    if (bankBranchComboError) {
      toast.error(
        bankBranchComboError?.data?.message || bankBranchComboError.error,
        {
          autoClose: 2000,
        }
      );
    }
  }, [bankBranchComboError]);

  useEffect(() => {
    console.log("accountData", accountData);
  }, [accountData]);

  const handleUpdateRetiredAccount = async () => {
    try {
      const updateRes = await updateRetiredAccount({
        token,
        data: {
          ...accountData,
          ledgerCode: parseInt(accountData.ledgerCode),
          insuranceAmount: parseInt(
            convertToEnglishNumber(accountData.insuranceAmount)
          ),
          insuranceCoef: parseFloat(
            convertToEnglishNumber(accountData.insuranceCoef)
          ),
          accountNo: convertToEnglishNumber(accountData.accountNo),
        },
      }).unwrap();
      console.log("updateRes", updateRes);
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
            type="text"
            id="bankID"
            name="bankID"
            value={accountData.bankID || ""}
            onChange={handleAccountDataChange}
            className="inputBox__form--input"
            required
          >
            <option value="2">انتخاب</option>
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
            type="text"
            id="bankBranchID"
            name="bankBranchID"
            value={accountData.bankBranchID || ""}
            onChange={handleAccountDataChange}
            className="inputBox__form--input"
            required
          >
            <option value="2">انتخاب</option>
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
            type="text"
            id="accountNo"
            name="accountNo"
            value={convertToPersianNumber(accountData.accountNo) ?? ""}
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
            type="text"
            id="ledgerCode"
            name="ledgerCode"
            value={convertToPersianNumber(accountData.ledgerCode) ?? ""}
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
            type="text"
            id="insuranceCoef"
            name="insuranceCoef"
            value={convertToPersianNumber(accountData.insuranceCoef) ?? ""}
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
            type="text"
            id="insuranceAmount"
            name="insuranceAmount"
            value={convertToPersianNumber(accountData.insuranceAmount) ?? ""}
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

export default RetiredAdditionalInfo;
