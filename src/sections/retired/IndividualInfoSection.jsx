// react imports
import { useState, useEffect } from "react";

// component imports
import RetiredAccountForm from "../../forms/RetiredAccountForm";
import RetiredPensionaryForm from "../../forms/RetiredPensionaryForm";
import RetiredPersonForm from "../../forms/RetiredPersonForm";
import ElectronicCaseSection from "./ElectronicCaseSection";

// mui imports
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";

function IndividualInfoSection() {
  const [theme, setTheme] = useState("default"); // State variable to hold the theme

  useEffect(() => {
    const colorScheme = document.documentElement.getAttribute("color-scheme");
    setTheme(colorScheme);
  }, [theme]);

  const content = (
    <section>
      <Accordion>
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

      <Accordion>
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

      <Accordion>
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          اطلاعات تکمیلی
        </AccordionSummary>
        <AccordionDetails>
          <RetiredAccountForm />
        </AccordionDetails>
      </Accordion>

      <Accordion>
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
