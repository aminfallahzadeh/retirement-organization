// redux imports
import { useSelector } from "react-redux";

// mui imports
import { Button } from "@mui/material";
import { CalculateOutlined as CalculateIcon } from "@mui/icons-material";

// components
import FractionForm from "../forms/FractionForm";
import FractionPeriodGrid from "../grids/FractionPeriodGrid";

function FractionScreen() {
  const { fractionType } = useSelector((state) => state.fractionData);

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

      {fractionType === "solo" && (
        <div className="formContainer">
          <div className="fraction--total">
            <div className="fraction--total__items">
              <p>
                جمع مشمول کسور : <span>۱۰۰۰۰۰</span>
              </p>
              <p>
                سهم کارفرما : <span>۱۰۰۰۰۰</span>
              </p>
              <p>
                سهم کارمند : <span>۱۰۰۰۰۰</span>
              </p>
              <p>
                مانده بدهی : <span>۱۰۰۰۰۰</span>
              </p>
            </div>

            <div className="fraction--total__btn">
              <Button
                dir="ltr"
                endIcon={<CalculateIcon />}
                variant="contained"
                type="submit"
                color="warning"
                sx={{ fontFamily: "sahel" }}
              >
                <span>محاسبه</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
  return content;
}

export default FractionScreen;
