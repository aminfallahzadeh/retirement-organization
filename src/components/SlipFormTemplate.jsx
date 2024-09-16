// REACT IMPORTS
import { useState, useEffect, useRef } from "react";

// REDUX IMPORTS
import { useGetPayQuery } from "../slices/payApiSlice";

// MUI IMPORTS
import { Box, CircularProgress, Button } from "@mui/material";
import { DownloadOutlined as DownloadIcon } from "@mui/icons-material";

// HELPERS
import { convertToPersianNumber, separateByThousands } from "../helper";

// LIBRARY IMPROTS
import generatePDF from "react-to-pdf";

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
      // Separate positive and negative amounts
      const negative = slipInfo.payItemList.filter(
        (item) => item.payItemAmount < 0
      );
      const positive = slipInfo.payItemList.filter(
        (item) => item.payItemAmount >= 0
      );

      // Calculate sum for both arrays
      const negativeSum = negative.reduce(
        (sum, item) => sum + item.payItemAmount,
        0
      );
      const positiveSum = positive.reduce(
        (sum, item) => sum + item.payItemAmount,
        0
      );

      // Update the state with the separated arrays
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem 10rem",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
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
                  <th>{`نام : ${convertToPersianNumber(
                    formData?.currentMonth
                  )}`}</th>
                  <th>نام خانوادگی :</th>
                  <th>شماره بازنشستگی :</th>
                  <th>دوره : </th>
                </tr>
                <tr>
                  <th>نوع استخدام :</th>
                  <th>بانک :</th>
                  <th>شعبه :</th>
                  <th>شماره حساب : </th>
                </tr>
              </thead>
            </table>

            <div className="slip-container__items-table-container">
              <table className="form-table">
                <thead>
                  <tr>
                    <th width="100">ردیف</th>
                    <th>حقوق مزایا</th>
                    <th>مبلغ</th>
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
                    <th>مبلغ</th>
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
                          separateByThousands(item.payItemAmount)
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
                      {convertToPersianNumber(separateByThousands(positiveSum))}
                    </th>
                    <th>جمع کسور :</th>
                    <th dir="ltr">
                      {convertToPersianNumber(separateByThousands(negativeSum))}
                    </th>
                  </tr>
                  <tr>
                    <th>مبلغ قابل پرداخت :</th>
                    <th></th>
                    <th>مبلغ قابل پرداخت به حروف :</th>
                    <th></th>
                  </tr>
                </thead>
              </table>
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
