// components
import AffairsSearchPensionerForm from "../components/AffairsSearchPensionerForm";
import RetiredSection from "../components/RetiredSection";
import RetiredInfoSection from "../components/RetiredInfoSection";

function RetirementAffairsScreen() {
  return (
    <div className="main">
      <div className="dashboard__body--pensioners">
        <AffairsSearchPensionerForm />
        <RetiredSection />
        <RetiredInfoSection />
      </div>
    </div>
  );
}

export default RetirementAffairsScreen;
