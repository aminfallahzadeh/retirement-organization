// library imports
import { toast } from "react-toastify";

// react inputs
import { useState } from "react";

// component
import UserButton from "./UserButton";

// redux imports
import { useLazyGetRetiredQuery } from "../slices/retiredApiSlice";
import { setRetiredData } from "../slices/retiredStateSlice";
import { useSelector, useDispatch } from "react-redux";

function AffairsSearchPensionerForm() {
  const [nationalCode, setNationalCode] = useState("");
  const { token } = useSelector((state) => state.auth);
  const [getRetired, { isFetching }] = useLazyGetRetiredQuery();

  const dispatch = useDispatch();

  const handleSearch = async () => {
    try {
      const res = await getRetired({ token, nationalCode }).unwrap();
      const person = res.itemList[0];
      dispatch(setRetiredData(person));
      toast.success(res.message, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }
  };

  const handleNationalCodeChange = (e) => {
    setNationalCode(e.target.value);
  };

  const content = (
    <div className="formContainer">
      <form method="POST" noValidate className="grid grid--col-4">
        <div className="inputBox__form">
          <input
            type="text"
            id="codeMeli"
            className="inputBox__form--input inputBox__form--field"
            value={nationalCode}
            onChange={handleNationalCodeChange}
            required
          />
          <label htmlFor="codeMeli" className="inputBox__form--label">
            کد ملی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="pensNum"
            className="inputBox__form--input inputBox__form--field"
            required
          />
          <label htmlFor="pensNum" className="inputBox__form--label">
            شماره بازنشسته
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="Name"
            className="inputBox__form--input inputBox__form--field"
            required
          />
          <label htmlFor="Name" className="inputBox__form--label">
            نام
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="SurName"
            className="inputBox__form--input inputBox__form--field"
            required
          />
          <label htmlFor="SurName" className="inputBox__form--label">
            نام خانوادگی
          </label>
        </div>

        <div className="col-span-4">
          <UserButton
            variant={"outline-primary"}
            icon={"search"}
            isLoading={isFetching}
            onClickFn={handleSearch}
          >
            جست و جو
          </UserButton>
        </div>
      </form>
    </div>
  );
  return content;
}

export default AffairsSearchPensionerForm;
