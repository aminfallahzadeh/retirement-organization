function RoleSelectionForm({ setSelectedRole, isLoading, roles }) {
  const handleRoleSelection = (e) => {
    setSelectedRole(e.target.value);
  };
  return (
    <div className="formCOntainer">
      <form className="grid grid--col-4">
        <div className="inputBox__form">
          <select
            disabled={isLoading}
            className="inputBox__form--input"
            id="role"
            style={{ cursor: "pointer" }}
            onChange={handleRoleSelection}
          >
            {roles?.itemList?.map((role) => (
              <option key={role.itemName} value={role.itemName}>
                {role.itemName}
              </option>
            ))}
          </select>
          <label className="inputBox__form--label" htmlFor="role">
            انتخاب نقش
          </label>
        </div>
      </form>
    </div>
  );
}

export default RoleSelectionForm;
