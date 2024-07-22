// react imports
import { useState } from "react";

// rrd imports
import { useNavigate } from "react-router-dom";

// redux imports
import { useInsertRequestMutation } from "../slices/requestApiSlice";

// mui imports
import { LoadingButton } from "@mui/lab";
import { ArrowUpwardOutlined as SendIcon } from "@mui/icons-material";

// hooks
import { useFetchRequestType } from "../hooks/useFetchLookUpData";

// library imports
import { toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// utils
import {
  selectStyles,
  selectSettings,
  optionsGenerator,
} from "../utils/reactSelect";

function CreateRequestForm() {
  const [insertRequest, { isLoading: isInserting }] =
    useInsertRequestMutation();

  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  // REQUEST OBJECT STATE
  const [requestObject, setRequestObject] = useState({});

  // TEST STATE
  const personIDList = [
    { value: "49e66fb39a124555b9329c9b7994509a", label: "-------" },
    { value: "110117846", label: "همه" },
    { value: "110117846", label: "علیرضا فلاح زاده ابرقويی" },
    { value: "810e59798cc54b94b45cd0c776fff16b", label: "علی اسدی" },
    { value: "4fba2ae8420348fc9d16b21a55fef23f", label: "امیر بابا بیک" },
    { value: "e931cee492514557a6cba93fa7f3fbd4", label: "زهرا بابا بیک" },
    { value: "110000256", label: "مهدی بشارت صنعتی" },
    { value: "7777701a948e411aa204bc350utkt5", label: "سونیا گلدوست" },
    { value: "1c81794b5d4447aba8bea1ae915ae756", label: "بهمن محمدی" },
    { value: "19d06de3cf8c44a3b832b46ed0276b90", label: "مریم مهرجو" },
    { value: "7777701a948e411aa204bc350a56f155", label: "شیما میرباقری" },
    { value: "8b2a301a948e411aa204bc350a56f155", label: "احسان میرباقری" },
  ];

  // GET LOOK UP DATA
  const { requestTypes, requestTypesIsLoading, requestTypesIsFetching } =
    useFetchRequestType();

  // SELECT OPTIONS
  const requestTypeOptions = optionsGenerator(
    requestTypes,
    "requestTypeID",
    "name"
  );

  const personsOptions = optionsGenerator(personIDList, "value", "label");

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
      const insertRes = await insertRequest({
        ...requestObject,
        requestFrom: 1,
        personID: requestObject.personID || "49e66fb39a124555b9329c9b7994509a",
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
      <form method="POST" className="grid grid--col-4 u-margin-top-md">
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

        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={personsOptions}
            onChange={handleSelectOptionChange}
            value={personsOptions.find(
              (item) => item.value === requestObject?.personID
            )}
            name="personID"
            isClearable={true}
            placeholder={
              <div className="react-select-placeholder">
                <span>*</span> شماره کارمندی
              </div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
            isLoading={requestTypesIsLoading || requestTypesIsFetching}
          />

          <label
            className={
              requestObject?.personID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
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
