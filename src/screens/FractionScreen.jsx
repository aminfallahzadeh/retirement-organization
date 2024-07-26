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
        <>
          <div className="flex-col flex-center">
            <h5 className="title-secondary">محاسبه کسورات</h5>
          </div>

          <div className="formContainer flex-col">
            <div className="grid grid--col-5">
              <p className="fraction-item">
                جمع مشمول کسور : <span>-</span>
              </p>
              <p className="fraction-item">
                سهم کارفرما : <span>-</span>
              </p>
              <p className="fraction-item">
                سهم کارمند : <span>-</span>
              </p>
              <p className="fraction-item">
                مانده بدهی : <span>-</span>
              </p>
              <p className="fraction-item">
                درصد سهم کارفرما : <span>-</span>
              </p>
              <p className="fraction-item">
                درصد سهم کارمند : <span>-</span>
              </p>
              <p className="fraction-item">
                مانده بستانکاری : <span>-</span>
              </p>
            </div>

            <div style={{ marginRight: "auto" }}>
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
        </>
      )}
    </section>
  );
  return content;
}

export default FractionScreen;
