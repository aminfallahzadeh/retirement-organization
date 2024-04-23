// react imports
import { useState } from "react";

// rrd imports
import { useNavigate } from "react-router-dom";

// redux imports
import {
  useInsertGroupMutation,
  useInsertGroupItemMutation,
} from "../slices/usersApiSlice";

// mui imports
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon, ArrowBack as BackIcon } from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";

function CreateGroupForm({ addedItems }) {
  const [inputGroupName, setInputGroupName] = useState("");

  const navigate = useNavigate();

  // recive api reducers
  const [insertGroup, { isLoading: isCreating }] = useInsertGroupMutation();
  const [insertGroupItem, { isLoading: isInserting }] =
    useInsertGroupItemMutation();

  const handleInputGroupNameChange = (e) => {
    setInputGroupName(e.target.value);
  };

  // handle create group
  const handleCreateGroup = async () => {
    try {
      const createGroupRes = await insertGroup({
        "id": "",
        "groupName": inputGroupName,
        "isdeleted": false,
      }).unwrap();
      try {
        const groupID = createGroupRes.itemList[0].id;
        const data = addedItems.map((item) => ({
          "id": "",
          "itemID": item.id,
          "itemName": "",
          groupID,
        }));
        const insertRes = await insertGroupItem(data).unwrap();
        console.log(insertRes);
        toast.success(insertRes.message, {
          autoClose: 2000,
        });
        navigate("/retirement-organization/groups");
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error, {
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  const content = (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input inputBox__form--input-height-40"
            required
            name="groupName"
            onChange={handleInputGroupNameChange}
            id="groupNameCreate"
          />
          <label className="inputBox__form--label" htmlFor="groupNameCreate">
            نام گروه
          </label>
        </div>

        <div className="flex-row">
          <LoadingButton
            dir="ltr"
            endIcon={<SaveIcon />}
            loading={isCreating || isInserting}
            onClick={handleCreateGroup}
            variant="contained"
            color="success"
            sx={{ fontFamily: "sahel" }}
          >
            <span>ذخیره</span>
          </LoadingButton>

          <Button
            dir="ltr"
            endIcon={<BackIcon />}
            onClick={() => navigate("/retirement-organization/groups")}
            variant="contained"
            color="primary"
            sx={{ fontFamily: "sahel" }}
          >
            <span>بازگشت</span>
          </Button>
        </div>
      </form>
    </section>
  );

  return content;
}

export default CreateGroupForm;
