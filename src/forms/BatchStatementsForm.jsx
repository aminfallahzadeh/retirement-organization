// react imports
import { useState, useEffect } from "react";

// redux imports
import { useGetLookupDataQuery } from "../slices/sharedApiSlice";

// mui imports
import { Switch } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import {
  Save as SaveIcon,
  VisibilityRounded as EyeIcon,
  UploadRounded as UploadIcon,
} from "@mui/icons-material";

function BatchStatementsForm() {
  const [isExcel, setIsExcel] = useState(false);

  // LOOK UP STATES
  const [genderCombo, setGenderCombo] = useState([]);

  // GET LOOKUP DATA
  const {
    data: genderComboItems,
    isSuccess: isGenderComboItemsSuccess,
    error: genderComboItemsError,
  } = useGetLookupDataQuery({ lookUpType: "Gender" });

  // FETCH LOOKUP DATA
  useEffect(() => {
    if (isGenderComboItemsSuccess) {
      setGenderCombo(genderComboItems.itemList);
    }
  }, [genderComboItems, isGenderComboItemsSuccess]);

  useEffect(() => {
    if (genderComboItemsError) {
      console.log(genderComboItemsError);
    }
  }, [genderComboItemsError]);

  // HANDLERS
  const handleIsExcelChange = () => {
    setIsExcel(!isExcel);
  };

  const content = (
    <section className="flex-col formContainer">
      <form className="grid grid--col-4">
        <div className="checkboxContainer">
          <span>فایل اکسل</span>

          <Switch checked={isExcel} onChange={handleIsExcelChange} />
        </div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>

        {isExcel ? (
          <div style={{ marginRight: "auto" }} className="flex-row flex-center">
            <div>
              <LoadingButton
                dir="ltr"
                variant="contained"
                color="success"
                sx={{ fontFamily: "sahel" }}
                endIcon={<UploadIcon />}
              >
                <span>بارگزاری اکسل</span>
              </LoadingButton>
            </div>

            <div>
              <Button
                dir="ltr"
                variant="contained"
                color="primary"
                sx={{ fontFamily: "sahel" }}
                endIcon={<SaveIcon />}
              >
                <span>ذخیره</span>
              </Button>
            </div>
          </div>
        ) : (
          <div>&nbsp;</div>
        )}

        {!isExcel && (
          <>
            <div className="inputBox__form">
              <select
                className="inputBox__form--input"
                defaultValue=" "
                required
              >
                <option value=" " disabled>
                  انتخاب کنید
                </option>
              </select>

              <label className="inputBox__form--label">
                <span>*</span> نوع سازمان
              </label>
            </div>

            <div className="inputBox__form">
              <select
                className="inputBox__form--input"
                defaultValue=" "
                required
              >
                <option value=" " disabled>
                  انتخاب کنید
                </option>

                {genderCombo?.map((gender) => (
                  <option key={gender.lookUpID} value={gender.lookUpID}>
                    {gender.lookUpName}
                  </option>
                ))}
              </select>

              <label className="inputBox__form--label">
                <span>*</span> جنسیت
              </label>
            </div>

            <div className="inputBox__form">
              <select
                className="inputBox__form--input"
                defaultValue=" "
                required
              >
                <option value=" " disabled>
                  انتخاب کنید
                </option>
              </select>

              <label className="inputBox__form--label">
                <span>*</span> وضعیت
              </label>
            </div>

            <div
              style={{ marginRight: "auto" }}
              className="flex-row flex-center"
            >
              <div>
                <LoadingButton
                  dir="ltr"
                  variant="contained"
                  disabled
                  color="success"
                  sx={{ fontFamily: "sahel" }}
                  endIcon={<EyeIcon />}
                >
                  <span>مشاهده</span>
                </LoadingButton>
              </div>

              <div>
                <Button
                  dir="ltr"
                  variant="contained"
                  color="primary"
                  sx={{ fontFamily: "sahel" }}
                  endIcon={<SaveIcon />}
                >
                  <span>ذخیره</span>
                </Button>
              </div>
            </div>
          </>
        )}
      </form>
    </section>
  );
  return content;
}

export default BatchStatementsForm;
