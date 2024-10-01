// RRD
import { useNavigate } from "react-router-dom";

// MUI
import { IconButton, Tooltip } from "@mui/material";
import {
  ArrowBack as BackIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

// COMPONENTS
import GroupSlipsForm from "../forms/GroupSlipsForm";
import SlipsPreviewGrid from "../grids/SlipsPreviewGrid";
import CompareSalaryReportForm from "../forms/CompareSalaryReportForm";
import CompareSalaryReportGrid from "../grids/CompareSalaryReportGrid";

function GroupSlipsScreen() {
  const navigate = useNavigate();

  const content = (
    <section className="flex-col u-margin-bottom-lg">
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
      <div>
        <Accordion>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            گزارش مقایسه حقوق
          </AccordionSummary>
          <AccordionDetails>
            <CompareSalaryReportForm />
            <CompareSalaryReportGrid />
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );

  return content;
}

export default GroupSlipsScreen;
