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

// librari imports
import Select from "react-select";
import makeAnimated from "react-select/animated";

// utils
import { styles } from "../utils/reactSelectStyles";

function BatchStatementsForm() {
  const [isExcel, setIsExcel] = useState(false);

  // MAIN STATE
  const [data, setData] = useState({});

  // LOOK UP STATES
  const [employmnetCombo, setEmploymnetCombo] = useState([]);
  const [genderCombo, setGenderCombo] = useState([]);

  const animatedComponents = makeAnimated();

  // GET LOOKUP DATA
  const {
    data: genderComboItems,
    isSuccess: isGenderComboItemsSuccess,
    isLoading: isGenderComboItemsLoading,
    isFetching: isGenderComboItemsFetching,
    error: genderComboItemsError,
  } = useGetLookupDataQuery({ lookUpType: "Gender" });

  const {
    data: employmnetComboItems,
    isSuccess: isEmploymnetComboItemsSuccess,
    isLoading: isEmploymnetComboItemsLoading,
    isFetching: isEmploymnetComboItemsFetching,
    error: employmnetComboItemsError,
  } = useGetLookupDataQuery({ lookUpType: "EmploymentType" });

  // SELECT OPTIONS
  const employmentOptions = employmnetCombo.map((item) => {
    return { value: item.lookUpID, label: item.lookUpName };
  });

  // FETCH LOOKUP DATA
  useEffect(() => {
    if (isGenderComboItemsSuccess) {
      setGenderCombo(genderComboItems.itemList);
    }
  }, [genderComboItems, isGenderComboItemsSuccess]);

  useEffect(() => {
    if (isEmploymnetComboItemsSuccess) {
      setEmploymnetCombo(employmnetComboItems.itemList);
    }
  }, [isEmploymnetComboItemsSuccess, employmnetComboItems]);

  // HANLDE ERRORS
  useEffect(() => {
    if (genderComboItemsError) {
      console.log(genderComboItemsError);
    }
  }, [genderComboItemsError]);

  useEffect(() => {
    if (employmnetComboItemsError) {
      console.log(employmnetComboItemsError);
    }
  }, [employmnetComboItemsError]);

  // HANDLERS
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

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
              <Button
                dir="ltr"
                variant="contained"
                color="primary"
                disabled
                sx={{ fontFamily: "sahel" }}
                endIcon={<EyeIcon />}
              >
                <span>مشاهده</span>
              </Button>
            </div>
            <div>
              <LoadingButton
                dir="ltr"
                variant="contained"
                color="warning"
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
                color="success"
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
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              options={employmentOptions}
              placeholder={
                <div className="react-select-placeholder">
                  <span>*</span> نوع سازمان
                </div>
              }
              noOptionsMessage={() => "موردی یافت نشد!"}
              isMulti
              isLoading={
                isEmploymnetComboItemsFetching || isEmploymnetComboItemsLoading
              }
              loadingMessage={() => "در حال بارگذاری ..."}
              styles={styles}
            />
            {/* <div className="inputBox__form">
              <select
                className="inputBox__form--input"
                required
                value={data.employmentTypeID || " "}
                name="employmentTypeID"
                onChange={handleDataChange}
                disabled={
                  isEmploymnetComboItemsFetching ||
                  isEmploymnetComboItemsLoading
                }
              >
                <option value=" " disabled>
                  انتخاب کنید
                </option>

                {employmnetCombo?.map((item) => (
                  <option key={item.lookUpID} value={item.lookUpID}>
                    {item.lookUpName}
                  </option>
                ))}
              </select>

              <label className="inputBox__form--label">
                <span>*</span> نوع سازمان
              </label>
            </div> */}

            <div className="inputBox__form">
              <select
                className="inputBox__form--input"
                value={data.genderID || " "}
                required
                onChange={handleDataChange}
                name="genderID"
                disabled={
                  isGenderComboItemsFetching || isGenderComboItemsLoading
                }
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
                  color="success"
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
