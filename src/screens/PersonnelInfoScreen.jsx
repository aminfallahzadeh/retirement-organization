// compoentns
import PersonnelInfoForm from "../forms/PersonnelInfoForm";
import PersonnelGridsSection from "../sections/personnel/PersonnelGridsSection";

function PersonnelInfoScreen() {
  const content = (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>اطلاعات کارمند
        </h4>
      </div>
      <PersonnelInfoForm />
      <PersonnelGridsSection />
    </section>
  );
  return content;
}

export default PersonnelInfoScreen;
