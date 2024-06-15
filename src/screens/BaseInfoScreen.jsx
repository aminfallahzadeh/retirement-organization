// mui imports
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";

// components
import BaseOrganizationForm from "../forms/BaseInfoForms/BaseOrganizationForm";
import BaseFractionForm from "../forms/BaseInfoForms/BaseFractionForm";
import BaseBankBranchForm from "../forms/BaseInfoForms/BaseBankBranchForm";

function BaseInfoScreen() {
  return (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>اطلاعات پایه
        </h4>
      </div>

      <div>
        <Accordion>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            فرم اطلاعات پایه سازمان
          </AccordionSummary>
          <AccordionDetails>
            <BaseOrganizationForm />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            فرم اطلاعات پایه سازمان کسور
          </AccordionSummary>
          <AccordionDetails>
            <BaseFractionForm />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            فرم اطلاعات پایه شعبه بانک
          </AccordionSummary>
          <AccordionDetails>
            <BaseBankBranchForm />
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
}

export default BaseInfoScreen;
