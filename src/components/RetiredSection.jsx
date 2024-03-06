// component imports
import AffairsBankInfoForm from "./AffairsBankInfoForm";
import AffairsStaffInfoForm from "./AffairsStaffInfoForm";
import AffairsPersonalInfoForm from "./AffairsPersonalInfoForm";

// react imports
import { useState } from "react";

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
      <div className="pensionersAffairs__item" onClick={handleShowPersonalForm}>
        <h4>اطلاعات فردی بازنشسته</h4>
      </div>
      {showPersonalForm && <AffairsPersonalInfoForm />}

      <div className="pensionersAffairs__item" onClick={handleShowStaffForm}>
        <h4>اطلاعات پرسنلی</h4>
      </div>

      {showStaffForm && <AffairsStaffInfoForm />}

      <div className="pensionersAffairs__item" onClick={handleShowBankForm}>
        <h4>اطلاعات شماره حساب بانکی بازنشسته</h4>
      </div>

      {showBankForm && <AffairsBankInfoForm />}
    </section>
  );

  return content;
}

export default RetiredSection;
