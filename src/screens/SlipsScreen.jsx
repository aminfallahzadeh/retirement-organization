// components
import SlipsForm from "../forms/SlipsForm";

function SlipsScreen() {
  const content = (
    <section className="main flex-col">
      <h4 className="title-primary">فیش های حقوقی</h4>
      <SlipsForm />
    </section>
  );

  return content;
}

export default SlipsScreen;
