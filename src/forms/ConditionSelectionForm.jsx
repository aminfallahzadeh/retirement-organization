// mui imports
import { Button } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
function ConditionSelectionForm() {
  return (
    <section className="formContainer">
      <form method="POST" className="flex-col">
        <div className="grid grid--col-2">
          <div className="inputBox__form">
            <select className="inputBox__form--input" id="role" defaultValue="">
              <option value="" disabled>
                انتخاب کنید
              </option>
              <option value="1">نام خانوادگی بازنشسته</option>
            </select>
            <label className="inputBox__form--label" htmlFor="role">
              خصوصیت
            </label>
          </div>

          <div className="inputBox__form">
            <select className="inputBox__form--input" id="role" defaultValue="">
              <option value="" disabled>
                انتخاب کنید
              </option>
              <option value="1">=</option>
              <option value="2">+</option>

              <option value="3">/</option>
            </select>
          </div>

          <div className="inputBox__form">
            <select className="inputBox__form--input" id="role" defaultValue="">
              <option value="" disabled>
                انتخاب کنید
              </option>
              <option value="1">محمدی</option>
            </select>
            <label className="inputBox__form--label" htmlFor="role">
              شرط
            </label>
          </div>

          <div style={{ marginRight: "auto" }} className="flex-row">
            <Button
              dir="ltr"
              endIcon={<AddIcon />}
              variant="contained"
              color="success"
              sx={{ fontFamily: "sahel" }}
            >
              <span>افزودن شرط</span>
            </Button>

            <Button
              dir="ltr"
              endIcon={<RemoveIcon />}
              variant="contained"
              color="error"
              sx={{ fontFamily: "sahel" }}
            >
              <span>پاک کردن شروط</span>
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ConditionSelectionForm;
