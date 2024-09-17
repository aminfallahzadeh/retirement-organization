// REACT IMPORTS
import { useState, useEffect, useRef } from "react";

// REDUX IMPORTS
import { useGetPayQuery } from "../slices/payApiSlice";

// MUI IMPORTS
import { Box, CircularProgress, Button } from "@mui/material";
import { DownloadOutlined as DownloadIcon } from "@mui/icons-material";

// HELPERS
import {
  convertToPersianNumber,
  separateByThousands,
  convertToPersianWords,
} from "../helper";

// LIBRARY IMPROTS
import generatePDF from "react-to-pdf";

// COMPONENTS
import Modal from "./Modal";

function SlipFormTemplate({ payID }) {
  // DOWNLOAD REF
  const targetRef = useRef();

  // MAIN STATE
  const [formData, setFormData] = useState(null);
  const [negativeItems, setNegativeItems] = useState([]);
  const [positiveItems, setPositiveItems] = useState([]);
  const [negativeSum, setNegativeSum] = useState(0);
  const [positiveSum, setPositiveSum] = useState(0);

  // GET MAIN DATA
  const {
    data: slipInfo,
    isLoading,
    isFetching,
    isSuccess,
    error,
  } = useGetPayQuery({ payID });

  // FETCH MAIN DATA
  useEffect(() => {
    if (isSuccess) {
      setFormData(slipInfo);
    }

    if (slipInfo?.payItemList) {
      // SEPERATE NEGATIVE AND POSITIVE ITEMS
      const negative = slipInfo.payItemList.filter(
        (item) => item.payItemAmount < 0
      );
      const positive = slipInfo.payItemList.filter(
        (item) => item.payItemAmount >= 0
      );

      // CALCULATE SUM
      const negativeSum = negative.reduce(
        (sum, item) => sum + item.payItemAmount,
        0
      );
      const positiveSum = positive.reduce(
        (sum, item) => sum + item.payItemAmount,
        0
      );

      // UPDATE STATE
      setNegativeItems(negative);
      setPositiveItems(positive);
      setNegativeSum(negativeSum);
      setPositiveSum(positiveSum);
    }

    return () => {
      setFormData(null);
      setNegativeItems([]);
      setPositiveItems([]);
      setNegativeSum(0);
      setPositiveSum(0);
    };
  }, [isSuccess, slipInfo, payID, negativeSum, positiveSum]);

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

            <div className="slip-container__header">
              <h5>بسمه تعالی</h5>
              <h5>فیش حقوقی</h5>
            </div>

            {/* MAIN INFO TABLE */}

            <table className="slip-container__info-table form-table">
              <thead>
                <tr>
                  <th>{`نام : ${formData?.personFirstName}`}</th>
                  <th
                    colSpan={2}
                  >{`نام خانوادگی : ${formData?.personLastName}`}</th>
                  <th>{`دوره : ${convertToPersianNumber(
                    formData?.currentYear
                  )}/${convertToPersianNumber(formData?.currentMonth)}`}</th>
                </tr>
                <tr>
                  <th>{`نوع استخدام : ${formData?.personEmploymentTypeName}`}</th>
                  <th>{`بانک : ${formData?.personBankName}`}</th>
                  <th>{`شعبه : ${formData?.personBankBranchName}`}</th>
                  <th>{`شماره حساب : ${convertToPersianNumber(
                    formData?.personAccount
                  )}`}</th>
                </tr>
              </thead>
            </table>

            <div className="slip-container__items-table-container">
              <table className="form-table">
                <thead>
                  <tr>
                    <th width="100">ردیف</th>
                    <th>حقوق مزایا</th>
                    <th>مبلغ به ریال</th>
                  </tr>
                </thead>

                <tbody className="form-table__body" dir="ltr">
                  {positiveItems.map((item, index) => (
                    <tr key={index}>
                      <td>{convertToPersianNumber(index + 1)}</td>
                      <td>{item.payItemTypeName}</td>
                      <td>
                        {convertToPersianNumber(
                          separateByThousands(item.payItemAmount)
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table className="form-table">
                <thead>
                  <tr>
                    <th width="100">ردیف</th>
                    <th>کسور</th>
                    <th>مبلغ به ریال</th>
                    <th>مانده</th>
                  </tr>
                </thead>

                <tbody className="form-table__body" dir="ltr">
                  {negativeItems.map((item, index) => (
                    <tr key={index}>
                      <td>{convertToPersianNumber(index + 1)}</td>
                      <td>{item.payItemTypeName}</td>
                      <td>
                        {convertToPersianNumber(
                          separateByThousands(Math.abs(item.payItemAmount))
                        )}
                      </td>
                      <td>{convertToPersianNumber(item.payItemBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="slip-container__total-table-container">
              <table className="total-table form-table">
                <thead>
                  <tr>
                    <th>جمع حقوق و مزایا :</th>
                    <th>
                      <span dir="rtl">
                        {`${convertToPersianNumber(
                          separateByThousands(positiveSum)
                        )} ریال`}
                      </span>
                    </th>
                    <th>جمع کسور :</th>
                    <th dir="ltr">
                      <span dir="rtl">
                        {`${convertToPersianNumber(
                          separateByThousands(Math.abs(negativeSum))
                        )} ریال`}
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th colSpan={2}>مبلغ قابل پرداخت :</th>
                    <th colSpan={2}>
                      <span dir="rtl">
                        {`${convertToPersianNumber(
                          separateByThousands(formData?.payAmount)
                        )} ریال`}
                      </span>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            <div className="slip-container__footer">
              <h5>مبلغ قابل پرداخت به حروف : </h5>
              <p style={{ fontSize: "12px" }}>
                {`${convertToPersianWords(formData?.payAmount)} ریال`}
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

export default SlipFormTemplate;
