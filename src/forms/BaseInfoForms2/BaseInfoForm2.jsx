// mui imports
import { Button } from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";

function BaseInfoForm2() {
  return (
    <section className="flex-col formContainer">
      <form className="grid grid--col-4">
        <div className="inputBox__form">
          <input className="inputBox__form--input" type="text" required />
          <label className="inputBox__form--label">شناسه</label>
        </div>

        <div className="inputBox__form">
          <input className="inputBox__form--input" type="text" required />
          <label className="inputBox__form--label">نام</label>
        </div>
      </form>
      <div style={{ marginRight: "auto" }}>
        <Button
          dir="ltr"
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
          endIcon={<SaveIcon />}
        >
          <span>ذخیره</span>
        </Button>
      </div>
    </section>
  );
}

export default BaseInfoForm2;
