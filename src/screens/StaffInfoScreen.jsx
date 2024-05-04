// compoentns
import StaffInfoForm from "../forms/StaffInfoForm";
import StaffGridsSection from "../sections/staff/StaffGridsSection";

function StaffInfoScreen() {
  const content = (
    <section className="main flex-col">
      <h4 className="title-primary">اطلاعات کارمند</h4>
      <StaffInfoForm />
      <StaffGridsSection />
    </section>
  );
  return content;
}

export default StaffInfoScreen;
