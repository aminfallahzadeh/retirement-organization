// react imports
import { useState } from "react";

// redux imports
import { useUpdateRetirementStatementFormulaGroupSettingMutation } from "../slices/retirementStatementApiSlice.js";

// library imports
import { toast } from "react-toastify";

// mui imports
import { Save as SaveIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

// components
import NumberInput from "../components/NumberInput.jsx";

// helpers
import { convertToPersianNumber } from "../helper";

function GroupFormulaForm({
  formulaGroups,
  retirementStatementItemID,
  setIsItemsEdited,
}) {
  const [data, setData] = useState(
    formulaGroups.map((formula) => ({
      retirementStatementItemID,
      retirementStatementFormulaGroupSettingID:
        formula.retirementStatementFormulaGroupSettingID,
      description: formula.description,
      value: formula.value,
    }))
  );

  const handleDataChange = (id, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.retirementStatementFormulaGroupSettingID === id
          ? { ...item, value }
          : item
      )
    );
  };

  const [updateRetirementStatementFormulaGroupSetting, { isLoading }] =
    useUpdateRetirementStatementFormulaGroupSettingMutation();

  const handleSaveChanges = async () => {
    try {
      const res = await updateRetirementStatementFormulaGroupSetting(
        data
      ).unwrap();
      setIsItemsEdited(true);
      toast.success(res.message, {
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
    <section className="flex-col formContainer">
      <form className="grid grid--col-2">
        {formulaGroups.map((formula, index) => (
          <div
            key={formula.retirementStatementFormulaGroupSettingID}
            className="flex-right flex-row"
          >
            <span>
              {convertToPersianNumber(index + 1)}. {formula.description}
            </span>

            <NumberInput
              value={convertToPersianNumber(
                data?.find(
                  (item) =>
                    item.retirementStatementFormulaGroupSettingID ===
                    formula.retirementStatementFormulaGroupSettingID
                ).value
              )}
              onInputChange={(val) =>
                handleDataChange(
                  formula.retirementStatementFormulaGroupSettingID,
                  val
                )
              }
            />
          </div>
        ))}
      </form>
      <div style={{ marginRight: "auto" }}>
        <LoadingButton
          dir="ltr"
          variant="contained"
          color="success"
          onClick={handleSaveChanges}
          loading={isLoading}
          sx={{ fontFamily: "IranYekan" }}
          endIcon={<SaveIcon />}
        >
          <span>ذخیره</span>
        </LoadingButton>
      </div>
    </section>
  );
}

export default GroupFormulaForm;
