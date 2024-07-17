// react imports
import { useState } from "react";

// redux imports
import { useUpdateRetirementStatementFormulaGroupSettingMutation } from "../slices/retirementStatementApiSlice.js";

// library imports
import { toast } from "react-toastify";

// mui imports
import { Save as SaveIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

// helpers
import { convertToPersianNumber } from "../helper";

function GroupFormulaForm({ formulaGroups, retirementStatementItemID }) {
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

  const handleSaveChanges = async (id) => {
    try {
      const res = await updateRetirementStatementFormulaGroupSetting(
        data.find((d) => d.retirementStatementFormulaGroupSettingID === id)
      ).unwrap();
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

            <div className="inputBox__form">
              <input
                className="inputBox__form--input"
                type="text"
                value={
                  data.find(
                    (item) =>
                      item.retirementStatementFormulaGroupSettingID ===
                      formula.retirementStatementFormulaGroupSettingID
                  ).value
                }
                onChange={(e) =>
                  handleDataChange(
                    formula.retirementStatementFormulaGroupSettingID,
                    e.target.value
                  )
                }
              />
            </div>
            {/* <QuantityInput
              value={
                data.find(
                  (d) =>
                    d.retirementStatementFormulaGroupSettingID ===
                    formula.retirementStatementFormulaGroupSettingID
                ).value
              }
              onChange={(val) =>
                handleDataChange(
                  formula.retirementStatementFormulaGroupSettingID,
                  val
                )
              }
            /> */}
            <LoadingButton
              dir="ltr"
              variant="contained"
              color="success"
              loading={isLoading}
              onClick={() =>
                handleSaveChanges(
                  formula.retirementStatementFormulaGroupSettingID
                )
              }
              sx={{ fontFamily: "IranYekan" }}
              endIcon={<SaveIcon />}
            >
              <span>ذخیره</span>
            </LoadingButton>
          </div>
        ))}
      </form>
    </section>
  );
}

export default GroupFormulaForm;
