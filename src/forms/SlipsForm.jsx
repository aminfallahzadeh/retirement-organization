// mui imports
import { Button } from "@mui/material";
import {
  VisibilityOutlined as EyeIcon,
  ImportExportOutlined as ExportIcon,
} from "@mui/icons-material";

function SlipsForm() {
  const content = (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="fishType"
          />
          <label className="inputBox__form--label" htmlFor="fishType">
            نوع فیش
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="mahSalary"
          />
          <label className="inputBox__form--label" htmlFor="mahSalary">
            سال مالی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="salSalary"
          />
          <label className="inputBox__form--label" htmlFor="salSalary">
            ماه
          </label>
        </div>
      </form>

      <div style={{ marginRight: "auto" }} className="flex-row">
        <Button
          dir="ltr"
          endIcon={<EyeIcon />}
          variant="contained"
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>مشاهده</span>
        </Button>

        <Button
          dir="ltr"
          endIcon={<ExportIcon />}
          variant="contained"
          color="warning"
          sx={{ fontFamily: "sahel" }}
        >
          <span>صدور</span>
        </Button>
      </div>
    </section>
  );

  return content;
}

export default SlipsForm;
