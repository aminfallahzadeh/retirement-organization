// react imports
import { useState } from "react";

// components
import ItemsCreateGroupGrid from "../grids/ItemsCreateGroupGrid";

function CreateGroupScreen() {
  const [groupObject, setGroupObject] = useState({ groupName: "" });

  const handleGroupObjectChange = (e) => {
    const { name, value } = e.target;
    setGroupObject({ ...groupObject, [name]: value });
  };

  const content = (
    <section className="main">
      <div className="formContainer flex-row">
        <form className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input inputBox__form--input-height-40"
            required
            name="groupName"
            onChange={handleGroupObjectChange}
            id="groupNameCreate"
          />
          <label className="inputBox__form--label" htmlFor="groupNameCreate">
            نام گروه
          </label>
        </form>
      </div>

      <ItemsCreateGroupGrid groupObject={groupObject} />
    </section>
  );

  return content;
}

export default CreateGroupScreen;
