// redux imports
import { useSelector } from "react-redux";

// components
import FractionForm from "../forms/FractionForm";
import FractionPeriodGrid from "../grids/FractionPeriodGrid";

function FractionScreen() {
  const { fractionType } = useSelector((state) => state.fractionData);

  const content = (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline">کسورات</span>
        </h4>
      </div>

      <FractionForm />

      {fractionType === "solo" && (
        <>
          <div className="flex-col flex-center">
            <h5 className="title-secondary">لیست دوره ها</h5>
          </div>
          <FractionPeriodGrid />{" "}
        </>
      )}
    </section>
  );
  return content;
}

export default FractionScreen;
