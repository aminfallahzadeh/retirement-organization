// react imports
import { useEffect } from "react";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { setPeriodsTableData } from "../slices/fractionDataSlice";
import { setData } from "../slices/calculateFractionDataSlice";

// components
import FractionForm from "../forms/FractionForm";
import FractionPeriodGrid from "../grids/FractionPeriodGrid";
import CalculateFractionForm from "../forms/CalculateFractionForm";

function FractionScreen() {
  const { fractionType } = useSelector((state) => state.fractionData);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setPeriodsTableData([]));
      dispatch(setData({}));
    };
  }, [dispatch]);

  const content = (
    <section className="flex-col u-margin-bottom-xl">
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
          <FractionPeriodGrid />
        </>
      )}

      <CalculateFractionForm />
    </section>
  );
  return content;
}

export default FractionScreen;
