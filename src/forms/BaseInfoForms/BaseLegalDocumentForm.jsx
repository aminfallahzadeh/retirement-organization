// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// components
import BaseLegalDocumentGrid from "../../grids/BaseInfoGrids/BaseLegalDocumentGrid";

function BaseLegalDocumentForm() {
  const content = (
    <section className="flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <input
            type="text"
            id="baseLegalDocName"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="baseLegalDocName" className="inputBox__form--label">
            نام مستند
          </label>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="baseLegalDocIsDefault" />
            <label
              htmlFor="baseLegalDocIsDefault"
              className="checkboxContainer__label"
            >
              پیش فرض
            </label>
          </div>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="baseLegalDocIsActive" />
            <label
              htmlFor="baseLegalDocIsActive"
              className="checkboxContainer__label"
            >
              فعال
            </label>
          </div>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="baseLegalDocIsRetirement" />
            <label
              htmlFor="baseLegalDocIsRetirement"
              className="checkboxContainer__label"
            >
              بازنشستگی
            </label>
          </div>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="baseLegalDocIsWelfare" />
            <label
              htmlFor="baseLegalDocIsWelfare"
              className="checkboxContainer__label"
            >
              رفاهی
            </label>
          </div>
        </div>

        <div className="checkboxContainer">
          <div className="checkboxContainer__item">
            <input type="checkbox" id="baseLegalDocIsFractionMove" />
            <label
              htmlFor="baseLegalDocIsFractionMove"
              className="checkboxContainer__label"
            >
              انتقال کسور
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

      <BaseLegalDocumentGrid />
    </section>
  );

  return content;
}

export default BaseLegalDocumentForm;
