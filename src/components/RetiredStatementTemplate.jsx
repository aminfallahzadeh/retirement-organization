// REACT IMPORTS
import { useState, useEffect, useRef } from "react";

// MUI IMPORTS
import { Box, CircularProgress, Button, Checkbox } from "@mui/material";
import { DownloadOutlined as DownloadIcon } from "@mui/icons-material";

// REDUX IMPORTS
import { useSelector } from "react-redux";
import { useGetRetiredQuery } from "../slices/retiredApiSlice";
import { useGetRetirementStatementQuery } from "../slices/retirementStatementApiSlice.js";

// HELPERS
import {
  convertToPersianNumber,
  separateByThousands,
  convertToPersianDateFormatted,
} from "../helper";

// LIBRARY IMPROTS
import generatePDF from "react-to-pdf";
import { toast } from "react-toastify";

// COMPONENTS
import Modal from "./Modal";

function RetiredStatementTemplate({ statementID }) {
  // DOWNLOAD REF
  const targetRef = useRef();

  // MAIN STATE
  const [retiredInfo, setRetiredInfo] = useState(null);
  const [statementInfo, setStatementInfo] = useState(null);

  // ACCESS KEY DATA
  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");
  const { personDeathDate } = useSelector((state) => state.retiredState);

  // GET DATA
  const {
    data: statement,
    isSuccess: isStatementSuccess,
    isLoading: isStatementLoading,
    isFetching: isStatementFetching,
    error: statementError,
  } = useGetRetirementStatementQuery({ RetirementStatementID: statementID });

  const {
    data: retired,
    isSuccess: isRetiredSuccess,
    isLoading: isRetiredLoading,
    isFetching: isRetiredFetching,
    error: retiredError,
  } = useGetRetiredQuery(personID);

  // FETCH DATA
  useEffect(() => {
    if (isStatementSuccess) {
      setStatementInfo(statement);
    }
  }, [isStatementSuccess, statement]);

  useEffect(() => {
    if (isRetiredSuccess) {
      setRetiredInfo(retired.itemList[0]);
    }
  }, [isRetiredSuccess, retired]);

  // HANDLE ERROR
  useEffect(() => {
    if (statementError) {
      console.log(statementError);
      toast.error(statementError?.data?.message || statementError.error, {
        autoClose: 2000,
      });
    }
  }, [statementError]);

  useEffect(() => {
    if (retiredError) {
      console.log(retiredError);
      toast.error(retiredError?.data?.message || retiredError.error, {
        autoClose: 2000,
      });
    }
  }, [retiredError]);

  const content = (
    <>
      {isStatementLoading ||
      isStatementFetching ||
      isRetiredLoading ||
      isRetiredFetching ||
      retiredInfo === null ||
      statementInfo === null ? (
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
                سریال حکم :{" "}
                <span>
                  {convertToPersianNumber(
                    statementInfo?.retirementStatementSerial
                  )}
                </span>
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
                  <th>{`کد ملی : ${
                    convertToPersianNumber(retiredInfo?.personNationalCode) ||
                    "-"
                  }`}</th>
                  <th>{`نام : ${retiredInfo?.personFirstName || "-"}`}</th>
                  <th colSpan={2}>{`نام خانوادگی : ${
                    retiredInfo?.personLastName || "-"
                  }`}</th>
                </tr>
                <tr>
                  <th>{`شماره شناسنامه : ${
                    convertToPersianNumber(retiredInfo?.personCertificateNo) ||
                    "-"
                  }`}</th>
                  <th>{`نام پدر : ${retiredInfo?.personFatherName || "-"}`}</th>
                  <th>{`تاریخ تولد : ${
                    convertToPersianDateFormatted(
                      retiredInfo?.personBirthDate
                    ) || "-"
                  }`}</th>
                  <th>{`محل تولد : ${
                    retiredInfo?.personBirthPlace || "-"
                  }`}</th>
                </tr>

                <tr>
                  <th>{`جنسیت : ${retiredInfo?.genderName || "-"}`}</th>
                  <th>{`تعداد فرزندان : ${
                    convertToPersianNumber(
                      statementInfo?.retirementStatementChildrenCount
                    ) ?? "-"
                  }`}</th>
                  <th>{`تعداد افراد تحت تکفل : ${
                    convertToPersianNumber(
                      statementInfo?.retirementStatementChildrenCount
                    ) ?? "-"
                  }`}</th>
                  <th>{`کد درمانی : ${
                    convertToPersianNumber(retiredInfo?.insuranceCode) || "-"
                  }`}</th>
                </tr>

                <tr>
                  <th>{`وضعیت تاهل : ${
                    retiredInfo?.maritalStatusName || "-"
                  }`}</th>
                  <th colSpan={3}>{`کد پستی : ${
                    convertToPersianNumber(retiredInfo?.personPostalCode) || "-"
                  }`}</th>
                </tr>

                <tr>
                  <th colSpan={4}>
                    <div className="slip-container__person-info-table--checkbox">
                      <span>وضعیت ایثارگری :</span>
                      <div>
                        <Checkbox
                          size="small"
                          color="success"
                          checked={retiredInfo?.personIsSacrificedFamily}
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
                          checked={retiredInfo?.personIsValiant}
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
                          checked={retiredInfo?.personIsCaptive}
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
                          checked={retiredInfo?.personIsWarrior}
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
                          checked={retiredInfo?.personIsSacrificed}
                          name="personIsSacrificed"
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
                          checked={retiredInfo?.personIsChildOfSacrificed}
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
                  <th>{`تاریخ بازنشستگی : ${
                    convertToPersianDateFormatted(
                      retiredInfo?.retirementDate
                    ) || "-"
                  }`}</th>
                  <th>{`آخرین پست سازمانی : ${
                    retiredInfo?.retiredLastPosition || "-"
                  }`}</th>
                  <th>{`آخرین محل خدمت : ${
                    retiredInfo?.retiredOrganizationName || "-"
                  }`}</th>
                </tr>
                <tr>
                  <th>{`سنوات خدمت واقعی : ${
                    convertToPersianNumber(retiredInfo?.retiredRealDuration) ||
                    "-"
                  }`}</th>
                  <th>{`سنوات ارفاقی : ${
                    convertToPersianNumber(retiredInfo?.retiredGrantDuration) ||
                    "-"
                  }`}</th>
                  <th>{`سنوات بازنشسنگی : ${"-"}`}</th>
                </tr>

                <tr>
                  <th>{`گروه : ${
                    convertToPersianNumber(retiredInfo?.retiredGroup) || "-"
                  }`}</th>
                  <th>{`مرتبه : ${
                    convertToPersianNumber(retiredInfo?.retiredJobDegree) || "-"
                  }`}</th>
                  <th>{`مدرک تحصیلی : ${
                    retiredInfo?.educationTypeName || "-"
                  }`}</th>
                </tr>

                <tr>
                  <th>{`نوع حکم : ${
                    statementInfo?.retirementStatementTypeName || "-"
                  }`}</th>
                  <th>{`عنوان شغل : ${"-"}`}</th>
                  <th>{`تاریخ فوت : ${
                    convertToPersianDateFormatted(
                      retiredInfo?.personDeathDate
                    ) || "-"
                  }`}</th>
                </tr>
              </thead>
            </table>

            {personDeathDate ? (
              <table className="slip-container__related-table form-table">
                <thead>
                  <tr>
                    <th colSpan={11}>مشخصات افراد تحت تکفل</th>
                  </tr>
                  <tr>
                    <th>ردیف</th>
                    <th>کد ملی</th>
                    <th>نام</th>
                    <th>نام خانوادگی</th>
                    <th>نام پدر</th>
                    <th>نسبت</th>
                    <th>تاریخ تولد</th>
                    <th>حقوق وظیفه</th>
                    <th>بازنشستگی تکمیلی</th>
                    <th>حق تاهل</th>
                    <th>حق اولاد</th>
                  </tr>
                </thead>

                <tbody>
                  {statementInfo?.retirementStatementRelatedList.map(
                    (item, index) => (
                      <tr key={item.retirementStatementRelatedID}>
                        <td>{convertToPersianNumber(index + 1)}</td>
                        <td>
                          {convertToPersianNumber(item.personNationalCode) ||
                            "-"}
                        </td>
                        <td>{item.personFirstName || "-"}</td>
                        <td>{item.personLastName || "-"}</td>
                        <td>{item.personFatherName || "-"}</td>
                        <td>{item.relationshipWithParentName || "-"}</td>
                        <td>
                          {convertToPersianDateFormatted(item.personBirthDate)}
                        </td>

                        <td>
                          {convertToPersianNumber(
                            separateByThousands(item.heirRight)
                          ) || "-"}
                        </td>
                        <td>
                          {convertToPersianNumber(
                            separateByThousands(item.supplementaryRight)
                          ) || "-"}
                        </td>
                        <td>
                          {" "}
                          {convertToPersianNumber(
                            separateByThousands(item.maritalRight)
                          ) || "-"}
                        </td>
                        <td>
                          {convertToPersianNumber(
                            separateByThousands(item.childRight)
                          ) || "-"}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            ) : (
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

                <tbody>
                  {statementInfo?.retirementStatementRelatedList.map(
                    (item, index) => (
                      <tr key={item.retirementStatementRelatedID}>
                        <td>{convertToPersianNumber(index + 1)}</td>
                        <td>
                          {convertToPersianNumber(item.personNationalCode) ||
                            "-"}
                        </td>
                        <td>{item.personFirstName || "-"}</td>
                        <td>{item.personLastName || "-"}</td>
                        <td>{item.personFatherName || "-"}</td>
                        <td>{item.relationshipWithParentName || "-"}</td>
                        <td>
                          {convertToPersianDateFormatted(item.personBirthDate)}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}

            <div className="slip-container__statement-items-table-container">
              <table className="slip-container__statement-items-desc-table form-table">
                <thead>
                  <tr>
                    <th>شرح حکم :</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "top" }}>
                      {statementInfo?.retirementStatementDesc || "-"}
                    </td>
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
                  {statementInfo?.retirementStatementAmountList.map((item) => (
                    <tr
                      key={item.retirementStatementItemID}
                      style={{ textAlign: "center" }}
                    >
                      <td>{item.retirementStatementItemName}</td>
                      <td>
                        {convertToPersianNumber(
                          separateByThousands(
                            item.retirementStatementItemAmount
                          )
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <td colSpan={2}>
                      {" "}
                      {"جمع کل به ریال : "}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {convertToPersianNumber(
                        separateByThousands(
                          statementInfo?.sumRetirementStatementAmount
                        )
                      ) ?? "-"}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <table className="slip-container__statement-footer-table form-table">
              <thead>
                <tr>
                  <th>{`ناریخ اجرا : ${
                    convertToPersianDateFormatted(
                      statementInfo?.retirementStatementRunDate
                    ) || "-"
                  }`}</th>
                  <th>{`تاریخ صدور : ${
                    convertToPersianDateFormatted(
                      statementInfo?.retirementStatementIssueDate
                    ) || "-"
                  }`}</th>
                  <th>{`شماره صدور : ${
                    convertToPersianNumber(
                      statementInfo?.retirementStatementNo
                    ) || "-"
                  }`}</th>
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
                generatePDF(targetRef, { filename: "حکم کارمندی.pdf" })
              }
              variant="contained"
              color="primary"
              sx={{ fontFamily: "IranYekan" }}
            >
              <span>دانلود حکم</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );

  return content;
}

export default RetiredStatementTemplate;
