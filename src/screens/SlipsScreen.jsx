// components
import SlipsForm from "../forms/SlipsForm";
import SlipsPreviewGrid from "../grids/SlipsPreviewGrid";

function SlipsScreen() {
  const content = (
    <section className="main flex-col">
      <h4 className="title-primary">فیش های حقوقی</h4>
      <SlipsForm />

      <SlipsPreviewGrid />
    </section>
  );

  return content;
}

export default SlipsScreen;
