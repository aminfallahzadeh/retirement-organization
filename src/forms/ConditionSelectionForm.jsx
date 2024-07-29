// mui imports
import { Button } from "@mui/material";
import {
  PlayArrowOutlined as PlayIcon,
  GetAppOutlined as DownloadIcon,
} from "@mui/icons-material";
function ConditionSelectionForm() {
  return (
    <section className="formContainer">
      <form method="POST" className="flex-col">
        <div className="flex-col">
          <h4 className="condition__box--title">دسته بندی:</h4>

          <div className="grid grid--col-4">
            <div className="inputBox__form">
              <select
                className="inputBox__form--input"
                id="total"
                defaultValue=""
              >
                <option value="" disabled>
                  انتخاب کنید
                </option>
                <option value="1">جمع حقوق</option>
              </select>
            </div>

            <div className="inputBox__form">
              <select
                className="inputBox__form--input"
                id="order"
                defaultValue=""
              >
                <option value="" disabled>
                  انتخاب کنید
                </option>
                <option value="1">Min</option>
                <option value="2">Max</option>

                <option value="3">Avg</option>
                <option value="3">Count</option>
              </select>
            </div>

            <div className="inputBox__form">
              <select
                className="inputBox__form--input"
                id="melli"
                defaultValue=""
              >
                <option value="" disabled>
                  انتخاب کنید
                </option>
                <option value="1">کد ملی</option>
              </select>
            </div>

            <div className="inputBox__form">
              <select
                className="inputBox__form--input"
                id="order"
                defaultValue=""
              >
                <option value="" disabled>
                  انتخاب کنید
                </option>
                <option value="1">Min</option>
                <option value="2">Max</option>

                <option value="3">Avg</option>
                <option value="3">Count</option>
              </select>
            </div>

            <div className="inputBox__form">
              <select
                className="inputBox__form--input"
                id="mabna"
                defaultValue=""
              >
                <option value="" disabled>
                  انتخاب کنید
                </option>
                <option value="1">حقوق مبنا</option>
              </select>
            </div>

            <div className="inputBox__form">
              <select
                className="inputBox__form--input"
                id="order"
                defaultValue=""
              >
                <option value="" disabled>
                  انتخاب کنید
                </option>
                <option value="1">Min</option>
                <option value="2">Max</option>

                <option value="3">Avg</option>
                <option value="3">Count</option>
              </select>
            </div>

            <div className="inputBox__form">
              <select
                className="inputBox__form--input"
                id="melli"
                defaultValue=""
              >
                <option value="" disabled>
                  انتخاب کنید
                </option>
                <option value="1">کد ملی</option>
              </select>
            </div>

            <div className="inputBox__form">
              <select
                className="inputBox__form--input"
                id="order"
                defaultValue=""
              >
                <option value="" disabled>
                  انتخاب کنید
                </option>
                <option value="1">Min</option>
                <option value="2">Max</option>

                <option value="3">Avg</option>
                <option value="3">Count</option>
              </select>
            </div>
          </div>

          <div style={{ marginRight: "auto" }} className="flex-row">
            <Button
              dir="ltr"
              variant="contained"
              endIcon={<PlayIcon />}
              color="success"
              sx={{ fontFamily: "sahel" }}
            >
              <span>اجرای گزارش</span>
            </Button>

            <Button
              dir="ltr"
              endIcon={<DownloadIcon />}
              variant="contained"
              color="success"
              sx={{ fontFamily: "sahel" }}
            >
              <span>خروجی اکسل</span>
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ConditionSelectionForm;
