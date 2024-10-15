// REACT IMPORTS
import { useEffect, useState } from "react";

// MUI
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// REDUX
import { useInsertPayItemMutation } from "../slices/payApiSlice";

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

function InsertPayItemForm({ payID, setIsInsertItemModalOpen, refetch }) {
  // MAIN STATE
  const [form_data, setForm_data] = useState({});

  const animatedComponents = makeAnimated();

  // ACCESS QUERIS
  const [insertItem, { isLoading: isItemInserting }] =
    useInsertPayItemMutation();

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
      const res = await insertItem({
        ...form_data,
        payItemDate: new Date(),
        payID,
      }).unwrap();
      toast.success(res.message, {
        autoClose: 2000,
      });
      setIsInsertItemModalOpen(false);
      refetch();
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
                  <span>*</span> شرح آیتم
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
              <span>*</span> شرح آیتم
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
              <span>*</span> شناسه آیتم
            </label>
          </div>

          <div className="inputBox__form">
            <input
              type="text"
              className="inputBox__form--input"
              onChange={handleDataChange}
              value={
                convertToPersianNumber(
                  separateByThousands(form_data.payItemAmount)
                ) || ""
              }
              name="payItemAmount"
              id="payItemAmount"
              required
            />
            <label className="inputBox__form--label" htmlFor="payItemAmount">
              <span>*</span> مبلغ کل
            </label>
          </div>

          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
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
export default InsertPayItemForm;
