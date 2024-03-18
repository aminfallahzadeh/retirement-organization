// react imports
import { useState } from "react";

// rrd imports
import { useNavigate } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// components
import ItemsGrid from "../components/ItemsGrid";
import UserButton from "../components/UserButton";

// redux imports
import { useSelector } from "react-redux";
import { useInsertGroupMutation } from "../slices/usersApiSlice";

function CreateGroupScreen() {
  const [groupName, setGroupName] = useState("");
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [insertGroup, { isLoading }] = useInsertGroupMutation();

  const insertGroupHandler = async () => {
    try {
      const res = await insertGroup({
        token,
        data: {
          "id": "",
          "groupName": groupName,
        },
      }).unwrap();
      navigate(`/retirement-organization/groups`);
      toast.success(res.message, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }
  };

  return (
    <section className="main">
      <div className="main--title">
        <h4>نام گروه را وارد کنید</h4>
        <hr />
      </div>

      <div className="formContainer flex-row flex-right">
        <form className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input inputBox__form--input-height-40"
            required
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            id="groupName"
          />
          <label className="inputBox__form--label" htmlFor="groupName">
            نام گروه
          </label>
        </form>
        <div>
          <UserButton
            variant={"outline-success"}
            isLoading={isLoading}
            onClickFn={insertGroupHandler}
            disabled={!groupName}
          >
            ذخیره
          </UserButton>
        </div>
      </div>

      <div className="main--title">
        <h4>آیتم های گروه را انتخاب کنید</h4>
        <hr />
      </div>

      <ItemsGrid />
    </section>
  );
}

export default CreateGroupScreen;
