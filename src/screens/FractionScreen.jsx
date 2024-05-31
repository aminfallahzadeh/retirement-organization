// components
import FractionForm from "../forms/FractionForm";

function FractionScreen() {
  return (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline">کسورات</span>
        </h4>
      </div>

      <FractionForm />
    </section>
  );
}

export default FractionScreen;
