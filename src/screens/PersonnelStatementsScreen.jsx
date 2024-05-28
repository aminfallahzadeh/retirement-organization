// components
import PersonnelStatementForm from "../forms/PersonnelStatementForm";
import PersonnelGrid from "../grids/PersonnelGrid";

function PersonnelStatementsScreen() {
  const content = (
    <section className="main flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>احکام کارمندان
        </h4>
      </div>

      <PersonnelStatementForm />
      <PersonnelGrid />
    </section>
  );

  return content;
}

export default PersonnelStatementsScreen;
