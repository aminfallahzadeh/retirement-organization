// component imports
import RelatedInfoGrid from "../../grids/RelatedInfoGrid";
import RelatedInfoTabs from "./RelatedInfoTabs";
// import RetiredHokmInfoModal from "./RetiredHokmInfoModal";

function RelatedInfoSection() {
  return (
    <section className="u-margin-top-lg">
      <RelatedInfoTabs />

      <RelatedInfoGrid />

      <div>{/* <RetiredHokmInfoModal /> */}</div>
    </section>
  );
}

export default RelatedInfoSection;
