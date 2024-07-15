// react imports
import { useState, useEffect } from "react";

// mui imports
import { Save as SaveIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

function GroupFormulaForm({ formulaGroups }) {
  return (
    <section className="flex-col formContainer">
      <form className="grid grid--col-2">
        {formulaGroups.map((formula) => (
          <div key={formula.retirementStatementFormulaGroupSettingID}>
            <span>{formula.description}</span>
          </div>
        ))}
      </form>
      <div style={{ marginRight: "auto" }}>
        <LoadingButton
          dir="ltr"
          variant="contained"
          color="success"
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
