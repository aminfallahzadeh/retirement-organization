// mui imports
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";

// components
import BaseOrganizationForm from "../forms/BaseInfoForms/BaseOrganizationForm";
import BaseFractionForm from "../forms/BaseInfoForms/BaseFractionForm";
import BaseBankBranchForm from "../forms/BaseInfoForms/BaseBankBranchForm";
import BaseJobForm from "../forms/BaseInfoForms/BaseJobForm";
import BaseYearsCoefForm from "../forms/BaseInfoForms/BaseYearsCoefForm";
import BaseJobOrderForm from "../forms/BaseInfoForms/BaseJobOrderForm";
import BaseRetirementBenefitsForm from "../forms/BaseInfoForms/BaseRetirementBenefitsForm";
import BaseLegalDocumentForm from "../forms/BaseInfoForms/BaseLegalDocumentForm";
import BaseFractionMoveTypeForm from "../forms/BaseInfoForms/BaseFractionMoveTypeForm";
import BaseFractionCheckoutTypeFrom from "../forms/BaseInfoForms/BaseFractionCheckoutTypeForm";
import BaseFamilyRelationForm from "../forms/BaseInfoForms/BaseFamilyRelationForm";
import BaseRetiredConditionForm from "../forms/BaseInfoForms/BaseRetiredConditionForm";
import BaseRelatedConditionForm from "../forms/BaseInfoForms/BaseRelatedConditionForm";
import BaseHeirConditionForm from "../forms/BaseInfoForms/BaseHeirConditionForm";
import BaseFixedAmountForm from "../forms/BaseInfoForms/BaseFixedAmountForm";

function BaseInfoScreen() {
  return (
    <section className="flex-col u-margin-bottom-xl">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>اطلاعات پایه
        </h4>
      </div>

      <div>
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
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

        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
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

        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            فرم اطلاعات پایه شعب بانک
          </AccordionSummary>
          <AccordionDetails>
            <BaseBankBranchForm />
          </AccordionDetails>
        </Accordion>

        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            فرم اطلاعات پایه شغل
          </AccordionSummary>
          <AccordionDetails>
            <BaseJobForm />
          </AccordionDetails>
        </Accordion>

        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            فرم اطلاعات پایه ضریب سنوات
          </AccordionSummary>
          <AccordionDetails>
            <BaseYearsCoefForm />
          </AccordionDetails>
        </Accordion>

        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            فرم اطلاعات پایه مرتبه های شغلی
          </AccordionSummary>
          <AccordionDetails>
            <BaseJobOrderForm />
          </AccordionDetails>
        </Accordion>

        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            فرم اطلاعات پایه مزایای بازنشستگی
          </AccordionSummary>
          <AccordionDetails>
            <BaseRetirementBenefitsForm />
          </AccordionDetails>
        </Accordion>

        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            فرم اطلاعات پایه مستند قانونی
          </AccordionSummary>
          <AccordionDetails>
            <BaseLegalDocumentForm />
          </AccordionDetails>
        </Accordion>

        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            فرم اطلاعات پایه نوع انتقال کسور
          </AccordionSummary>
          <AccordionDetails>
            <BaseFractionMoveTypeForm />
          </AccordionDetails>
        </Accordion>

        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            فرم اطلاعات پایه نوع تسویه کسور
          </AccordionSummary>
          <AccordionDetails>
            <BaseFractionCheckoutTypeFrom />
          </AccordionDetails>
        </Accordion>

        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            فرم اطلاعات پایه نسبت خانوادگی
          </AccordionSummary>
          <AccordionDetails>
            <BaseFamilyRelationForm />
          </AccordionDetails>
        </Accordion>

        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            فرم اطلاعات پایه وضعیت بازنشستگان
          </AccordionSummary>
          <AccordionDetails>
            <BaseRetiredConditionForm />
          </AccordionDetails>
        </Accordion>

        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            فرم اطلاعات پایه وضعیت وابستگان
          </AccordionSummary>
          <AccordionDetails>
            <BaseRelatedConditionForm />
          </AccordionDetails>
        </Accordion>

        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            فرم اطلاعات پایه وضعیت وظیفه بگیران
          </AccordionSummary>
          <AccordionDetails>
            <BaseHeirConditionForm />
          </AccordionDetails>
        </Accordion>

        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            فرم اطلاعات پایه دریافت کنندگان مبالغ ثابت
          </AccordionSummary>
          <AccordionDetails>
            <BaseFixedAmountForm />
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
}

export default BaseInfoScreen;
