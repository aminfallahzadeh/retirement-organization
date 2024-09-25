// REACT IMPORTS
import { useState, useEffect, useRef } from "react";

// MUI IMPORTS
import { Box, CircularProgress, Button, Checkbox } from "@mui/material";
import { DownloadOutlined as DownloadIcon } from "@mui/icons-material";

// REDUX IMPORTS
import { useGetPersonnelStatementDetailQuery } from "../slices/personnelStatementApiSlice";

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
  } = useGetPersonnelStatementDetailQuery({
    personnelStatementID: statementID,
  });

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
          {/* HEADER */}

          <div className="slip-container" ref={targetRef}>
            <div className="slip-container__personnel-statement-header">
              <p className="slip-container__logo--sub">شهردری تهران</p>

              <h5>حکم کارگزینی</h5>
              <p className="slip-container__qr--serial">
                شماره سریال :{" "}
                <span>
                  {convertToPersianNumber(formData?.personnelStatementSerial)}
                </span>
              </p>
            </div>

            {/* MAIN INFO TABLE */}
            <table className="slip-container__personnel-statement-table form-table">
              <thead>
                <tr>
                  <th className="no-border-left">۱- شماره مستخدم :</th>
                  <th className="no-border-right"></th>
                  <th className="no-border-left">۲- شماره ملی : </th>
                  <th className="no-border-right">
                    {convertToPersianNumber(formData?.personNationalCode)}
                  </th>
                  <th className="no-border-left">۳- کد پستی :</th>
                  <th className="no-border-right"></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="no-border-left">۴- نام :</td>
                  <td className="no-border-right">
                    {formData?.personFirstName}
                  </td>
                  <td className="no-border-left">۵- نام خانوادگی :</td>
                  <td className="no-border-right">
                    {formData?.personLastName}
                  </td>
                  <td className="no-border-left">۶- نام پدر :</td>
                  <td className="no-border-right">
                    {formData?.personFatherName}
                  </td>
                </tr>

                <tr>
                  <td className="no-border-left">۷- شماره شناسنامه :</td>
                  <td className="no-border-right"></td>
                  <td className="no-border-left">۸- محل صدور :‌</td>
                  <td className="no-border-right"></td>
                  <td className="no-border-left">۹- استان :</td>
                  <td className="no-border-right"></td>
                </tr>

                <tr>
                  <td className="no-border-left no-border-bottom" colSpan={2}>
                    ۱۰- تاریخ و محل تولد :
                  </td>
                  <td className="no-border-right no-border-bottom">
                    {formData?.personBirthPlace}
                  </td>
                  <td className="no-border-bottom" colSpan={3}>
                    ۱۱- بالاترین مدرک و رشته تحصیلی‌ :
                  </td>
                </tr>

                <tr>
                  <td className="no-border-top no-border-left">روز : </td>
                  <td className="no-border-top no-border-right no-border-left">
                    ماه :{" "}
                  </td>
                  <td className="no-border-top no-border-right">سال : </td>

                  <td className="no-border-top no-border-left">
                    مقطع تحصیلی :
                  </td>
                  <td className="no-border-top no-border-right no-border-left">
                    رشته :
                  </td>
                  <td className="no-border-top no-border-right">گرایش :</td>
                </tr>

                <tr>
                  <td colSpan={2} className="no-border-left">
                    ۱۲- عنوان پست سازمانی :
                  </td>
                  <td className="no-border-right no-border-left"></td>
                  <td className="no-border-right"></td>

                  <td className="no-border-left">شماره پست :</td>
                  <td className="no-border-right"></td>
                </tr>

                <tr>
                  <td className="no-boorder-left" colSpan={2}>
                    ۱۳- رسته :
                  </td>

                  <td className="no-border-left" colSpan={2}>
                    رشته و طبفه شغلی :
                  </td>

                  <td>کد شغل :</td>
                  <td>مرتبه :</td>
                </tr>

                <tr>
                  <td>۱۴- گروه :</td>
                  <td colSpan={3} className="no-border-left">
                    ۱۵- سنوات فابل قبول از نظر بازنشستگی :
                  </td>

                  <td colSpan={2}>صندوق بازنشستگی :</td>
                </tr>

                <tr>
                  <td colSpan={6}>
                    <div className="slip-container__person-info-table--checkbox">
                      <span>۱۶- وضعیت ایثارگری :</span>
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
                  </td>
                </tr>

                <tr>
                  <td colSpan={3}>۱۷- واحد سازمانی :</td>
                  <td colSpan={3}>۱۸- محل خدمت</td>
                </tr>

                <tr>
                  <td className="no-border-left">۱۹- وضعیت تاهل :</td>
                  <td className="no-border-right">
                    {formData?.maritalStatusIDName}
                  </td>
                  <td>تعداد فرزندان :</td>

                  <td colSpan={3}>۲۰- ضریب افزایش سنواتی :</td>
                </tr>

                <tr>
                  <th colSpan={3}>۲۱- نوع حکم :</th>
                  <th colSpan={3}>حقوق و فوق العاده ها به ریال :</th>
                </tr>

                <tr>
                  <td colSpan={3} rowSpan={22} style={{ verticalAlign: "top" }}>
                    ۲۲- شرح حکم :
                  </td>
                  <td colSpan={2}>حقوق مبنا :</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>افزایش سنواتی :</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>فوق العاده شغل :</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>ﻓﻮﻕ‌ﺍﻟﻌﺎﺩﻩ ﺍﺭﺯﺷﯿﺎﺑﯽ ﺳﺎﻟﯿﺎﻧﻪ :</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>ﺗﻔﺎﻭﺕ ﺣﺪﺍﻗﻞ ﺣﻘﻮﻕ :</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>ﺗﻔﺎﻭﺕ ﺣﺪﺍﻗﻞ ﺣﻘﻮﻕ ﻣﺎﺩﻩ (۶) :</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2} style={{ fontSize: "12px" }}>
                    ﺗﻔﺎﻭﺕ ﺑﻨﺪ ﯼ ﻭ ﺗﻔﺎﻭﺕ ﺟﺰ ﯾﮏ ﺑﻨﺪ ﺍﻟﻒ ﺗﺒﺼﺮﻩ ۱۲ :
                  </td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>ﺣﻖ ﺟﺬﺏ :</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>ﺷﺮﺍﯾﻂ ﻣﺤﯿﻂ ﮐﺎﺭ :</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>ﻓﻮﻕ‌ﺍﻟﻌﺎﺩﻩ ﻭﯾﮋﻩ ﮐﺎﺭﺷﻨﺎﺳﯽ :</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>ﺍﻟﻒ- ﻓﻮﻕ‌ﺍﻟﻌﺎﺩﻩ ﺣﺮﺍﺳﺖ :</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>ﺏ- ﻓﻮﻕ‌ﺍﻟﻌﺎﺩﻩ ﮔﺰﯾﻨﺶ :</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>ﺝ- ﻓﻮﻕ‌ﺍﻟﻌﺎﺩﻩ ﺗﺨﻠﻔﺎﺕ ﺍﺩﺍﺭﯼ :</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>د- فوق العاده صعوبت شغل :</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>ﻓﻮﻕ‌ﺍﻟﻌﺎﺩﻩ ﺍﯾﺜﺎﺭﮔﺮﯼ</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>ﺣﻖ ﺟﺬﺏ ﻏﯿﺮﻣﺴﺘﻤﺮ</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>ﺗﻔﺎﻭﺕ ﺗﻄﺒﯿﻖ</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>ﮐﻤﮏ ﻫﺰﯾﻨﻪ ﻋﺎﺋﻠﻪ‌ﻣﻨﺪﯼ</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>ﮐﻤﮏ ﻫﺰﯾﻨﻪ ﺍﻭﻻﺩ</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>ﻣﺎﺑﻪ‌ﺍﻟﺘﻔﺎﻭﺕ ﻫﻤﺘﺮﺍﺯﯼ</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2} style={{ fontSize: "10px" }}>
                    ﺗﻔﺎﻭﺕ ﺗﻄﺒﯿﻖ ﺟﺰ(۱) ﺑﻨﺪ ﺍﻟﻒ ﺗﺒﺼﺮﻩ(۱۲) ﻗﺎﻧﻮﻥ ﺑﻮﺩﺟﻪ ﺳﺎﻝ
                  </td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2}>ﺗﺮﻣﯿﻢ ﺣﻘﻮﻕ</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2} className="no-border-left">
                    ۲۳- ﺗﺎﺭﯾﺦ ﺍﺟﺮﺍﯼ ﺣﮑﻢ :
                  </td>
                  <td className="no-border-right"></td>
                  <td colSpan={2}>ﻓﻮﻕ‌ﺍﻟﻌﺎﺩﻩ ﺟﺬﺏ ﻭﯾﮋﻩ</td>
                  <td></td>
                </tr>

                <tr>
                  <td colSpan={2} className="no-border-left">
                    ﺷﻤﺎﺭﻩ ﺣﮑﻢ :
                  </td>
                  <td className="no-border-right"></td>

                  <td colSpan={3} rowSpan={2} style={{ verticalAlign: "top" }}>
                    ﺟﻤﻊ :
                  </td>
                </tr>

                <tr>
                  <td colSpan={2} className="no-border-left">
                    ۲۴- ﺗﺎﺭﯾﺦ ﺻﺪﻭﺭ ﺣﮑﻢ :
                  </td>
                  <td className="no-border-right"></td>
                </tr>

                <tr>
                  <th colSpan={6}>۲۵- ﺟﻤﻊ ﺣﻘﻮﻕ ﻭ ﻣﺰﺍﯾﺎ ﺑﻪ ﺣﺮﻭﻑ :</th>
                </tr>

                <tr>
                  <td colSpan={3} className="no-border-bottom">
                    ۲۶- ﻧﺎﻡ ﻭ ﻧﺎﻡ ﺧﺎﻧﻮﺍﺩﮔﯽ ﻣﻘﺎﻡ ﻣﺴﺌﻮﻝ :
                  </td>
                  <td colSpan={3} className="no-border-bottom">
                    ﻧﺴﺨﻪ ﻣﺮﺑﻮﻁ ﺑﻪ :
                  </td>
                </tr>

                <tr>
                  <td colSpan={3} className="no-border-top">
                    ﻋﻨﻮﺍﻥ ﭘﺴﺖ ﺛﺎﺑﺖ ﺳﺎﺯﻣﺎﻧﯽ :
                  </td>
                  <td
                    colSpan={3}
                    style={{ justifyContent: "center", textAlign: "center" }}
                    className="no-border-top"
                  >
                    ﺍﺩﺍﺭﻩ ﮐﻞ ﺍﻣﻮﺭ ﺍﺟﺮﺍﺋﯽ ﺷﻮﺭﺍﯼ ﺍﺳﻼﻣﯽ ﺷﻬﺮ ﺗﻬﺮﺍﻥ, ﺍﺩﺍﺭﻩ ﮐﻞ ﺍﻣﻮﺭ
                    ﻣﺎﻟﯽ ﻭ ﺍﻣﻮﺍﻝ, ﺳﺎﺯﻣﺎﻥ ﺑﺎﺯﻧﺸﺴﺘﮕﯽ, ﺳﺎﺯﻣﺎﻥ ﺑﺴﯿﺞ ﺷﻬﺮﺩﺍﺭﯼ ﺗﻬﺮﺍﻥ,
                    ﺍﺩﺍﺭﻩ ﮐﻞ ﻣﻨﺎﺑﻊ ﺍﻧﺴﺎﻧﯽ, ﺣﺮﺍﺳﺖ ﮐﻞ, ﺣﻮﺯﻩ ﻣﻌﺎﻭﻧﺖ ﺗﻮﺳﻌﻪ ﻣﻨﺎﺑﻊ
                    ﺍﻧﺴﺎﻧﯽ - ﺷﺮﮐﺖ ﺷﻬﺮ ﺳﺎﻟﻢ, ﺩﻓﺘﺮ ﻫﻤﺎﻫﻨﮕﯽ ﻫﯿﺌﺖ ﻫﺎﯼ ﺭﺳﯿﺪﮔﯽ ﺑﻪ
                    ﺗﺨﻠﻔﺎﺕ ﺍﺩﺍﺭﯼ, ﺳﺎﺯﻣﺎﻥ ﺑﺎﺯﺭﺳﯽ, ﺍﺩﺍﺭﻩ ﮐﻞ ﺭﻓﺎﻩ ﺗﻌﺎﻭﻥ ﻭ ﺧﺪﻣﺎﺕ
                    ﺍﺟﺘﻤﺎﻋﯽ
                  </td>
                </tr>
              </tbody>
            </table>

            <p
              style={{
                textAlign: "right",
                fontSize: "12px",
                justifyContent: "right",
                width: "100%",
              }}
            >
              ﮐﺎﺭﺑﺮ : ﺭﺣﻤﺎﻧﻲ ﻫﻨﺰﮐﻲ - ۰۸:۳۴:۵۶-۱۴۰۳/۰۶/۱
            </p>
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

export default PersonnelStatementTemplate;
