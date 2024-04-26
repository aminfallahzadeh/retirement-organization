// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

function GenerateStatementForm() {
  return (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-2">
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            name="runDate"
            required
            id="runDate"
          />
          <label className="inputBox__form--label" htmlFor="runDate">
            <span>*</span> تاریخ اجرا
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            name="hokmType"
            required
            id="hokmType"
          />
          <label className="inputBox__form--label" htmlFor="hokmType">
            <span>*</span> نوع حکم
          </label>
        </div>

        <div className="inputBox__form col-span-2 row-span-2">
          <textarea
            type="text"
            className="inputBox__form--input"
            required
            name="hokmDesc"
            id="hokmDesc"
          ></textarea>
          <label className="inputBox__form--label" htmlFor="hokmDesc">
            شرح حکم
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
    </section>
  );
}

export default GenerateStatementForm;
