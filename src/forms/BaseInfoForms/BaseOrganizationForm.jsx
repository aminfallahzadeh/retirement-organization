// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// components
import BaseOrganizationGrid from "../../grids/BaseInfoGrids/BaseOrganizationGrid";

function BaseOrganizationForm() {
  const content = (
    <section className="flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <input
            type="text"
            id="baseOrganName"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="baseOrganName" className="inputBox__form--label">
            نام سازمان
          </label>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="baseOrganIsActive" />
            <label
              htmlFor="baseOrganIsActive"
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

      <BaseOrganizationGrid />
    </section>
  );

  return content;
}

export default BaseOrganizationForm;
