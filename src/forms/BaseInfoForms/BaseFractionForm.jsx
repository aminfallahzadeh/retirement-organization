// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// components
import BaseFractionGrid from "../../grids/BaseInfoGrids/BaseFractionGrid";

function BaseFractionForm() {
  const content = (
    <section className="flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <input
            type="text"
            id="baseFractionName"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="baseFractionName" className="inputBox__form--label">
            نام سازمان
          </label>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="baseFractionIsActive" />
            <label
              htmlFor="baseFractionIsActive"
              className="checkboxContainer__label"
            >
              فعال
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

      <BaseFractionGrid />
    </section>
  );
  return content;
}

export default BaseFractionForm;
