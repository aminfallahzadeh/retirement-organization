// components
import PersonnelStatementForm from "../forms/PersonnelStatementForm";
import PersonnelGrid from "../grids/PersonnelGrid";

function PersonnelStatementsScreen() {
  const content = (
    <section className="main flex-col">
      <h4 className="title-primary">احکام کارمندان</h4>
      <PersonnelStatementForm />
      <PersonnelGrid />
    </section>
  );

  return content;
}

export default PersonnelStatementsScreen;
