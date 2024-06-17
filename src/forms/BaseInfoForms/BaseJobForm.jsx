// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// components
import BaseJobGrid from "../../grids/BaseInfoGrids/BaseJobGrid";

function BaseJobForm() {
  const content = (
    <section className="flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <input
            type="text"
            id="baseJob"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="baseJob" className="inputBox__form--label">
            شرح شغل
          </label>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="baseJobIsManager" />
            <label
              htmlFor="baseJobIsManager"
              className="checkboxContainer__label"
            >
              مدیر
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

      <BaseJobGrid />
    </section>
  );

  return content;
}

export default BaseJobForm;
