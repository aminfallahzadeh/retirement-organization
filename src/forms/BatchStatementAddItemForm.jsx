// mui imports
import { Button } from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";

function BatchStatementAddItemForm() {
  const content = (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-2">
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="itemType"
          />
          <label className="inputBox__form--label" htmlFor="itemType">
            نوع آیتم
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="incrementType"
          />
          <label className="inputBox__form--label" htmlFor="incrementType">
            نوع افزایش
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="amount"
          />
          <label className="inputBox__form--label" htmlFor="amount">
            مقدار
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="year"
          />
          <label className="inputBox__form--label" htmlFor="year">
            سال
          </label>
        </div>
      </form>

      <div style={{ marginRight: "auto" }}>
        <Button
          dir="ltr"
          endIcon={<SaveIcon />}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ذخیره</span>
        </Button>
      </div>
    </section>
  );
  return content;
}

export default BatchStatementAddItemForm;
