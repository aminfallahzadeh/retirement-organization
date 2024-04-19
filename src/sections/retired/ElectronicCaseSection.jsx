// components
import ArchiveTree from "../../components/ArchiveTree";

function ElectronicCaseSection() {
  return (
    <section className="flex-col">
      <div className="flex-row">
        <ArchiveTree />
        <img src="./images/sample-statement.png" />
      </div>
    </section>
  );
}

export default ElectronicCaseSection;
