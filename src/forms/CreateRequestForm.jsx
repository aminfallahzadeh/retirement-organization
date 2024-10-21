// REACT IMPORTS
import { useState } from "react";

// RRD
import { useNavigate } from "react-router-dom";

// REDUX
import { useInsertRequestByNationalCodeMutation } from "../slices/requestApiSlice";

// MUI
import { LoadingButton } from "@mui/lab";
import { ArrowUpwardOutlined as SendIcon } from "@mui/icons-material";

// HOOKS
import { useFetchRequestType } from "../hooks/useFetchLookUpData";

// LIBRARIES
import { toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// DATA
import { noNationalCodeRequestData } from "../data/noNationalCodeRequestData.js";

// UTILS
import {
  selectStyles,
  selectSettings,
  optionsGenerator,
} from "../utils/reactSelect";

// HELPERS
import { convertToPersianNumber, convertToEnglishNumber } from "../helper.js";

function CreateRequestForm() {
  const [insertRequest, { isLoading: isInserting }] =
    useInsertRequestByNationalCodeMutation();

  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  // REQUEST OBJECT STATE
  const [requestObject, setRequestObject] = useState({});

  // GET LOOK UP DATA
  const { requestTypes, requestTypesIsLoading, requestTypesIsFetching } =
    useFetchRequestType();

  // SELECT OPTIONS
  const requestTypeOptions = optionsGenerator(
    requestTypes,
    "requestTypeID",
    "name"
  );

  // HANDLE REQUEST OBJECT CHANGE
  const handleRequestObjectChange = (e) => {
    const { name, value } = e.target;
    setRequestObject({
      ...requestObject,
      [name]: value,
    });
  };

  // HANDLE SELECT OPTION CHANGE
  const handleSelectOptionChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    if (selectedOption) {
      const { value } = selectedOption;
      setRequestObject({ ...requestObject, [name]: value || "" });
    } else {
      setRequestObject({ ...requestObject, [name]: null });
    }
  };

  const handleInsertRequest = async () => {
    try {
      const nationalCode = requestObject?.nationalCode
        ? convertToEnglishNumber(requestObject.nationalCode)
        : "-1";
      const insertRes = await insertRequest({
        ...requestObject,
        requestFrom: 1,
        nationalCode,
      }).unwrap();
      navigate("/retirement-organization/cartable");
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

  const content = (
    <section className="formContainer flex-col">
      <form
        method="POST"
        className="grid grid--col-4 u-margin-top-md"
        noValidate
      >
        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={requestTypeOptions}
            onChange={handleSelectOptionChange}
            value={requestTypeOptions.find(
              (item) => item.value === requestObject?.requestTypeID
            )}
            name="requestTypeID"
            isClearable={true}
            placeholder={
              <div className="react-select-placeholder">
                <span>*</span> نوع درخواست
              </div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
            isLoading={requestTypesIsLoading || requestTypesIsFetching}
          />

          <label
            className={
              requestObject?.requestTypeID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            <span>*</span> نوع درخواست
          </label>
        </div>

        {!noNationalCodeRequestData.includes(requestObject?.requestTypeID) && (
          <div className="inputBox__form">
            <input
              type="text"
              name="nationalCode"
              id="nationalCode"
              onChange={handleRequestObjectChange}
              className="inputBox__form--input"
              value={convertToPersianNumber(requestObject?.nationalCode) ?? ""}
              required
            />
            <label htmlFor="nationalCode" className="inputBox__form--label">
              <span>*</span> کد ملی
            </label>
          </div>
        )}

        <div className="inputBox__form col-span-4 row-span-3">
          <textarea
            type="text"
            id="requestText"
            name="requestText"
            onChange={handleRequestObjectChange}
            value={requestObject?.requestText || ""}
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
