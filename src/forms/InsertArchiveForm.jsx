// react imports
import { useState, useRef, useEffect } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useInsertArchiveMutation } from "../slices/archiveApiSlice";
import { useSelector } from "react-redux";

// mui imports
import { LoadingButton } from "@mui/lab";
import {
  AdfScannerOutlined as ScanIcon,
  DriveFolderUploadOutlined as UploadIcon,
} from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";

// helpers
import { convertToPersianNumber, convertToEnglishNumber } from "../helper";

function InsertArchiveForm({ setShowAddImageModal }) {
  const [documentID, setDocumentID] = useState("");
  const inputFileRef = useRef(null);
  const [image, setImage] = useState(null);

  const { selectedArchiveData } = useSelector((state) => state.archiveData);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  const [insertArchive, { isLoading: isInsertingImage }] =
    useInsertArchiveMutation();

  // HADNLERS
  const handleDocumentIDChange = (e) => {
    setDocumentID(e.target.value);
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
      handleInsertImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  // INSERT IMAGE HANDLER
  const handleInsertImage = async () => {
    try {
      const insertImageRes = await insertArchive({
        id: "",
        personID,
        insertUserID: "",
        contentType: "",
        documentID: convertToEnglishNumber(documentID),
        archiveStructureID: selectedArchiveData?.id,
        attachment: image,
      }).unwrap();
      setShowAddImageModal(false);
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

  return (
    <section className="formContainer-transparent">
      <form method="POST" className="grid grid--col-1">
        <div className="inputBox__form">
          <input
            type="text"
            id="documentID"
            className="inputBox__form--input"
            value={convertToPersianNumber(documentID)}
            onChange={handleDocumentIDChange}
            required
          />
          <label className="inputBox__form--label" htmlFor="documentID">
            شماره سند
          </label>
        </div>
      </form>

      <p className="paragraph-primary" style={{ textAlign: "center" }}>
        روش بارگزاری را انتخاب کنید
      </p>

      <div className="flex-row flex-center">
        <LoadingButton
          dir="ltr"
          endIcon={<ScanIcon />}
          loading={isInsertingImage}
          variant="contained"
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>اسکن</span>
        </LoadingButton>

        <input
          type="file"
          ref={inputFileRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        <LoadingButton
          dir="ltr"
          endIcon={<UploadIcon />}
          loading={isInsertingImage}
          aria-label="upload"
          onClick={handleUploadButtonClick}
          variant="contained"
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>کامپیوتر</span>
        </LoadingButton>
      </div>
    </section>
  );
}

export default InsertArchiveForm;
