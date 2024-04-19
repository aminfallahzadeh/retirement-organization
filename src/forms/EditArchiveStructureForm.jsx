// react imports
import { useState } from "react";

// redux imports
import { useSelector } from "react-redux";
import { useUpdateArchiveStructureMutation } from "../slices/archiveApiSlice";

// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";

function EditArchiveStructureForm({ setShowEditArchiveStructureModal }) {
  const { token } = useSelector((state) => state.auth);
  const { selectedArchiveData } = useSelector((state) => state.archiveData);

  const [updateArchiveStructure, { isLoading }] =
    useUpdateArchiveStructureMutation();

  const [name, setName] = useState(selectedArchiveData?.name || "");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUpdateArchiveStructure = async () => {
    try {
      const updateRes = await updateArchiveStructure({
        token,
        data: {
          id: selectedArchiveData?.id,
          name,
          insertUserID: "",
          parentID: "",
        },
      }).unwrap();
      setShowEditArchiveStructureModal(false);
      toast.success(updateRes.message, {
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
        <lable htmlFor="archiveName" className="inputBox__form--label">
          نام دسته
        </lable>
      </form>

      <LoadingButton
        dir="ltr"
        endIcon={<SaveIcon />}
        loading={isLoading}
        onClick={handleUpdateArchiveStructure}
        variant="contained"
        color="success"
        disabled={name === selectedArchiveData?.name || !name}
        sx={{ fontFamily: "sahel" }}
      >
        <span>ذخیره</span>
      </LoadingButton>
    </section>
  );

  return content;
}

export default EditArchiveStructureForm;
