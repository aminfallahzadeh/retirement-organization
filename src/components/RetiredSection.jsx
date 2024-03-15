// component imports
import AffairsBankInfoForm from "./AffairsBankInfoForm";
import AffairsStaffInfoForm from "./AffairsStaffInfoForm";
import AffairsPersonalInfoForm from "./AffairsPersonalInfoForm";

// react imports
import { useState } from "react";

// mui imports
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function RetiredSection() {
  const [showBankForm, setShowBankForm] = useState(false);
  const [showStaffForm, setShowStaffForm] = useState(false);
  const [showPersonalForm, setShowPersonalForm] = useState(false);

  const handleShowPersonalForm = () => {
    setShowPersonalForm(!showPersonalForm);
  };

  const handleShowStaffForm = () => {
    setShowStaffForm(!showStaffForm);
  };

  const handleShowBankForm = () => {
    setShowBankForm(!showBankForm);
  };

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
          <AffairsPersonalInfoForm />
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
