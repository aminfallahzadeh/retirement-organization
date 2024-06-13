// components
import IndividualInfoSection from "../sections/retired/IndividualInfoSection";
import RelatedInfoSection from "../sections/retired/RelatedInfoSection";

function RetiredScreen() {
  return (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline">اطلاعات بازنشسته</span>
        </h4>
      </div>

      <IndividualInfoSection />
      <RelatedInfoSection />
    </section>
  );
}

export default RetiredScreen;
