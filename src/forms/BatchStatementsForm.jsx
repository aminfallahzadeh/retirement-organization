// react imports
import { useState, useEffect } from "react";

// redux imports
import {
  useGetLookupDataQuery,
  useGetPensionaryStatusQuery,
} from "../slices/sharedApiSlice";

import { useGetStatementListFromFiltersMutation } from "../slices/retirementStatementApiSlice";

// mui imports
import { Switch } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import {
  Save as SaveIcon,
  VisibilityRounded as EyeIcon,
  UploadRounded as UploadIcon,
} from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// utils
import { styles, settings } from "../utils/reactSelectStyles";

function BatchStatementsForm() {
  const [isExcel, setIsExcel] = useState(false);

  // MAIN STATE
  const [data, setData] = useState({});

  // LOOK UP STATES
  const [employmnetCombo, setEmploymnetCombo] = useState([]);
  const [genderCombo, setGenderCombo] = useState([]);
  const [statusCombo, setStatusCombo] = useState([]);

  const animatedComponents = makeAnimated();

  // ACCESS THE FILTER QUERY
  const [
    getStatementListFromFilters,
    { isLoading: isStatementListLoading, isFetching: isStatementListFetching },
  ] = useGetStatementListFromFiltersMutation();

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

  const {
    data: statusComboItems,
    isSuccess: isStatusComboItemsSuccess,
    isLoading: isStatusComboItemsLoading,
    isFetching: isStatusComboItemsFetching,
    error: statusComboItemsError,
  } = useGetPensionaryStatusQuery({ pensionaryStatusCategory: "R" });

  // SELECT OPTIONS
  const employmentOptions = employmnetCombo.map((item) => ({
    value: item.lookUpID,
    label: item.lookUpName,
  }));

  const genderOptions = genderCombo.map((item) => ({
    value: item.lookUpID,
    label: item.lookUpName,
  }));

  const statusOptions = statusCombo.map((item) => ({
    value: item.pensionaryStatusID,
    label: item.pensionaryStatusName,
  }));

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

  useEffect(() => {
    if (isStatusComboItemsSuccess) {
      setStatusCombo(statusComboItems.itemList);
    }
  }, [isStatusComboItemsSuccess, statusComboItems]);

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

  useEffect(() => {
    if (statusComboItemsError) {
      console.log(statusComboItemsError);
    }
  }, [statusComboItemsError]);

  // HANDLERS
  const handleDataChange = (selectedOptions, actionMeta) => {
    const name = actionMeta.name;
    const value = selectedOptions
      ? selectedOptions.map((item) => item.value)
      : [];
    setData({ ...data, [name]: value });
  };

  const handleIsExcelChange = () => {
    setIsExcel(!isExcel);
  };

  const handleFilterListByValues = async () => {
    try {
      const filterRes = await getStatementListFromFilters(data).unwrap();
      console.log(filterRes);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const content = (
    <section className="flex-col formContainer">
      <form className="grid grid--col-4">
        <div className="checkboxContainer">
          <span className="checkboxContainer__label">فایل اکسل</span>

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
              onChange={handleDataChange}
              options={employmentOptions}
              defaultValue={[]}
              name="employmentTypeIDs"
              placeholder={
                <div className="react-select-placeholder">
                  <span>*</span> نوع سازمان
                </div>
              }
              noOptionsMessage={settings.noOptionsMessage}
              loadingMessage={settings.loadingMessage}
              isMulti
              isLoading={
                isEmploymnetComboItemsFetching || isEmploymnetComboItemsLoading
              }
              styles={styles}
            />

            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              onChange={handleDataChange}
              defaultValue={[]}
              options={genderOptions}
              name="genderIDs"
              placeholder={
                <div className="react-select-placeholder">
                  <span>*</span> جنسیت
                </div>
              }
              noOptionsMessage={settings.noOptionsMessage}
              loadingMessage={settings.loadingMessage}
              isMulti
              isLoading={
                isGenderComboItemsFetching || isGenderComboItemsLoading
              }
              styles={styles}
            />

            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              onChange={handleDataChange}
              options={statusOptions}
              defaultValue={[]}
              name="pensionaryStatusIDs"
              placeholder={
                <div className="react-select-placeholder">
                  <span>*</span> وضعیت
                </div>
              }
              noOptionsMessage={settings.noOptionsMessage}
              loadingMessage={settings.loadingMessage}
              isMulti
              isLoading={
                isStatusComboItemsFetching || isStatusComboItemsLoading
              }
              styles={styles}
            />

            <div
              style={{ marginRight: "auto" }}
              className="flex-row flex-center"
            >
              <LoadingButton
                dir="ltr"
                variant="contained"
                disabled={
                  !data.employmentTypeIDs ||
                  !data.genderIDs ||
                  !data.pensionaryStatusIDs ||
                  data.employmentTypeIDs.length === 0 ||
                  data.genderIDs.length === 0 ||
                  data.pensionaryStatusIDs.length === 0
                }
                loading={isStatementListFetching || isStatementListLoading}
                onClick={handleFilterListByValues}
                color="primary"
                sx={{ fontFamily: "sahel" }}
                endIcon={<EyeIcon />}
              >
                <span>مشاهده</span>
              </LoadingButton>
            </div>
          </>
        )}
      </form>
    </section>
  );
  return content;
}

export default BatchStatementsForm;
