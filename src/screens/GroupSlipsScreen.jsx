// rrd imports
import { useNavigate } from "react-router-dom";

// mui imports
import { IconButton, Tooltip } from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";

// components
import GroupSlipsForm from "../forms/GroupSlipsForm";
import SlipsPreviewGrid from "../grids/SlipsPreviewGrid";

function GroupSlipsScreen() {
  const navigate = useNavigate();

  const content = (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>
          فیش های حقوقی
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
      <GroupSlipsForm />
      <SlipsPreviewGrid />
    </section>
  );

  return content;
}

export default GroupSlipsScreen;
