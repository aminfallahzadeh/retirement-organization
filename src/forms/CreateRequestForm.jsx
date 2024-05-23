// react imports
import { useState, useEffect } from "react";

// rrd imports
import { useNavigate } from "react-router-dom";

// redux imports
import {
  useGetRequestTypeQuery,
  useInsertRequestMutation,
} from "../slices/requestApiSlice";

// mui imports
import { LoadingButton } from "@mui/lab";
import { ArrowUpwardOutlined as SendIcon } from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";

function CreateRequestForm() {
  const [insertRequest, { isLoading: isInserting }] =
    useInsertRequestMutation();

  const navigate = useNavigate();

  // REQUEST OBJECT STATE
  const [requestObject, setRequestObject] = useState({});

  // LOOK UP STATES
  const [requestTypeCombo, setRequestTypeCombo] = useState([]);

  // GET LOOK UP DATA
  const {
    data: requestTypesComboItems,
    isSuccess: isRequestTypesComboItemsSuccess,
  } = useGetRequestTypeQuery();

  // FETCH LOOK UP DATA
  useEffect(() => {
    if (isRequestTypesComboItemsSuccess) {
      setRequestTypeCombo(requestTypesComboItems.itemList);
    }
  }, [isRequestTypesComboItemsSuccess, requestTypesComboItems]);

  // HANDLE REQUEST OBJECT CHANGE
  const handleRequestObjectChange = (e) => {
    const { name, value } = e.target;
    setRequestObject({
      ...requestObject,
      [name]: value,
    });
  };

  const handleInsertRequest = async () => {
    try {
      const insertRes = await insertRequest({
        ...requestObject,
        requestFrom: 1,
        personID: requestObject.personID || "49e66fb39a124555b9329c9b7994509a",
      }).unwrap();
      navigate("/retirement-organization/dashboard");
      console.log(insertRes);
      toast.success(insertRes.message, {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  // DEBUGGING
  useEffect(() => {
    console.log(requestObject);
  }, [requestObject]);

  const content = (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-4 u-margin-top-md">
        <div className="inputBox__form">
          <select
            type="text"
            id="requestTypeID"
            className="inputBox__form--input"
            value={requestObject?.requestTypeID || " "}
            onChange={handleRequestObjectChange}
            name="requestTypeID"
            required
          >
            <option value=" " disabled>
              انتخاب کنید
            </option>
            {requestTypeCombo?.map((requestType) => (
              <option
                key={requestType.requestTypeID}
                value={requestType.requestTypeID}
              >
                {requestType.name}
              </option>
            ))}
          </select>
          <label htmlFor="requestTypeID" className="inputBox__form--label">
            نوع درخواست
          </label>
        </div>

        <div className="inputBox__form">
          <select
            id="personID"
            name="personID"
            value={
              requestObject?.personID || "49e66fb39a124555b9329c9b7994509a"
            }
            onChange={handleRequestObjectChange}
            className="inputBox__form--input"
            required
          >
            {/* <option value=" " disabled>
              انتخاب کنید
            </option> */}

            <option value="49e66fb39a124555b9329c9b7994509a">----</option>
            <option value="810e59798cc54b94b45cd0c776fff16b">علی اسدی</option>
            <option value="4fba2ae8420348fc9d16b21a55fef23f">
              امیر بابابیک
            </option>
            <option value="e931cee492514557a6cba93fa7f3fbd4">
              زهرا بابابیک
            </option>
            <option value="110000256">مهدی بشارت صنعتی</option>
            <option value="7777701a948e411aa204bc350utkt5">سونیا گلدوست</option>
            <option value="1c81794b5d4447aba8bea1ae915ae756">بهمن محمدی</option>
            <option value="19d06de3cf8c44a3b832b46ed0276b90">مریم مهرجو</option>
            <option value="7777701a948e411aa204bc350a56f155">
              شیما میرباقری
            </option>
            <option value="8b2a301a948e411aa204bc350a56f155">
              احسان میرباقری
            </option>
          </select>
          <label htmlFor="personID" className="inputBox__form--label">
            <span>*</span> شماره کارمندی
          </label>
        </div>

        <div className="inputBox__form col-span-4 row-span-3">
          <textarea
            type="text"
            id="requestText"
            name="requestText"
            onChange={handleRequestObjectChange}
            className="inputBox__form--input"
            required
          ></textarea>
          <label htmlFor="requestText" className="inputBox__form--label">
            <span>*</span> متن درخواست
          </label>
        </div>
      </form>
      <div style={{ marginRight: "auto" }} className="flex-row">
        <LoadingButton
          dir="ltr"
          endIcon={<SendIcon />}
          variant="contained"
          onClick={handleInsertRequest}
          loading={isInserting}
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ارسال درخواست</span>
        </LoadingButton>
      </div>
    </section>
  );
  return content;
}

export default CreateRequestForm;
