// redux imports
import { setSelectedRole } from "../slices/requestsDataSlice";
import { useDispatch } from "react-redux";

function RoleSelectionForm({ isLoading, roles }) {
  const dispatch = useDispatch();

  const handleRoleSelection = (e) => {
    dispatch(setSelectedRole(e.target.value));
  };

  return (
    <div
      className="inputBox__form"
      style={{ width: "300px", height: "40px", margin: "10px auto" }}
    >
      <select
        disabled={isLoading}
        className="inputBox__form--input"
        id="role"
        onChange={handleRoleSelection}
      >
        {roles?.itemList?.map((role) => (
          <option key={role.itemName} value={role.url}>
            {role.itemName}
          </option>
        ))}
      </select>
      <label className="inputBox__form--label" htmlFor="role">
        انتخاب نقش
      </label>
    </div>
  );
}

export default RoleSelectionForm;
