// react imports
import { useState } from "react";

// rrd imports
import { useNavigate } from "react-router-dom";

// mui imports
import { IconButton } from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";

// components
import GroupsCreateUserGrid from "../grids/GroupsCreateUserGrid";
import CreateUserForm from "../forms/CreateUserForm";

function CreateUserScreen() {
  const [addedGroups, setAddedGroups] = useState([]);

  const navigate = useNavigate();

  const content = (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span> ایجاد کاربر جدید
        </h4>

        <div style={{ marginRight: "auto" }} className="back-button">
          <IconButton color="primary" onClick={() => navigate(-1)}>
            <BackIcon />
          </IconButton>
        </div>
      </div>

      <CreateUserForm addedGroups={addedGroups} />

      <GroupsCreateUserGrid setAddedGroups={setAddedGroups} />
    </section>
  );

  return content;
}

export default CreateUserScreen;
