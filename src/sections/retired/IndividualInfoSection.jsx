// component imports
import RetiredAdditionalInfo from "../../forms/RetiredAdditionalInfo";
import RetiredPensionaryForm from "../../forms/RetiredPensionaryForm";
import RetiredPersonForm from "../../forms/RetiredPersonForm";
import ElectronicCaseSection from "./ElectronicCaseSection";

// redux imports
import { useSelector } from "react-redux";

// mui imports
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";

function IndividualInfoSection() {
  const { selectedRequestData } = useSelector((state) => state.requestsData);

  const content = (
    <section className="pensionersAffairs">
      <Accordion
        sx={{
          color: "#333533",
          backgroundColor: "#c0c0c0",
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          اطلاعات فردی بازنشسته
        </AccordionSummary>
        <AccordionDetails>
          <RetiredPersonForm />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          color: "#333533",
          backgroundColor: "#c0c0c0",
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          اطلاعات پرسنلی
        </AccordionSummary>
        <AccordionDetails>
          <RetiredPensionaryForm />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          color: "#333533",
          backgroundColor: "#c0c0c0",
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          اطلاعات تکمیلی
        </AccordionSummary>
        <AccordionDetails>
          <RetiredAdditionalInfo personID={selectedRequestData?.personId} />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          color: "#333533",
          backgroundColor: "#c0c0c0",
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          پرونده الکترونیک
        </AccordionSummary>
        <AccordionDetails>
          <ElectronicCaseSection />
        </AccordionDetails>
      </Accordion>
    </section>
  );

  return content;
}

export default IndividualInfoSection;
