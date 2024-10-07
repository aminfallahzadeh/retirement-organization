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
import CompareSalaryReportForm from "../forms/CompareSalaryReportForm";
import CompareSalaryReportGrid from "../grids/CompareSalaryReportGrid";
import PersonnelStatementForm from "../forms/PersonnelStatementForm";
import PersonnelPayGrid from "../grids/PersonnelPayGrid";
import PayItemSearchGrid from "../grids/PayItemSearchGrid";

function SalaryScreen() {
  const navigate = useNavigate();

  const content = (
    <section className="flex-col u-margin-bottom-lg">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>
          حقوق و دستمزد
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

      <div>
        <Accordion>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            جست و جو
          </AccordionSummary>
          <AccordionDetails>
            <PersonnelStatementForm />

            <div className="flex-col flex-center">
              <h4 className="title-secondary">جدول افراد</h4>
            </div>

            <PersonnelPayGrid />

            <div className="flex-col flex-center u-margin-top-md">
              <h4 className="title-secondary">جدول آیتم ها</h4>
            </div>

            <PayItemSearchGrid />
          </AccordionDetails>
        </Accordion>

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

export default SalaryScreen;
