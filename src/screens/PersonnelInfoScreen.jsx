// rrd imports
import { useNavigate } from "react-router-dom";

// mui imports
import { Tooltip, IconButton } from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";

// compoentns
import PersonnelInfoForm from "../forms/PersonnelInfoForm";
import PersonnelGridsSection from "../sections/personnel/PersonnelGridsSection";

function PersonnelInfoScreen() {
  const navigate = useNavigate();

  const content = (
    <section className="flex-col u-margin-bottom-md">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>اطلاعات کارمند
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
      <PersonnelInfoForm />
      <PersonnelGridsSection />
    </section>
  );
  return content;
}

export default PersonnelInfoScreen;
