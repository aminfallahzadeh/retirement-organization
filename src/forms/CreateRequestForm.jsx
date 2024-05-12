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
import { Save as SaveIcon } from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";

// helpers
import { convertToPersianNumber, convertToEnglishNumber } from "../helper";

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
        personID: convertToEnglishNumber(requestObject.personID),
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
            onChange={handleRequestObjectChange}
            name="requestTypeID"
            required
          >
            <option value=" ">انتخاب کنید</option>
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
          <input
            type="text"
            id="personID"
            name="personID"
            value={convertToPersianNumber(requestObject?.personID)}
            onChange={handleRequestObjectChange}
            className="inputBox__form--input"
            required
          />
          <label htmlFor="personID" className="inputBox__form--label">
            شماره کارمندی
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
            متن درخواست
          </label>
        </div>
      </form>
      <div style={{ marginRight: "auto" }} className="flex-row">
        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          variant="contained"
          onClick={handleInsertRequest}
          loading={isInserting}
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ذخیره</span>
        </LoadingButton>
      </div>
    </section>
  );
  return content;
}

export default CreateRequestForm;
