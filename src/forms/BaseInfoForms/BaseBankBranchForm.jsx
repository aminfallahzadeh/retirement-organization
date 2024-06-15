// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// components
import BaseBankBranchGrid from "../../grids/BaseInfoGrids/BaseBankBranchGrid";

function BaseBankBranchForm() {
  const content = (
    <section className="flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <input
            type="text"
            id="bankName"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="bankName" className="inputBox__form--label">
            نام بانک
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="bankBranchID"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="bankBranchID" className="inputBox__form--label">
            کد شعبه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="bankBranchName"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="bankBranchName" className="inputBox__form--label">
            نام شعبه
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

      <BaseBankBranchGrid />
    </section>
  );
  return content;
}

export default BaseBankBranchForm;
