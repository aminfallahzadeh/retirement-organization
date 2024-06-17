// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// components
import BaseHeirConditionGrid from "../../grids/BaseInfoGrids/BaseHeirConditionGrid";

function BaseHeirConditionForm() {
  const content = (
    <section className="flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <input
            type="text"
            id="heirConditionCondi"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="heirConditionCondi" className="inputBox__form--label">
            وضعیت وظیفه بگیران
          </label>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="heirConditionIsStopSalary" />
            <label
              htmlFor="heirConditionIsStopSalary"
              className="checkboxContainer__label"
            >
              قطع حقوق
            </label>
          </div>
        </div>
      </form>

      <div style={{ marginRight: "auto" }}>
        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ذخیره</span>
        </LoadingButton>
      </div>

      <BaseHeirConditionGrid />
    </section>
  );

  return content;
}

export default BaseHeirConditionForm;
