// component imports
import RetiredAdditionalInfo from "../../forms/RetiredAdditionalInfo";
import RetiredStaffInfo from "../../forms/RetiredStaffInfo";
import RetiredPersonalInfo from "../../forms/RetiredPersonalInfo";

// redux imports
import { useSelector } from "react-redux";

// mui imports
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function IndividualInfoSection() {
  const { retiredData } = useSelector((state) => state.retiredState);

  const content = (
    <section className="pensionersAffairs">
      <Accordion
        sx={{
          backgroundColor: "#d9d9d9",
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
          <RetiredPersonalInfo retiredData={retiredData} />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          backgroundColor: "#d9d9d9",
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
          <RetiredStaffInfo />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          backgroundColor: "#d9d9d9",
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
          <RetiredAdditionalInfo />
        </AccordionDetails>
      </Accordion>
    </section>
  );

  return content;
}

export default IndividualInfoSection;
