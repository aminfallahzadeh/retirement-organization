// react imports
import { useState } from "react";

// redux imports
import { useSelector } from "react-redux";
import { useInsertArchiveStructureMutation } from "../slices/archiveApiSlice";

// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";

function CreateArchiveStructureForm({ setShowNewArchiveModal }) {
  const [name, setName] = useState("");

  const { token } = useSelector((state) => state.auth);
  const { selectedArchiveData } = useSelector((state) => state.archiveData);

  const [insertArchiveStructure, { isLoading }] =
    useInsertArchiveStructureMutation();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleInsertArchiveStructure = async () => {
    try {
      const insertRes = await insertArchiveStructure({
        token,
        data: {
          id: "",
          insertUserID: "",
          name,
          parentID: selectedArchiveData.id,
        },
      }).unwrap();
      setShowNewArchiveModal(false);
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

  const content = (
    <section className="formContainer flex-col flex-center">
      <form method="POST" className="inputBox__form">
        <input
          type="text"
          className="inputBox__form--input inputBox__form--input-height-40"
          required
          id="archiveName"
          value={name}
          onChange={handleNameChange}
        />
        <label className="inputBox__form--label" htmlFor="archiveName">
          نام دسته
        </label>
      </form>

      <LoadingButton
        dir="ltr"
        endIcon={<SaveIcon />}
        loading={isLoading}
        onClick={handleInsertArchiveStructure}
        variant="contained"
        color="success"
        disabled={!name}
        sx={{ fontFamily: "sahel" }}
      >
        <span>ذخیره</span>
      </LoadingButton>
    </section>
  );

  return content;
}

export default CreateArchiveStructureForm;
