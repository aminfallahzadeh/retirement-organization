// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// components
import BaseYearsCoefGrid from "../../grids/BaseInfoGrids/BaseYearsCoefGrid";

function BaseYearsCoefForm() {
  const content = (
    <section className="flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <input
            type="text"
            id="yearCoefYear"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="yearCoefYear" className="inputBox__form--label">
            ضریب سال
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="yearCoefYearCountry"
            className="inputBox__form--input"
            required
          />
          <label
            htmlFor="yearCoefYearCountry"
            className="inputBox__form--label"
          >
            ضریب سال کشوری
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="minSalary"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="minSalary" className="inputBox__form--label">
            حداقل حقوق
          </label>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="baseIsBaseCalc" />
            <label
              htmlFor="baseIsBaseCalc"
              className="checkboxContainer__label"
            >
              مبنای محاسبه
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

      <BaseYearsCoefGrid />
    </section>
  );

  return content;
}

export default BaseYearsCoefForm;
