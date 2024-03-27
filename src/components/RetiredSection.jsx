// component imports
import RetiredAdditionalInfo from "../forms/RetiredAdditionalInfo";
import RetiredStaffInfo from "../forms/RetiredStaffInfo";
import RetiredPersonalInfo from "../forms/RetiredPersonalInfo";

// redux imports
import { useSelector } from "react-redux";

// mui imports
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function RetiredSection() {
  const { retiredData } = useSelector((state) => state.retiredState);

  const content = (
    <section className="pensionersAffairs">
      <Accordion sx={{ backgroundColor: "#2e3456", color: "#fff" }}>
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon sx={{ color: "#fff" }} />}
        >
          اطلاعات فردی بازنشسته
        </AccordionSummary>
        <AccordionDetails>
          <RetiredPersonalInfo retiredData={retiredData} />
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor: "#2e3456", color: "#fff" }}>
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon sx={{ color: "#fff" }} />}
        >
          اطلاعات پرسنلی
        </AccordionSummary>
        <AccordionDetails>
          <RetiredStaffInfo />
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor: "#2e3456", color: "#fff" }}>
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon sx={{ color: "#fff" }} />}
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

export default RetiredSection;
