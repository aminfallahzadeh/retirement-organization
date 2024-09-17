// REACT IMPORTS
import { useState, useEffect, useRef } from "react";

// MUI IMPORTS
import { Box, CircularProgress, Button, Checkbox } from "@mui/material";
import { DownloadOutlined as DownloadIcon } from "@mui/icons-material";

// REDUX IMPORTS
import { useGetPersonnelStatementQuery } from "../slices/personnelStatementApiSlice";

// HELPERS
import { convertToPersianNumber } from "../helper";

// LIBRARY IMPROTS
import generatePDF from "react-to-pdf";

// COMPONENTS
import Modal from "./Modal";

function PersonnelStatementTemplate({ statementID }) {
  // DOWNLOAD REF
  const targetRef = useRef();

  // MAIN STATE
  const [formData, setFormData] = useState(null);

  // GET DATA
  const {
    data: statement,
    isSuccess,
    isLoading,
    isFetching,
    error,
  } = useGetPersonnelStatementQuery({ PersonnelStatementID: statementID });

  // FETCH DATA
  useEffect(() => {
    if (isSuccess) {
      setFormData(statement.itemList[0]);
    }
  }, [isSuccess, statement]);

  // HANDLE ERROR
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const content = (
    <>
      {isLoading || isFetching || formData === null ? (
        <Modal title={"در حال بارگذاری..."}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "2rem 10rem",
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        </Modal>
      ) : (
        <div className="slip-container">
          <div className="slip-container" ref={targetRef}>
            <div className="slip-container__logo">
              <img
                src="./images/logo-slip.png"
                className="slip-container__logo--img"
              />
              <p className="slip-container__logo--sub">
                سازمان بازنشستگی شهرداری تهران
              </p>
            </div>

            <div className="slip-container__qr">
              <div className="slip-container__qr--box">QR CODE</div>

              <p className="slip-container__qr--serial">
                سریال حکم : <span>2222</span>
              </p>
            </div>

            <div className="slip-container__header">
              <h5>بسمه تعالی</h5>
              <h5>فیش حقوقی</h5>
            </div>

            {/* MAIN INFO TABLE */}

            <table className="slip-container__person-info-table form-table">
              <thead>
                <tr>
                  <th colSpan={4}>مشخصات فردی</th>
                </tr>
                <tr>
                  <th>{`کد ملی : ${convertToPersianNumber(
                    formData?.personNationalCode
                  )}`}</th>
                  <th>{`نام : ${formData?.personFirstName}`}</th>
                  <th
                    colSpan={2}
                  >{`نام خانوادگی : ${formData?.personLastName}`}</th>
                </tr>
                <tr>
                  <th>{`شماره شناسنامه : `}</th>
                  <th>{`نام پدر : `}</th>
                  <th>{`تاریخ تولد : `}</th>
                  <th>{`محل تولد :`}</th>
                </tr>

                <tr>
                  <th>{`جنسیت : `}</th>
                  <th>{`تعداد فرزندان : `}</th>
                  <th>{`تعداد افراد تحت تکفل : `}</th>
                  <th>{`کد درمانی :`}</th>
                </tr>

                <tr>
                  <th>{`وضعیت تاهل : `}</th>
                  <th colSpan={3}>{`کد پستی : `}</th>
                </tr>

                <tr>
                  <th colSpan={4}>
                    <div className="slip-container__person-info-table--checkbox">
                      <span>وضعیت ایثارگری :</span>
                      <div>
                        <Checkbox
                          size="small"
                          color="success"
                          name="personIsSacrificedFamily"
                          id="personIsSacrificedFamily"
                          sx={{
                            padding: 0.5,
                          }}
                        />
                        <label htmlFor="personIsSacrificedFamily">
                          خانواده شهید
                        </label>
                      </div>

                      <div>
                        <Checkbox
                          size="small"
                          color="success"
                          name="personIsValiant"
                          id="personIsValiant"
                          sx={{
                            padding: 0.5,
                          }}
                        />
                        <label htmlFor="personIsValiant">جانباز</label>
                      </div>

                      <div>
                        <Checkbox
                          size="small"
                          color="success"
                          name="personIsCaptive"
                          id="personIsCaptive"
                          sx={{
                            padding: 0.5,
                          }}
                        />
                        <label htmlFor="personIsCaptive">آزاده</label>
                      </div>

                      <div>
                        <Checkbox
                          size="small"
                          color="success"
                          name="personIsWarrior"
                          id="personIsWarrior"
                          sx={{
                            padding: 0.5,
                          }}
                        />
                        <label htmlFor="personIsWarrior">رزمنده</label>
                      </div>

                      <div>
                        <Checkbox
                          size="small"
                          color="success"
                          name="personIsSacrificed"
                          checked
                          id="personIsSacrificed"
                          sx={{
                            padding: 0.5,
                          }}
                        />
                        <label htmlFor="personIsSacrificed">شهید</label>
                      </div>

                      <div>
                        <Checkbox
                          size="small"
                          color="success"
                          name="personIsChildOfSacrificed"
                          id="personIsChildOfSacrificed"
                          sx={{
                            padding: 0.5,
                          }}
                        />
                        <label htmlFor="personIsChildOfSacrificed">
                          فرزند شهید
                        </label>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>

            <table className="slip-container__personnel-info-table form-table">
              <thead>
                <tr>
                  <th colSpan={3}>مشخصات پرسونلی</th>
                </tr>
                <tr>
                  <th>{`تاریخ بازنشستگی :`}</th>
                  <th>{`آخرین پست سازمانی :`}</th>
                  <th>{`آخرین محل خدمت :`}</th>
                </tr>
                <tr>
                  <th>{`سنوات خدمت واقعی :`}</th>
                  <th>{`سنوات ارفاقی : `}</th>
                  <th>{`سنوات بازنشسنگی : `}</th>
                </tr>

                <tr>
                  <th>{`گروه :`}</th>
                  <th>{`مرتبه : `}</th>
                  <th>{`مدرک تحصیلی : `}</th>
                </tr>

                <tr>
                  <th>{`نوع حکم :`}</th>
                  <th>{`عنوان شغل : `}</th>
                  <th>{`تاریخ فوت : `}</th>
                </tr>
              </thead>
            </table>

            <table className="slip-container__related-table form-table">
              <thead>
                <tr>
                  <th colSpan={7}>مشخصات افراد تحت تکفل</th>
                </tr>
                <tr>
                  <th width="100">ردیف</th>
                  <th>کد ملی</th>
                  <th>نام</th>
                  <th>نام خانوادگی</th>
                  <th>نام پدر</th>
                  <th>نسبت</th>
                  <th>تاریخ تولد</th>
                </tr>
              </thead>
            </table>

            <div className="slip-container__statement-items-table-container">
              <table className="slip-container__statement-items-desc-table form-table">
                <thead>
                  <tr>
                    <th>شرح حکم :</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "top" }}>test</td>
                  </tr>
                </tbody>
              </table>

              <table className="slip-container__statement-items-desc-table form-table">
                <thead>
                  <tr>
                    <th colSpan={2}>آیتم های حکم :</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>test</td>
                    <td>test</td>
                  </tr>
                </tbody>

                <tfoot>
                  <tr>
                    <td colSpan={2}>جمع کل :</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <table className="slip-container__statement-footer-table form-table">
              <thead>
                <tr>
                  <th>تاریخ اجرا :</th>
                  <th>تاریخ صدور :</th>
                  <th>شماره صدور :</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th
                    colSpan={3}
                    style={{ textAlign: "left", padding: "20px" }}
                  >
                    عضو هیات مدیره و مدیرعامل
                  </th>
                </tr>
              </tbody>
            </table>

            <div className="slip-container__ending">
              <span>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              </span>
              <p>
                ۱. فرزندان اناث بعد از سن ۲۰ سالگی میبایست هر سال با در دست
                داشتن اصل شناسنامه خود به اداره بازنشستگی مراجعه نمایند.
              </p>
              <p>
                ۲. فرزندان ذکور بعد از سن ۲۰ سالگی و تا پایان ۲۵ سالگی در صورت
                اشتغال به تحصیل میبایست در هر ترم گواهی دانشجویی معتبر ارائه
                نمایند.
              </p>
              <p>
                ۳. تک وظیفه بگیران لازم است هر سال یکبار با در دست داشتن اصل
                شناسنامه خود به اداره بازنشستگی مراجعه نمایند.
              </p>
            </div>
          </div>

          <div style={{ marginRight: "auto" }}>
            <Button
              dir="ltr"
              endIcon={<DownloadIcon />}
              onClick={() =>
                generatePDF(targetRef, { filename: "فیش حقوقی.pdf" })
              }
              variant="contained"
              color="primary"
              sx={{ fontFamily: "IranYekan" }}
            >
              <span>دانلود فیش</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );

  return content;
}

export default PersonnelStatementTemplate;
