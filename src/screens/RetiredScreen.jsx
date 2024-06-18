// rrd imports
import { useNavigate } from "react-router-dom";

// mui imports
import { IconButton, Tooltip } from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";

// components
import IndividualInfoSection from "../sections/retired/IndividualInfoSection";
import RelatedInfoSection from "../sections/retired/RelatedInfoSection";

function RetiredScreen() {
  const navigate = useNavigate();

  return (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline">اطلاعات بازنشسته</span>
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

      <IndividualInfoSection />
      <RelatedInfoSection />
    </section>
  );
}

export default RetiredScreen;
