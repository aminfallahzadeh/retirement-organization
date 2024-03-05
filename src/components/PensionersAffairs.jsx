// component imports
import BankinfoForm from "../components/BankinfoForm";
import PersonelinfoForm from "./PersonelinfoForm";

// react imports
import { useState } from "react";

function PensionersAffairs() {
  const [showBankForm, setShowBankForm] = useState(false);
  const [showPersonelForm, setShowPersonelForm] = useState(false);

  const handleShowBankForm = () => {
    setShowBankForm(!showBankForm);
  };

  const handleShowPersonelForm = () => {
    setShowPersonelForm(!showPersonelForm);
  };

  return (
    <section className="pensionersAffairs">
      <div className="pensionersAffairs__item">
        <h4>اطلاعات فردی بازنشسته</h4>
      </div>

      <div className="pensionersAffairs__item" onClick={handleShowPersonelForm}>
        <h4>اطلاعات پرسنلی</h4>
      </div>

      {showPersonelForm && <PersonelinfoForm />}

      <div className="pensionersAffairs__item" onClick={handleShowBankForm}>
        <h4>اطلاعات شماره حساب بانکی بازنشسته</h4>
      </div>

      {showBankForm && <BankinfoForm />}
    </section>
  );
}

export default PensionersAffairs;
