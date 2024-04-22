// components
import StaffStatementsForm from "../forms/StaffStatementsForm";

function StaffStatementsScreen() {
  const content = (
    <section className="main flex-col">
      <h4 className="title-primary">احکام کارمندان</h4>
      <StaffStatementsForm />
    </section>
  );

  return content;
}

export default StaffStatementsScreen;
