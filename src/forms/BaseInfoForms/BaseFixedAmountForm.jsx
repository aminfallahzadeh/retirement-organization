// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// components
import BaseFixedAmountGrid from "../../grids/BaseInfoGrids/BaseFixedAmountGrid";

function BaseFixedAmountForm() {
  const content = (
    <section className="flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <input
            type="text"
            id="fixedAmountNationalCode"
            className="inputBox__form--input"
            required
          />
          <label
            htmlFor="fixedAmountNationalCode"
            className="inputBox__form--label"
          >
            شماره ملی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="fixedAmountFirstName"
            className="inputBox__form--input"
            required
          />
          <label
            htmlFor="fixedAmountFirstName"
            className="inputBox__form--label"
          >
            نام
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="fixedAmountLastName"
            className="inputBox__form--input"
            required
          />
          <label
            htmlFor="fixedAmountLastName"
            className="inputBox__form--label"
          >
            نام خانوادگی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="fixedAmountCaseNO"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="fixedAmountCaseNO" className="inputBox__form--label">
            شماره پرونده
          </label>
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

      <BaseFixedAmountGrid />
    </section>
  );

  return content;
}

export default BaseFixedAmountForm;
