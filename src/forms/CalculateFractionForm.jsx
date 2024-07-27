// redux imports
import { useCalculateFractionMutation } from "../slices/fractionApiSlice";
import { useSelector } from "react-redux";

// mui import
import { LoadingButton } from "@mui/lab";
import { CalculateOutlined as CalculateIcon } from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";

// helpers
import { convertToEnglishNumber } from "../helper";

function CalculateFractionForm() {
  // ACCESS USER STATES
  const { fractionType } = useSelector((state) => state.fractionData);
  const { periodsTableData } = useSelector((state) => state.fractionData);
  const { data } = useSelector((state) => state.calculateFractionData);

  // ACCESS THE POST REQUEST
  const [calculateFraction, { isLoading, isFetching }] =
    useCalculateFractionMutation();

  // CREATE DATA AND SEND FOR CALCULATION
  const handleCalculateButton = async () => {
    try {
      const periodsArray = periodsTableData.map((period) => ({
        period: convertToEnglishNumber(
          `${period.periodYear}/${period.periodMonth}`
        ),
        days: Number(period.periodDay) || null,
      }));

      const res = await calculateFraction({
        ...data,
        letterNO: convertToEnglishNumber(data.letterNO),
        amount: convertToEnglishNumber(data.amount),
        paymentNO: convertToEnglishNumber(data.paymentNO),
        personNationalCode: convertToEnglishNumber(data.personNationalCode),
        letterDate: new Date(data.letterDate),
        paymentDate: new Date(data.paymentDate),
        save: false,
        periods: periodsArray,
      }).unwrap();

      console.log(res);
      toast.success(res.message, {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  const content = (
    <>
      {fractionType === "solo" ? (
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
              <LoadingButton
                dir="ltr"
                endIcon={<CalculateIcon />}
                variant="contained"
                type="submit"
                loading={isFetching || isLoading}
                onClick={handleCalculateButton}
                color="warning"
                sx={{ fontFamily: "sahel" }}
              >
                <span>محاسبه</span>
              </LoadingButton>
            </div>
          </div>
        </>
      ) : null}
    </>
  );

  return content;
}

export default CalculateFractionForm;
