// redux imports
import { setSelectedRole } from "../slices/roleDataSlice";
import { useDispatch, useSelector } from "react-redux";

function RoleSelectionForm({ isLoading, roles }) {
  const dispatch = useDispatch();

  const { selectedRole } = useSelector((state) => state.roleData);

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
        value={selectedRole}
        id="role"
        onChange={handleRoleSelection}
      >
        {roles?.map((role) => (
          <option key={role.id} value={role.url}>
            {role.itemName}
          </option>
        ))}
      </select>
      <label className="inputBox__form--label" htmlFor="role">
        نقش
      </label>
    </div>
  );
}

export default RoleSelectionForm;
