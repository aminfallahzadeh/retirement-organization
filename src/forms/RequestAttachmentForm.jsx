// react imports
import { useState, useEffect, useRef } from "react";

// redux imports
import {
  useGetRequestTypeAttachmentQuery,
  useInsertRequestAttachmentMutation,
} from "../slices/requestApiSlice";

// mui imports
import { CircularProgress, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DriveFolderUploadOutlined as UploadIcon } from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";

function RequestAttachmentForm({ setShowInsertAttachmentModal }) {
  const [attachmentTypesCombo, setAttachmentTypesCombo] = useState([]);
  const [selectedAttachmentID, setSelectedAttachmentID] = useState(" ");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const requestTypeID = searchParams.get("type");
  const requestID = searchParams.get("requestID");

  const [insertAttachment, { isLoading: isInserting }] =
    useInsertRequestAttachmentMutation();

  const inputFileRef = useRef(null);

  // FETCH COMBO DATA
  const {
    data: attachmentTypes,
    isLoading: isTypeLoading,
    isSuccess: isTypeSuccess,
    isFetching: isTypeFetching,
    error: isTypeError,
  } = useGetRequestTypeAttachmentQuery(requestTypeID);

  useEffect(() => {
    if (isTypeSuccess) {
      setAttachmentTypesCombo(attachmentTypes.itemList);
    }
  }, [isTypeSuccess, attachmentTypes]);

  // HADNLE ERROR
  useEffect(() => {
    if (isTypeError) {
      console.log(isTypeError);
      toast.error(isTypeError?.data?.message || isTypeError.error, {
        autoClose: 2000,
      });
    }
  }, [isTypeError]);

  // HANDLE CHANGE
  const handleSelectedAttachmentIDChange = (e) => {
    setSelectedAttachmentID(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

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

  // INSERT IMAGE HANDLER
  const handleInsertAttachment = async () => {
    try {
      const insertImageRes = await insertAttachment({
        contentType: "",
        requestAttachmentID: "",
        attachementTypeID: selectedAttachmentID,
        requestID,
        attachment: image,
        attachementDesc: description,
      }).unwrap();
      setShowInsertAttachmentModal(false);
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
    <>
      {isTypeLoading || isTypeFetching ? (
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
        <section className="formContainer flex-col">
          <form method="POST" className="grid grid--col-2" noValidate>
            <div className="inputBox__form">
              <select
                className="inputBox__form--input"
                required
                id="attachmentTypeList"
                onChange={handleSelectedAttachmentIDChange}
                value={selectedAttachmentID}
              >
                <option value=" " disabled>
                  انتخاب کنید
                </option>
                {attachmentTypesCombo?.map((attachmentType) => (
                  <option
                    key={attachmentType.requestTypeAttachmentID}
                    value={attachmentType.requestTypeAttachmentID}
                  >
                    {attachmentType.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="inputBox__form">
              <textarea
                className="inputBox__form--input"
                required
                id="attachmentDesc"
                onChange={handleDescriptionChange}
                value={description}
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
      )}
    </>
  );

  return content;
}

export default RequestAttachmentForm;
