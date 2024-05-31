// components
import ArchiveTree from "../components/ArchiveTree";

function ElectronicStatementScreen() {
  return (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>پرونده الکترونیک
        </h4>
      </div>

      <div className="formContainer">
        <ArchiveTree />
      </div>
    </section>
  );
}

export default ElectronicStatementScreen;
