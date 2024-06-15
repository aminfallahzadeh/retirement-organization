// react imports
import { useState } from "react";

// rrd imports
import { useNavigate } from "react-router-dom";

// mui imports
import { IconButton, Tooltip } from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";

// components
import ItemsCreateGroupGrid from "../grids/ItemsCreateGroupGrid";
import CreateGroupForm from "../forms/CreateGroupForm";

function CreateGroupScreen() {
  const [addedItems, setAddedItems] = useState([]);

  const navigate = useNavigate();

  const content = (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          ایجاد گروه جدید<span className="title-primary--underline"></span>
        </h4>
        <div style={{ marginRight: "auto" }} className="back-button">
          <Tooltip title="بازگشت">
            <span>
              <IconButton color="primary" onClick={() => navigate(-1)}>
                <BackIcon />
              </IconButton>
            </span>
          </Tooltip>
        </div>
      </div>

      <div className="flex-col flex-center">
        <div>
          <CreateGroupForm addedItems={addedItems} />
        </div>
        <div style={{ width: "500px" }}>
          <ItemsCreateGroupGrid setAddedItems={setAddedItems} />
        </div>
      </div>
    </section>
  );

  return content;
}

export default CreateGroupScreen;
