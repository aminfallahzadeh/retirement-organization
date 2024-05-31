// mui imports
import { Button } from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  PlayArrowOutlined as PlayIcon,
  GetAppOutlined as DownloadIcon,
} from "@mui/icons-material";
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

        <div className="condition grid grid--col-4">
          <div className="grid grid--col-2">
            <Button
              dir="ltr"
              variant="contained"
              color="info"
              sx={{ fontFamily: "sahel" }}
            >
              <span>OR</span>
            </Button>
            <Button
              dir="ltr"
              variant="contained"
              color="info"
              sx={{ fontFamily: "sahel" }}
            >
              <span>AND</span>
            </Button>
            <Button
              dir="ltr"
              variant="contained"
              color="info"
              sx={{ fontFamily: "sahel" }}
            >
              <span>(</span>
            </Button>
            <Button
              dir="ltr"
              variant="contained"
              color="info"
              sx={{ fontFamily: "sahel" }}
            >
              <span>)</span>
            </Button>
            <Button
              dir="ltr"
              variant="contained"
              color="info"
              sx={{ fontFamily: "sahel" }}
            >
              <span>Null</span>
            </Button>
            <Button
              dir="ltr"
              variant="contained"
              color="info"
              sx={{ fontFamily: "sahel" }}
            >
              <span>%</span>
            </Button>
          </div>

          <div className="condition__box col-span-3 row-span-3">
            <h4 className="condition__box--title">شروط انتخاب شده:</h4>
          </div>
        </div>

        <div className="condition__features">
          <h4 className="condition__box--title">خصوصیات جدول:</h4>

          <div className="condition__features--container grid grid--col-3">
            <div className="condition__features--box row-span-3">
              <p>شماره ملی</p>
              <p>نام</p>
              <p>نام خانوادگی</p>
              <p>جمع حقوق</p>
              <p>حقوق مبنا</p>
            </div>
            <div className="condition__features--btns row-span-3">
              <Button
                dir="ltr"
                variant="contained"
                color="info"
                sx={{ fontFamily: "sahel" }}
              >
                <span>&lsaquo;&lsaquo;</span>
              </Button>

              <Button
                dir="ltr"
                variant="contained"
                color="info"
                sx={{ fontFamily: "sahel" }}
              >
                <span>&rsaquo;&rsaquo;</span>
              </Button>
            </div>
            <div className="condition__features--box row-span-3"></div>
          </div>
        </div>

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
