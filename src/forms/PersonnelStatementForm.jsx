// components
import StaffGrid from "../grids/StaffGrid";

// mui imports
import { Button } from "@mui/material";
import {
  SearchOutlined as SearchIcon,
  RemoveRedEyeOutlined as EyeIcon,
} from "@mui/icons-material";

function PersonnelStatementForm() {
  const content = (
    <>
      <section className="formContainer flex-col">
        <form method="POST" className="grid grid--col-4">
          <div className="inputBox__form">
            <input
              type="text"
              id="codemelli"
              className="inputBox__form--input"
              required
            />
            <label htmlFor="codemelli" className="inputBox__form--label">
              کد ملی
            </label>
          </div>
          <div className="inputBox__form">
            <input
              type="text"
              id="personelCode"
              className="inputBox__form--input"
              required
            />
            <label htmlFor="personelCode" className="inputBox__form--label">
              شماره کارمندی
            </label>
          </div>
          <div className="inputBox__form">
            <input
              type="text"
              id="staffName"
              className="inputBox__form--input"
              required
            />
            <label htmlFor="staffName" className="inputBox__form--label">
              نام
            </label>
          </div>
          <div className="inputBox__form">
            <input
              type="text"
              id="staffSurname"
              className="inputBox__form--input"
              required
            />
            <label htmlFor="staffSurname" className="inputBox__form--label">
              نام خانوادگی
            </label>
          </div>
        </form>

        <div style={{ marginRight: "auto" }} className="flex-row">
          <Button
            dir="ltr"
            endIcon={<SearchIcon />}
            variant="contained"
            color="primary"
            sx={{ fontFamily: "sahel" }}
          >
            <span>جست و جو</span>
          </Button>

          <Button
            dir="ltr"
            endIcon={<EyeIcon />}
            variant="contained"
            color="warning"
            sx={{ fontFamily: "sahel" }}
          >
            <span>مشاهده همه</span>
          </Button>
        </div>
      </section>

      <StaffGrid />
    </>
  );

  return content;
}

export default PersonnelStatementForm;
