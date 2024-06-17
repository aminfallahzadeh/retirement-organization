// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// components
import BaseFractionMoveTypeGrid from "../../grids/BaseInfoGrids/BaseFractionMoveTypeGrid";

function BaseFractionMoveTypeForm() {
  const content = (
    <section className="flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <input
            type="text"
            id="baseFractionMoveHow"
            className="inputBox__form--input"
            required
          />
          <label
            htmlFor="baseFractionMoveHow"
            className="inputBox__form--label"
          >
            نحوه انتقال کسور
          </label>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="baseFractionMoveMustLetter" />
            <label
              htmlFor="baseFractionMoveMustLetter"
              className="checkboxContainer__label"
            >
              الزام نامه
            </label>
          </div>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="baseFractionMoveMustDoc" />
            <label
              htmlFor="baseFractionMoveMustDoc"
              className="checkboxContainer__label"
            >
              الزام سند
            </label>
          </div>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="baseFractionMoveMustAccount" />
            <label
              htmlFor="baseFractionMoveMustAccount"
              className="checkboxContainer__label"
            >
              الزام حساب
            </label>
          </div>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="baseFractionMoveIsActive" />
            <label
              htmlFor="baseFractionMoveIsActive"
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

      <BaseFractionMoveTypeGrid />
    </section>
  );

  return content;
}

export default BaseFractionMoveTypeForm;
