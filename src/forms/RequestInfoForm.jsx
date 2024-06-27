// react imports
import { useState, useEffect } from "react";

// redux imports
import { useGetRequestQuery } from "../slices/requestApiSlice";

// mui imports
import { Box, CircularProgress } from "@mui/material";

// library imports
import { toast } from "react-toastify";

// helpers
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
} from "../helper";

function RequestInfoForm({ setRequestCondition }) {
  const [requestData, setRequestData] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const Role = searchParams.get("Role");
  const requestID = searchParams.get("requestID");

  const {
    data: request,
    isSuccess,
    isLoading,
    isFetching,
    error,
  } = useGetRequestQuery({ Role, requestID });

  useEffect(() => {
    if (isSuccess) {
      setRequestData(request.itemList[0]);
      setRequestCondition(request.itemList[0].conditions);
    }
  }, [isSuccess, request?.itemList, setRequestCondition]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  const content = (
    <>
      {isLoading || isFetching ? (
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
        <section className="formContainer">
          <form method="POST" className="grid grid--col-5">
            <div className="inputBox__form">
              <input
                type="text"
                id="requNO"
                disabled
                value={convertToPersianNumber(requestData?.requestNO) || "-"}
                className="inputBox__form--input"
                required
              />
              <label htmlFor="reqNum" className="inputBox__form--label">
                شماره درخواست
              </label>
            </div>
            <div className="inputBox__form">
              <input
                type="text"
                id="reqDate"
                disabled
                value={convertToPersianDateFormatted(requestData?.requestDate)}
                className="inputBox__form--input"
                required
              />
              <label htmlFor="reqdate" className="inputBox__form--label">
                تاریخ
              </label>
            </div>
            <div className="inputBox__form">
              <input
                type="text"
                id="reqFirstName"
                disabled
                value={requestData?.personFirstName || "-"}
                className="inputBox__form--input"
                required
              />
              <label htmlFor="rqName" className="inputBox__form--label">
                نام
              </label>
            </div>
            <div className="inputBox__form">
              <input
                type="text"
                id="reqLastName"
                disabled
                value={requestData?.personLastName || "-"}
                className="inputBox__form--input"
                required
              />
              <label htmlFor="rqfName" className="inputBox__form--label">
                نام خانوادگی
              </label>
            </div>

            <div className="inputBox__form">
              <input
                type="text"
                id="reqType"
                value={requestData?.requestTypeNameFa || "-"}
                disabled
                className="inputBox__form--input"
                required
              />
              <label htmlFor="rqType" className="inputBox__form--label">
                نوع درخواست
              </label>
            </div>
            <div className="inputBox__form col-span-5 row-span-3">
              <textarea
                disabled
                type="text"
                id="reqText"
                value={requestData?.requestText || "-"}
                className="inputBox__form--input"
                required
              ></textarea>
              <label htmlFor="reqText" className="inputBox__form--label">
                متن درخواست
              </label>
            </div>
          </form>
        </section>
      )}
    </>
  );

  return content;
}

export default RequestInfoForm;
