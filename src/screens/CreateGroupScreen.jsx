// react imports
import { useState } from "react";

// components
import ItemsCreateGroupGrid from "../grids/ItemsCreateGroupGrid";
import CreateGroupForm from "../forms/CreateGroupForm";

function CreateGroupScreen() {
  const [addedItems, setAddedItems] = useState([]);

  const content = (
    <section className="main">
      <ItemsCreateGroupGrid setAddedItems={setAddedItems} />
      <CreateGroupForm addedItems={addedItems} />
    </section>
  );

  return content;
}

export default CreateGroupScreen;
