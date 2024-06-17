// react imports
import { useState, useEffect } from "react";

// rrd imports
import { useNavigate } from "react-router-dom";

// redux imports
import {
  useGetExpertQuery,
  useSendRequestToNextStateMutation,
} from "../slices/requestApiSlice";

// mui imports
import { CircularProgress, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ArrowUpwardOutlined as SendIcon } from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";

function SendRequestForm({ setShowSendRequestModal }) {
  const [selectedExpert, setSelectedExpert] = useState(" ");
  const [expertCombo, setExpertCombo] = useState([]);

  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const RequestID = searchParams.get("requestID");
  const Role = searchParams.get("Role");
  const requestTypeID = searchParams.get("type");

  const [sendRequestToNextState, { isLoading: isSendLoading }] =
    useSendRequestToNextStateMutation();

  // HANDLE EXPERT COMBO ITEMS
  const {
    data: experts,
    isSuccess,
    isLoading,
    isFetching,
    error,
  } = useGetExpertQuery({ RequestID, conditionValue: 1, Role });

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

  // CHANGE HANDLERS
  const handleSelectedExpertChange = (e) => {
    setSelectedExpert(e.target.value);
  };

  // SEND REQUEST HANDLER
  const handleSendRequest = async () => {
    try {
      const sendRes = await sendRequestToNextState({
        requestid: RequestID,
        conditionValue: 1,
        expertUserID: selectedExpert,
        role: Role,
        requestTypeID,
      });
      setShowSendRequestModal(false);
      toast.success(sendRes.data.message, {
        autoClose: 2000,
      });
      navigate("/retirement-organization/cartable");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

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
              onChange={handleSelectedExpertChange}
              value={selectedExpert}
              disabled={isSendLoading}
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
            loading={isSendLoading}
            onClick={handleSendRequest}
            endIcon={<SendIcon />}
            variant="contained"
            disabled={selectedExpert === " " || isSendLoading}
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

export default SendRequestForm;
