// react imports
import { useState, useEffect, useRef } from "react";

// redux imports
import { useInsertRequestAttachmentMutation } from "../slices/requestApiSlice";

// hooks
import { useFetchRequestAttachmentTypes } from "../hooks/useFetchLookUpData";

// mui imports
import { LoadingButton } from "@mui/lab";
import { DriveFolderUploadOutlined as UploadIcon } from "@mui/icons-material";

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

function RequestAttachmentForm({ setShowInsertAttachmentModal, refetch }) {
  // MAIN STATE
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const requestTypeID = searchParams.get("type");
  const requestID = searchParams.get("requestID");
  const animatedComponents = makeAnimated();

  const [insertAttachment, { isLoading: isInserting }] =
    useInsertRequestAttachmentMutation();

  const inputFileRef = useRef(null);

  // GET LOOK UP DATA
  const {
    requestAttachmentTypes,
    requestAttachmentTypesIsLoading,
    requestAttachmentTypesIsFetching,
  } = useFetchRequestAttachmentTypes(requestTypeID);

  // SELECT OPTIONS
  const attachmentTypesOptions = optionsGenerator(
    requestAttachmentTypes,
    "requestTypeAttachmentID",
    "name"
  );

  // HANDLE CHANGE
  const handleUploadButtonClick = () => {
    inputFileRef.current.click();
  };

  // handle user image selection
  // convert to base64 format
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Get the base64 string
      const base64String = reader.result;

      // Remove the prefix(data:image/png;base64)
      const base64Data = base64String.split(",")[1];

      // Set the image state to the base64 data
      setImage(base64Data);
    };
    reader.readAsDataURL(file);
  };

  // check if the image is not null then send the post request
  useEffect(() => {
    if (image !== null) {
      handleInsertAttachment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  // HANDLE SELECT OPTION CHANGE
  const handleSelectOptionChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    if (selectedOption) {
      const { value } = selectedOption;
      setData({ ...data, [name]: value || "" });
    } else {
      setData({ ...data, [name]: null });
    }
  };

  // HANDLE DATA CHANGE
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // INSERT IMAGE HANDLER
  const handleInsertAttachment = async () => {
    try {
      const insertImageRes = await insertAttachment({
        contentType: "",
        requestAttachmentID: "",
        attachementTypeID: data.attachementTypeID,
        requestID,
        attachment: image,
        attachementDesc: data.attachementDesc,
      }).unwrap();
      setShowInsertAttachmentModal(false);
      refetch();
      toast.success(insertImageRes.message, {
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
      <form method="POST" className="grid grid--col-2" noValidate>
        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={attachmentTypesOptions}
            onChange={handleSelectOptionChange}
            value={attachmentTypesOptions.find(
              (item) => item.value === data?.attachementTypeID
            )}
            name="attachementTypeID"
            isClearable={true}
            placeholder={
              <div className="react-select-placeholder">نوع پیوست</div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
            isLoading={
              requestAttachmentTypesIsLoading ||
              requestAttachmentTypesIsFetching
            }
          />

          <label
            className={
              data?.attachementTypeID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            نوع پیوست
          </label>
        </div>
        <div className="inputBox__form">
          <textarea
            className="inputBox__form--input"
            required
            name="attachementDesc"
            id="attachmentDesc"
            onChange={handleDataChange}
            value={data.attachementDesc}
          />
          <label className="inputBox__form--label" htmlFor="attachmentDesc">
            توضیحات
          </label>
        </div>
      </form>

      <input
        type="file"
        ref={inputFileRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
        accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
      />

      <LoadingButton
        dir="ltr"
        endIcon={<UploadIcon />}
        loading={isInserting}
        aria-label="upload"
        onClick={handleUploadButtonClick}
        variant="contained"
        color="primary"
        sx={{ fontFamily: "sahel" }}
      >
        <span>بارگزاری</span>
      </LoadingButton>
    </section>
  );

  return content;
}

export default RequestAttachmentForm;
