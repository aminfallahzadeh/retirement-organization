// components
import DashboardForm from "../forms/DashboardForm";

// mui imports
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";

function DashboardScreen() {
  return (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>داشبورد مدیریتی
        </h4>
      </div>

      <div>
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            گزارش آماری و نموداری
          </AccordionSummary>
          <AccordionDetails>
            <DashboardForm />
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
}

export default DashboardScreen;
