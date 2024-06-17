// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// components
import BaseRetirementBenefitsGrid from "../../grids/BaseInfoGrids/BaseRetirementBenefitsGrid";

function BaseRetirementBenefitsForm() {
  const content = (
    <section className="flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <input
            type="text"
            id="baseRetirementBenefitYear"
            className="inputBox__form--input"
            required
          />
          <label
            htmlFor="baseRetirementBenefitYear"
            className="inputBox__form--label"
          >
            سال
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="baseRetirementMaritalRights"
            className="inputBox__form--input"
            required
          />
          <label
            htmlFor="baseRetirementMaritalRights"
            className="inputBox__form--label"
          >
            حق عائله مندی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="baseRetirementChildrenRights"
            className="inputBox__form--input"
            required
          />
          <label
            htmlFor="baseRetirementChildrenRights"
            className="inputBox__form--label"
          >
            حق اولاد
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

      <BaseRetirementBenefitsGrid />
    </section>
  );

  return content;
}

export default BaseRetirementBenefitsForm;
