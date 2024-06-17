// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// components
import BaseRetiredConditionGrid from "../../grids/BaseInfoGrids/BaseRetiredConditionGrid";

function BaseRetiredConditionForm() {
  const content = (
    <section className="flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <input
            type="text"
            id="retiredConditionDesc"
            className="inputBox__form--input"
            required
          />
          <label
            htmlFor="retiredConditionDesc"
            className="inputBox__form--label"
          >
            شرح وضعیت
          </label>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="retiredConditionIsStopSalary" />
            <label
              htmlFor="retiredConditionIsStopSalary"
              className="checkboxContainer__label"
            >
              قطع حقوق
            </label>
          </div>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="retiredConditionIsDead" />
            <label
              htmlFor="retiredConditionIsDead"
              className="checkboxContainer__label"
            >
              فوتی
            </label>
          </div>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="retiredConditionIsFirstCondi" />
            <label
              htmlFor="retiredConditionIsFirstCondi"
              className="checkboxContainer__label"
            >
              وضعیت اول
            </label>
          </div>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="retiredConditionNoStatement" />
            <label
              htmlFor="retiredConditionNoStatement"
              className="checkboxContainer__label"
            >
              عدم امکان صدور حکم
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

      <BaseRetiredConditionGrid />
    </section>
  );

  return content;
}

export default BaseRetiredConditionForm;
