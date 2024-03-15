// component imports
import AffairsBankInfoForm from "./AffairsBankInfoForm";
import AffairsStaffInfoForm from "./AffairsStaffInfoForm";
import AffairsPersonalInfoForm from "./AffairsPersonalInfoForm";

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
      <Accordion sx={{ backgroundColor: "#d6d6d6" }}>
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          اطلاعات فردی بازنشسته
        </AccordionSummary>
        <AccordionDetails>
          <AffairsPersonalInfoForm retiredData={retiredData} />
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor: "#d6d6d6" }}>
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          اطلاعات پرسنلی
        </AccordionSummary>
        <AccordionDetails>
          <AffairsStaffInfoForm />
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor: "#d6d6d6" }}>
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          اطلاعات تکمیلی
        </AccordionSummary>
        <AccordionDetails>
          <AffairsBankInfoForm />
        </AccordionDetails>
      </Accordion>
    </section>
  );

  return content;
}

export default RetiredSection;
