// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// components
import BaseJobOrderGrid from "../../grids/BaseInfoGrids/BaseJobOrderGrid";

function BaseJobOrderForm() {
  const content = (
    <section className="flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <input
            type="text"
            id="baseJobOrderCondition"
            className="inputBox__form--input"
            required
          />
          <label
            htmlFor="baseJobOrderCondition"
            className="inputBox__form--label"
          >
            وضعیت مرتبه شغلی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="baseJobOrderCoef"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="baseJobOrderCoef" className="inputBox__form--label">
            ضریب مرتبه شغلی
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

      <BaseJobOrderGrid />
    </section>
  );

  return content;
}

export default BaseJobOrderForm;
