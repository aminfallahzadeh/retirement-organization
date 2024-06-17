// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// components
import BaseRelatedConditionGrid from "../../grids/BaseInfoGrids/BaseRelatedConditionGrid";

function BaseRelatedConditionForm() {
  const content = (
    <section className="flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <input
            type="text"
            id="relatedConditionCondi"
            className="inputBox__form--input"
            required
          />
          <label
            htmlFor="relatedConditionCondi"
            className="inputBox__form--label"
          >
            وضعیت وابسته
          </label>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="relatedConditionNoSponsorship" />
            <label
              htmlFor="relatedConditionNoSponsorship"
              className="checkboxContainer__label"
            >
              خارج از کفالت
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

      <BaseRelatedConditionGrid />
    </section>
  );

  return content;
}

export default BaseRelatedConditionForm;
