// compoentns
import PersonnelInfoForm from "../forms/PersonnelInfoForm";
import PersonnelGridsSection from "../sections/personnel/PersonnelGridsSection";

function PersonnelInfoScreen() {
  const content = (
    <section className="main flex-col">
      <h4 className="title-primary">اطلاعات کارمند</h4>
      <PersonnelInfoForm />
      <PersonnelGridsSection />
    </section>
  );
  return content;
}

export default PersonnelInfoScreen;
