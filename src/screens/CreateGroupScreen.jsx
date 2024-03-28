// react imports
import { useState } from "react";

// components
import ItemsCreateGroupGrid from "../grids/ItemsCreateGroupGrid";

function CreateGroupScreen() {
  const [groupName, setGroupName] = useState("");

  const content = (
    <section className="main">
      <div className="formContainer flex-row">
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
      </div>

      <div className="flex-row">
        <div className="flex-grow-1">
          <ItemsCreateGroupGrid groupName={groupName} />
        </div>
      </div>
    </section>
  );

  return content;
}

export default CreateGroupScreen;
