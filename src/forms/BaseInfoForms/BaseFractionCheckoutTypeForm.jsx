// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// components
import BaseFractionCheckoutTypeGrid from "../../grids/BaseInfoGrids/BaseFractionCheckoutTypeGrid";

function BaseFractionCheckoutTypeFrom() {
  const content = (
    <section className="flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <input
            type="text"
            id="baseFractionCheckoutType"
            className="inputBox__form--input"
            required
          />
          <label
            htmlFor="baseFractionCheckoutType"
            className="inputBox__form--label"
          >
            نحوه تسویه کسور
          </label>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="baseFractionCheckoutMustLetter" />
            <label
              htmlFor="baseFractionCheckoutMustLetter"
              className="checkboxContainer__label"
            >
              الزام نامه
            </label>
          </div>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="baseFractionCheckoutMustDoc" />
            <label
              htmlFor="baseFractionCheckoutMustDoc"
              className="checkboxContainer__label"
            >
              الزام سند
            </label>
          </div>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="baseFractionCheckoutMustAccount" />
            <label
              htmlFor="baseFractionCheckoutMustAccount"
              className="checkboxContainer__label"
            >
              الزام حساب
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

      <BaseFractionCheckoutTypeGrid />
    </section>
  );

  return content;
}

export default BaseFractionCheckoutTypeFrom;
