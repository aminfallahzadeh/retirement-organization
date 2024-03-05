// component imports
import BankInfoForm from "./BankInfoForm";
import StaffInfoForm from "./StaffInfoForm";
import PersonalInfoForm from "./PersonalInfoForm";

// react imports
import { useState } from "react";

function PensionersAffairs() {
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

  return (
    <section className="pensionersAffairs">
      <div className="pensionersAffairs__item" onClick={handleShowPersonalForm}>
        <h4>اطلاعات فردی بازنشسته</h4>
      </div>
      {showPersonalForm && <PersonalInfoForm />}

      <div className="pensionersAffairs__item" onClick={handleShowStaffForm}>
        <h4>اطلاعات پرسنلی</h4>
      </div>

      {showStaffForm && <StaffInfoForm />}

      <div className="pensionersAffairs__item" onClick={handleShowBankForm}>
        <h4>اطلاعات شماره حساب بانکی بازنشسته</h4>
      </div>

      {showBankForm && <BankInfoForm />}
    </section>
  );
}

export default PensionersAffairs;
