// components
import ArchiveTree from "../components/ArchiveTree";

function ElectronicStatementScreen() {
  return (
    <section className="main">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>پرونده الکترونیک
        </h4>
      </div>
      <ArchiveTree />
    </section>
  );
}

export default ElectronicStatementScreen;
