// components
import AffairsSearchPensionerForm from "../components/AffairsSearchPensionerForm";
import RetiredSection from "../components/RetiredSection";
import RetiredInfoSection from "../components/RetiredInfoSection";

function RetirementAffairsScreen() {
  return (
    <div className="main">
      <AffairsSearchPensionerForm />
      <RetiredSection />
      <RetiredInfoSection />
    </div>
  );
}

export default RetirementAffairsScreen;
