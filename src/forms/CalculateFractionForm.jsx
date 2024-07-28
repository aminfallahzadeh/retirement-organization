// react imports
import { useState } from "react";

// redux imports
import { useCalculateFractionMutation } from "../slices/fractionApiSlice";
import { useSelector } from "react-redux";

// mui import
import { LoadingButton } from "@mui/lab";
import {
  CalculateOutlined as CalculateIcon,
  Save as SaveIcon,
} from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";

// helpers
import {
  convertToEnglishNumber,
  convertToPersianNumber,
  separateByThousands,
} from "../helper";

function CalculateFractionForm() {
  // CONTROLL STATES
  const [isCalcualted, setIsCalculated] = useState(false);

  // ACCESS USER STATES
  const { fractionType } = useSelector((state) => state.fractionData);
  const { periodsTableData } = useSelector((state) => state.fractionData);
  const { data } = useSelector((state) => state.calculateFractionData);

  // CALCUALTIONS STATE
  const [calculationData, setCalculationData] = useState({});

  // ACCESS THE POST REQUEST
  const [calculateFraction, { isLoading, isFetching }] =
    useCalculateFractionMutation();

  // CREATE DATA AND SEND FOR CALCULATION
  const handleCalculateButton = async (save) => {
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
        save,
        periods: periodsArray,
      }).unwrap();
      setIsCalculated(true);
      setCalculationData(res.itemList[0]);
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
                جمع مشمول کسور :
                <span>
                  {convertToPersianNumber(
                    separateByThousands(calculationData?.sumFraction)
                  ) || "-"}
                </span>
              </p>
              <p className="fraction-item">
                سهم کارفرما :
                <span>
                  {" "}
                  {convertToPersianNumber(
                    separateByThousands(
                      calculationData?.sumFractionOrganization
                    )
                  ) || "-"}
                </span>
              </p>
              <p className="fraction-item">
                سهم کارمند :
                <span>
                  {convertToPersianNumber(
                    separateByThousands(calculationData?.sumFractionPersonnel)
                  ) || "-"}
                </span>
              </p>
              <p className="fraction-item">
                مانده بدهی :
                <span>
                  {convertToPersianNumber(
                    separateByThousands(calculationData?.debtor)
                  ) || "-"}
                </span>
              </p>
              <p className="fraction-item">
                درصد سهم کارفرما :{" "}
                <span>
                  {convertToPersianNumber(data?.organazationPercent) + "%" ||
                    "-"}
                </span>
              </p>
              <p className="fraction-item">
                درصد سهم کارمند :{" "}
                <span>
                  {" "}
                  {convertToPersianNumber(data?.personelPercent) + "%" || "-"}
                </span>
              </p>
              <p className="fraction-item">
                مانده بستانکاری :{" "}
                <span>
                  {convertToPersianNumber(
                    separateByThousands(calculationData?.credit)
                  ) || "-"}
                </span>
              </p>
            </div>

            <div
              style={{ marginRight: "auto" }}
              className="flex-row flex-center"
            >
              <LoadingButton
                dir="ltr"
                endIcon={<CalculateIcon />}
                variant="contained"
                type="submit"
                loading={isFetching || isLoading}
                onClick={() => handleCalculateButton(false)}
                color="warning"
              >
                <span>محاسبه</span>
              </LoadingButton>
              <LoadingButton
                dir="ltr"
                endIcon={<SaveIcon />}
                disabled={!isCalcualted}
                variant="contained"
                type="submit"
                loading={isFetching || isLoading}
                onClick={() => handleCalculateButton(true)}
                color="success"
              >
                <span>ذخیره</span>
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
