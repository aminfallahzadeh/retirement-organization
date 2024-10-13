// REACT IMPORTS
import { useEffect, useState, useCallback } from "react";

// MUI
import { Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// REDUX
import { useInsertFinancialItemMutation } from "../slices/financialItemApiSlice";
import { useLazyGetPayItemTypeQuery } from "../slices/sharedApiSlice";
import { useSelector } from "react-redux";

// HOOKS
import useGetFinancialItems from "../hooks/useGetFinancialItems";

// LIBRARIES
import { toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// HOOKS
import { useFetchPayItemType } from "../hooks/useFetchLookUpData";

// UTILS
import { selectSettings, optionsGenerator } from "../utils/reactSelect";

// HELPERS
import {
  convertToPersianNumber,
  separateByThousands,
  convertToEnglishNumber,
  removeSeparators,
} from "../helper";

function CreatePayItemForm({ setIsInsertItemModalOpen }) {
  // MAIN STATE
  const [form_data, setForm_data] = useState({});
  const [payItemTypeName, setPayItemTypeName] = useState("");

  const animatedComponents = makeAnimated();

  const personID = useSelector((state) => state.financialData.payPersonID);

  // ACCESS QUERIS
  const { getFinancialItems } = useGetFinancialItems();
  const [insertItem, { isLoading: isItemInserting }] =
    useInsertFinancialItemMutation();

  useEffect(() => {
    console.log(form_data);
  }, [form_data]);

  // FETCH LOOK UP DATA
  const { payItemTypes, payItemTypesIsLoading, payItemTypesIsFetching } =
    useFetchPayItemType();

  // SELECT OPTIONS
  const payItemOptions = optionsGenerator(
    payItemTypes,
    "payItemTypeID",
    "payItemTypeName"
  );

  // HANDLERS
  const handleSubmit = async () => {
    try {
      // REMOVE isInstallment
      const { isInstallment, ...filteredData } = form_data;

      const res = await insertItem({
        ...filteredData,
        financialItemID: null,
        expireData: null,
        payItemTypeName: null,
        personID,
      }).unwrap();
      console.log(res);
      setIsInsertItemModalOpen(false);
      toast.success(res.message, {
        autoClose: 2000,
      });
      getFinancialItems(personID);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  };

  // MAIN DATA CHANGE HANDLER
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setForm_data({
      ...form_data,
      [name]: convertToEnglishNumber(removeSeparators(value)),
    });
  };

  // HANDLE SELECT OPTION CHANGE
  const handleSelectOptionChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    if (selectedOption) {
      const { value } = selectedOption;
      setForm_data({ ...form_data, [name]: value });
    } else {
      setForm_data({ ...form_data, [name]: null });
    }
  };

  // ACCESS QUERIES
  const [getPayItem, { isLoading }] = useLazyGetPayItemTypeQuery();

  const fetchPayItem = useCallback(
    async (id) => {
      try {
        const res = await getPayItem(id).unwrap();
        setPayItemTypeName(res.itemList[0].payItemTypeName);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    [getPayItem]
  );

  // GET ITEM DATA ON USER SELECT
  useEffect(() => {
    if (form_data.payItemTypeID) {
      fetchPayItem(form_data.payItemTypeID);
    } else {
      setPayItemTypeName("");
    }
  }, [form_data.payItemTypeID, fetchPayItem]);

  // CHECKBOX HANDLER
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setForm_data({ ...form_data, [name]: checked });
  };

  // INSTALLMENT AMOUNT CHANGE HANDLER
  useEffect(() => {
    if (form_data.instalementCount && form_data.financialItemAmount) {
      const count = parseInt(form_data.instalementCount);
      const amount = parseFloat(form_data.financialItemAmount);

      if (count > 0) {
        const instalementAmount = amount / count;
        setForm_data((prev) => ({
          ...prev,
          instalementAmount: instalementAmount.toFixed(),
        }));
      }
    } else if (
      form_data.instalementCount === "" ||
      form_data.financialItemAmount === ""
    ) {
      setForm_data((prev) => ({
        ...prev,
        instalementAmount: "",
      }));
    }
  }, [form_data.instalementCount, form_data.financialItemAmount]);

  const content = (
    <section className="formContainer-transparent formContainer--width-lg flex-col">
      <form method="POST" className="flex-col" noValidate>
        <div className="grid grid--col-3">
          <div className="inputBox__form">
            <Select
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={payItemOptions}
              onChange={handleSelectOptionChange}
              value={payItemOptions.find(
                (c) => c.value === form_data?.payItemTypeID
              )}
              name="payItemTypeID"
              isClearable={true}
              placeholder={
                <div className="react-select-placeholder">
                  <span>*</span> شناسه آیتم
                </div>
              }
              noOptionsMessage={selectSettings.noOptionsMessage}
              loadingMessage={selectSettings.loadingMessage}
              styles={{
                container: (base) => ({
                  ...base,
                  position: "relative",
                  height: "100%",
                }),
                control: (base) => ({
                  ...base,
                  fontFamily: "IranYekan",
                  cursor: "pointer",
                  fontSize: "12px",
                  height: "100%",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  overflow: "auto",
                  textOverflow: "ellipsis",
                  position: "relative",
                }),
                menu: (base) => ({
                  ...base,
                  fontFamily: "IranYekan",
                  zIndex: "5",
                  height: "200px",
                }),
                option: (base) => ({
                  ...base,
                  cursor: "pointer",
                }),
                menuList: (base) => ({
                  ...base,
                  fontFamily: "IranYekan",
                  zIndex: "5",
                  height: "200px",
                }),
              }}
              isLoading={payItemTypesIsLoading || payItemTypesIsFetching}
            />
            <label
              className={
                form_data?.payItemTypeID
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              <span>*</span> شناسه آیتم
            </label>
          </div>

          <div className="inputBox__form">
            <input
              type="text"
              className="inputBox__form--input"
              value={convertToPersianNumber(form_data.payItemTypeID) || ""}
              name="payItemTypeName"
              id="payItemTypeName"
              disabled
              onChange={handleDataChange}
              required
            />
            <label className="inputBox__form--label" htmlFor="payItemTypeName">
              <span>*</span> شرح آیتم
            </label>
          </div>

          <div className="inputBox__form">
            <input
              type="text"
              className="inputBox__form--input"
              onChange={handleDataChange}
              value={
                convertToPersianNumber(
                  separateByThousands(form_data.financialItemAmount)
                ) || ""
              }
              name="financialItemAmount"
              id="financialItemAmount"
              required
            />
            <label
              className="inputBox__form--label"
              htmlFor="financialItemAmount"
            >
              <span>*</span> مبلغ کل
            </label>
          </div>

          <h4
            className="title-quaternary"
            style={{ justifySelf: "start", alignSelf: "center" }}
          >
            تاریخ شروع محاسبه فیش :
          </h4>

          <div className="inputBox__form">
            <input
              type="text"
              className="inputBox__form--input"
              value={convertToPersianNumber(form_data?.executeYear) || ""}
              name="executeYear"
              id="executeYear"
              required
              onChange={handleDataChange}
            />
            <label className="inputBox__form--label" htmlFor="executeYear">
              <span>*</span> سال
            </label>
          </div>

          <div className="inputBox__form">
            <input
              type="text"
              className="inputBox__form--input"
              value={convertToPersianNumber(form_data?.executeMonth) || ""}
              name="executeMonth"
              id="executeMonth"
              onChange={handleDataChange}
              required
            />
            <label className="inputBox__form--label" htmlFor="executeYear">
              <span>*</span> ماه
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
              onChange={handleCheckboxChange}
              name="isInstallment"
              id="isInstallment"
              sx={{
                padding: 0.5,
              }}
            />
            <label htmlFor="isInstallment" className="checkboxContainer__label">
              قسطی
            </label>
          </div>

          {form_data.isInstallment && (
            <>
              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  value={
                    convertToPersianNumber(form_data?.instalementCount) || ""
                  }
                  name="instalementCount"
                  id="instalementCount"
                  required
                  onChange={handleDataChange}
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="instalementCount"
                >
                  <span>*</span> تعداد قسط
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  onChange={handleDataChange}
                  value={
                    separateByThousands(
                      convertToPersianNumber(form_data?.instalementAmount)
                    ) || ""
                  }
                  name="instalementAmount"
                  id="instalementAmount"
                  required
                  disabled
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="instalementAmount"
                >
                  <span>*</span> مبلغ قسط
                </label>
              </div>
            </>
          )}
        </div>

        <div style={{ marginRight: "auto" }}>
          <LoadingButton
            dir="ltr"
            endIcon={<SaveIcon />}
            variant="contained"
            onClick={handleSubmit}
            type="submit"
            loading={isItemInserting}
            color="success"
            sx={{ fontFamily: "sahel" }}
          >
            <span>ذخیره</span>
          </LoadingButton>
        </div>
      </form>
    </section>
  );
  return content;
}
export default CreatePayItemForm;
