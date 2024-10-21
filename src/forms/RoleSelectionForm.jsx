// REDUX
import { setSelectedRole } from "../slices/roleDataSlice";
import { useDispatch, useSelector } from "react-redux";

// LIBRARIES
import Select from "react-select";
import makeAnimated from "react-select/animated";

// UTILS
import { selectStyles, selectSettings } from "../utils/reactSelect";
import { optionsGenerator } from "../utils/reactSelect";

function RoleSelectionForm({ isLoading, roles }) {
  const dispatch = useDispatch();

  const animatedComponents = makeAnimated();

  const { selectedRole } = useSelector((state) => state.roleData);

  // SELECT OPTIONS
  const rolesOptions = optionsGenerator(roles, "url", "itemName");

  const handleRoleSelection = (e) => {
    dispatch(setSelectedRole(e.target.value));
  };

  return (
    <div style={{ width: "300px", height: "40px", margin: "10px auto" }}>
      <Select
        closeMenuOnSelect={true}
        components={animatedComponents}
        options={rolesOptions}
        defaultValue={selectedRole}
        isLoading={isLoading}
        onChange={handleRoleSelection}
        placeholder={<div className="react-select-placeholder">نقش</div>}
        noOptionsMessage={selectSettings.noOptionsMessage}
        loadingMessage={selectSettings.loadingMessage}
        styles={selectStyles}
      />
    </div>
  );
}

export default RoleSelectionForm;
