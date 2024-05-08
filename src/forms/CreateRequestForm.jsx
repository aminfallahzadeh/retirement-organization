// react imports
import { useState, useEffect } from "react";

// redux imports
import { useGetRequestTypeQuery } from "../slices/requestApiSlice";

function CreateRequestForm() {
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

  useEffect(() => {
    console.log(requestTypeCombo);
  }, [requestTypeCombo]);

  // HANDLE REQUEST OBJECT CHANGE
  const handleRequestObjectChange = (e) => {
    const { name, value } = e.target;
    setRequestObject({
      ...requestObject,
      [name]: value,
    });
  };

  const content = (
    <section className="formContainer">
      <form method="POST" className="grid grid--col-4 u-margin-top-md">
        <div className="inputBox__form">
          <select
            type="text"
            id="rqType"
            className="inputBox__form--input"
            required
          >
            <option value=" ">انتخاب کنید</option>
            {requestTypeCombo?.map((requestType) => (
              <option key={requestType.name} value={requestType.name}>
                {requestType.name}
              </option>
            ))}
          </select>
          <label htmlFor="rqType" className="inputBox__form--label">
            نوع درخواست
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="rqType"
            className="inputBox__form--input"
            required
          />
          <label htmlFor="rqType" className="inputBox__form--label">
            شماره کارمندی
          </label>
        </div>

        <div className="inputBox__form col-span-4 row-span-3">
          <textarea
            type="text"
            id="reqBody"
            className="inputBox__form--input"
            required
          ></textarea>
          <label htmlFor="reqBody" className="inputBox__form--label">
            متن درخواست
          </label>
        </div>
      </form>
    </section>
  );
  return content;
}

export default CreateRequestForm;
