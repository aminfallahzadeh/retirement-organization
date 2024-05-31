// react imports
import { useState, useEffect } from "react";

// library imports
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";

// mui imports
import {
  CalendarTodayOutlined as CalenderIcon,
  CalculateOutlined as CalculateIcon,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  UploadOutlined as UploadIcon,
  ArchiveOutlined as ArchiveIcon,
} from "@mui/icons-material";

function FractionForm() {
  // EXPERIMENTAL
  const [frType, setFrType] = useState(null);

  const handleFrTypeChange = (e) => {
    setFrType(e.target.value);
  };

  useEffect(() => {
    console.log(frType);
  }, [frType]);

  return (
    <section className="formContainer">
      <form method="POST" className="flex-col">
        <div className="grid grid--col-4">
          <div className="inputBox__form">
            <input
              type="text"
              className="inputBox__form--input"
              required
              id="letterNum"
            />
            <label className="inputBox__form--label" htmlFor="letterNum">
              شماره نامه
            </label>
          </div>

          <div className="inputBox__form">
            <input
              type="text"
              className="inputBox__form--input"
              required
              id="expType"
            />
            <label className="inputBox__form--label" htmlFor="expType">
              نوع سابقه
            </label>
          </div>

          <div className="inputBox__form">
            <input
              type="text"
              className="inputBox__form--input"
              required
              id="orgType"
            />
            <label className="inputBox__form--label" htmlFor="orgType">
              نوع سازمان
            </label>
          </div>

          <div className="inputBox__form">
            <InputDatePicker
              // value={selectedMritialDate}
              // onChange={handleMaritialDateChange}
              format={"jYYYY/jMM/jDD"}
              // onOpenChange={handleMaritialOpenChange}
              suffixIcon={<CalenderIcon color="action" />}
              // open={isMritialCalenderOpen}
              style={{
                border: "2px solid #cfcfcf",
                borderRadius: "6px",
                marginLeft: "0.5rem",
              }}
              wrapperStyle={{
                border: "none",
                cursor: "pointer",
                height: "100%",
              }}
            />
            <div className="inputBox__form--readOnly-label">تاریخ نامه</div>
          </div>

          <div className="inputBox__form">
            <InputDatePicker
              // value={selectedMritialDate}
              // onChange={handleMaritialDateChange}
              format={"jYYYY/jMM/jDD"}
              // onOpenChange={handleMaritialOpenChange}
              suffixIcon={<CalenderIcon color="action" />}
              // open={isMritialCalenderOpen}
              style={{
                border: "2px solid #cfcfcf",
                borderRadius: "6px",
                marginLeft: "0.5rem",
              }}
              wrapperStyle={{
                border: "none",
                cursor: "pointer",
                height: "100%",
              }}
            />
            <div className="inputBox__form--readOnly-label">تاریخ ثبت</div>
          </div>

          <div className="inputBox__form">
            <input
              type="text"
              className="inputBox__form--input"
              required
              id="payType"
            />
            <label className="inputBox__form--label" htmlFor="payType">
              نوع پرداخت
            </label>
          </div>

          <div className="inputBox__form">
            <input
              type="text"
              className="inputBox__form--input"
              required
              id="payNum"
            />
            <label className="inputBox__form--label" htmlFor="payNum">
              شماره پرداخت
            </label>
          </div>

          <div className="inputBox__form">
            <InputDatePicker
              // value={selectedMritialDate}
              // onChange={handleMaritialDateChange}
              format={"jYYYY/jMM/jDD"}
              // onOpenChange={handleMaritialOpenChange}
              suffixIcon={<CalenderIcon color="action" />}
              // open={isMritialCalenderOpen}
              style={{
                border: "2px solid #cfcfcf",
                borderRadius: "6px",
                marginLeft: "0.5rem",
              }}
              wrapperStyle={{
                border: "none",
                cursor: "pointer",
                height: "100%",
              }}
            />
            <div className="inputBox__form--readOnly-label">تاریخ پرداخت</div>
          </div>

          <div className="checkboxContainer">
            <p className="checkboxContainer__title">نوع کسور:</p>

            <div className="checkboxContainer__item">
              <input
                type="radio"
                id="soloTyped"
                name="frType"
                value="solo"
                onChange={handleFrTypeChange}
              />
              <label htmlFor="soloTyped" className="checkboxContainer__label">
                انفرادی
              </label>
            </div>

            <div className="checkboxContainer__item">
              <input
                type="radio"
                id="groupTyped"
                name="frType"
                value="group"
                onChange={handleFrTypeChange}
              />
              <label htmlFor="groupTyped" className="checkboxContainer__label">
                گروهی
              </label>
            </div>
          </div>

          {frType === "solo" && (
            <>
              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  required
                  id="nationalCode"
                />
                <label className="inputBox__form--label" htmlFor="nationalCode">
                  شماره ملی
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  required
                  id="personName"
                />
                <label className="inputBox__form--label" htmlFor="personName">
                  نام
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  required
                  id="personLastName"
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="personLastName"
                >
                  نام خانوادگی
                </label>
              </div>

              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  required
                  id="personID"
                />
                <label className="inputBox__form--label" htmlFor="personID">
                  شماره کارمندی
                </label>
              </div>

              <div></div>
              <div></div>
              <div></div>

              <div className="fraction--total col-span-4 row-span-2">
                <div className="fraction--total__items">
                  <p>
                    جمع مشمول کسور : <span>۱۰۰۰۰۰</span>
                  </p>
                  <p>
                    سهم کارفرما : <span>۱۰۰۰۰۰</span>
                  </p>
                  <p>
                    سهم کارمند : <span>۱۰۰۰۰۰</span>
                  </p>
                  <p>
                    مانده بدهی : <span>۱۰۰۰۰۰</span>
                  </p>
                </div>

                <div className="fraction--total__btn">
                  <Button
                    dir="ltr"
                    endIcon={<CalculateIcon />}
                    variant="contained"
                    type="submit"
                    color="warning"
                    sx={{ fontFamily: "sahel" }}
                  >
                    <span>محاسبه</span>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        <div style={{ marginRight: "auto" }} className="flex-row">
          <Button
            dir="ltr"
            endIcon={<UploadIcon />}
            disabled={frType === "solo" ? false : true}
            variant="contained"
            type="submit"
            color="primary"
            sx={{ fontFamily: "sahel" }}
          >
            <span>بارگزاری اکسل</span>
          </Button>

          <Button
            dir="ltr"
            endIcon={<ArchiveIcon />}
            disabled={frType === "group" ? false : true}
            variant="contained"
            type="submit"
            color="primary"
            sx={{ fontFamily: "sahel" }}
          >
            <span>آرشیو مستندات</span>
          </Button>
        </div>
      </form>
    </section>
  );
}

export default FractionForm;
