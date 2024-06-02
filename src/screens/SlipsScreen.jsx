// components
import SlipsForm from "../forms/SlipsForm";
import SlipsPreviewGrid from "../grids/SlipsPreviewGrid";

function SlipsScreen() {
  const content = (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>
          فیش های حقوقی
        </h4>
      </div>
      <SlipsForm />
      <SlipsPreviewGrid />
    </section>
  );

  return content;
}

export default SlipsScreen;
