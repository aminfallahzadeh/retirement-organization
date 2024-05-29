// react imports
import { useForm } from "react-hook-form";

// rrd imports
import { useNavigate } from "react-router-dom";

// redux imports
import {
  useInsertGroupMutation,
  useInsertGroupItemMutation,
} from "../slices/usersApiSlice";

// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";

function CreateGroupForm({ addedItems }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // recive api reducers
  const [insertGroup, { isLoading: isCreating }] = useInsertGroupMutation();
  const [insertGroupItem, { isLoading: isInserting }] =
    useInsertGroupItemMutation();

  // handle create group
  const onSubmit = async (data) => {
    if (addedItems.length === 0) {
      toast.warning("!هیچ دسترسی انتخاب نشده است", {
        autoClose: 2000,
      });
    } else {
      try {
        const createGroupRes = await insertGroup(data).unwrap();
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
    }
  };

  const content = (
    <section className="formContainer flex-col">
      <form
        method="POST"
        className="flex-row"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="inputBox__form">
          {errors.groupName && (
            <span className="error-form">{errors.groupName.message}</span>
          )}
          <input
            type="text"
            className="inputBox__form--input inputBox__form--input-height-40"
            required
            {...register("groupName", { required: "نام گروه را وارد کنید" })}
            id="groupNameCreate"
          />
          <label className="inputBox__form--label" htmlFor="groupNameCreate">
            <span>*</span> نام گروه
          </label>
        </div>

        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          loading={isCreating || isInserting}
          onClick={handleSubmit}
          variant="contained"
          type="submit"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ذخیره</span>
        </LoadingButton>
      </form>
    </section>
  );

  return content;
}

export default CreateGroupForm;
