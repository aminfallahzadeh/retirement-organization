// components
import PersonnelStatementForm from "../forms/PersonnelStatementForm";

function PersonnelStatementsScreen() {
  const content = (
    <section className="main flex-col">
      <h4 className="title-primary">احکام کارمندان</h4>
      <PersonnelStatementForm />
    </section>
  );

  return content;
}

export default PersonnelStatementsScreen;
