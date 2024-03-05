// component imports
import BankinfoForm from "../components/BankinfoForm";

// react imports
import { useState } from "react";

function PensionersAffairs() {
  const [showBankForm, setShowBankForm] = useState(false);

  const handleShowBankForm = () => {
    setShowBankForm(!showBankForm);
  };

  return (
    <section className="pensionersAffairs">
      <div className="pensionersAffairs__item">
        <h4>اطلاعات فردی بازنشسته</h4>
      </div>

      <div className="pensionersAffairs__item">
        <h4>اطلاعات پرسنلی</h4>
      </div>

      <div className="pensionersAffairs__item" onClick={handleShowBankForm}>
        <h4>اطلاعات شماره حساب بانکی بازنشسته</h4>
      </div>

      {showBankForm && <BankinfoForm />}
    </section>
  );
}

export default PensionersAffairs;
