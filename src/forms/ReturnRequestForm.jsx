// react imports
import { useState, useEffect } from "react";

// redux imports
import { useGetExpertQuery } from "../slices/requestApiSlice";

// mui imports
import { CircularProgress, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ArrowUpwardOutlined as SendIcon } from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";

function ReturnRequestForm() {
  const [expertCombo, setExpertCombo] = useState([]);

  const searchParams = new URLSearchParams(location.search);
  const RequestID = searchParams.get("requestID");
  const Role = searchParams.get("Role");

  const {
    data: experts,
    isSuccess,
    isLoading,
    isFetching,
    error,
  } = useGetExpertQuery({ RequestID, conditionValue: 0, Role });

  useEffect(() => {
    if (isSuccess) {
      setExpertCombo(experts.itemList);
    }
  }, [isSuccess, experts]);

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
        <section className="formContainer flex-row flex-center">
          <form method="POST" className="inputBox__form">
            <select
              className="inputBox__form--input inputBox__form--input-height-40 inputBox__form--input-width-200"
              required
              id="expertList"
            >
              <option value=" " disabled>
                انتخاب کنید
              </option>

              {expertCombo?.map((expert) => (
                <option key={expert.userID} value={expert.userID}>
                  {expert.firstName} {expert.lastName}
                </option>
              ))}
            </select>

            <label className="inputBox__form--label" htmlFor="expertList">
              لیست کارشناسان
            </label>
          </form>

          <LoadingButton
            dir="ltr"
            loading={isLoading}
            endIcon={<SendIcon />}
            variant="contained"
            color="success"
            sx={{ fontFamily: "sahel" }}
          >
            <span>ارسال</span>
          </LoadingButton>
        </section>
      )}
    </>
  );

  return content;
}

export default ReturnRequestForm;
