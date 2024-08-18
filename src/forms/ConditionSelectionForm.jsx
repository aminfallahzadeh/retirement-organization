// react imports
import { useState, useEffect } from "react";

// redux imports
import { useSelector } from "react-redux";
import { useLazyGenerateReportQuery } from "../slices/reportGeneratorsApiSlice";

// mui imports
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  PlayArrowOutlined as PlayIcon,
  GetAppOutlined as DownloadIcon,
} from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// utils
import { selectStyles, selectSettings } from "../utils/reactSelect";

// components
import ReportGeneratorGrid from "../grids/ReportGeneratorGrid";

function ConditionSelectionForm({
  fetureOptions,
  isColsLoading,
  isColsFetching,
  tableName,
}) {
  // MAIN STATE
  const [data, setData] = useState({});

  // FORWARDING PROPS
  const [tableData, setTableData] = useState([]);

  const animatedComponents = makeAnimated();

  // ACCESS REPORT DATA FROM REDUX STORE
  const { queryCondi, selectIDs } = useSelector(
    (state) => state.reportGeneratorData
  );

  // ACCEESS REPORT GENERATOR QUERY
  const [
    generateReport,
    { isLoading: isGenerating, isFetching: isGenerateFetching },
  ] = useLazyGenerateReportQuery();

  // SELECT OPTIONS
  const aggrefateOptions = [
    { value: "Min", label: "MIN" },
    { value: "Max", label: "MAX" },
    { value: "Count", label: "COUNT" },
    { value: "Avg", label: "AVG" },
  ];

  // HANDLE SELECT OPTION CHANGE
  const handleSelectOptionChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    if (selectedOption) {
      const { value } = selectedOption;
      setData({ ...data, [name]: value || "" });
    } else {
      setData({ ...data, [name]: null });
    }
  };

  const generateReportHandler = async () => {
    try {
      const res = await generateReport({
        ...data,
        txtSelectPart: selectIDs,
        ConditionsCode: queryCondi,
        ForSave: false,
      }).unwrap();
      const resData = JSON.parse(res.noneobject);
      setTableData(resData);
      console.log(resData);
      toast.success(res.message || res?.error?.data.message, {
        autoClose: 2000,
      });
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
    <>
      <section className="formContainer">
        <form method="POST" className="flex-col">
          <div className="flex-col">
            <h4 className="condition__box--title">دسته بندی:</h4>

            <div className="grid grid--col-4">
              <div className="inputBox__form">
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={fetureOptions}
                  onChange={handleSelectOptionChange}
                  value={fetureOptions.find(
                    (item) => item.value === data?.cmbGroupField0
                  )}
                  name="cmbGroupField0"
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">ستون</div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                  isLoading={isColsLoading || isColsFetching}
                  isDisabled={!tableName}
                />

                <label
                  className={
                    data?.cmbGroupField0
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  ستون
                </label>
              </div>

              <div className="inputBox__form">
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={aggrefateOptions}
                  onChange={handleSelectOptionChange}
                  value={fetureOptions.find(
                    (item) => item.value === data?.cmbGroupFunction0
                  )}
                  name="cmbGroupFunction0"
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">تجمیع</div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                  isLoading={isColsLoading || isColsFetching}
                  isDisabled={!tableName}
                />

                <label
                  className={
                    data?.cmbGroupFunction0
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  تجمیع
                </label>
              </div>

              <div className="inputBox__form">
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={fetureOptions}
                  onChange={handleSelectOptionChange}
                  value={fetureOptions.find(
                    (item) => item.value === data?.cmbGroupField1
                  )}
                  name="cmbGroupField1"
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">ستون</div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                  isLoading={isColsLoading || isColsFetching}
                  isDisabled={!tableName}
                />

                <label
                  className={
                    data?.cmbGroupField1
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  ستون
                </label>
              </div>

              <div className="inputBox__form">
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={aggrefateOptions}
                  onChange={handleSelectOptionChange}
                  value={fetureOptions.find(
                    (item) => item.value === data?.cmbGroupFunction1
                  )}
                  name="cmbGroupFunction1"
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">تجمیع</div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                  isLoading={isColsLoading || isColsFetching}
                  isDisabled={!tableName}
                />

                <label
                  className={
                    data?.cmbGroupFunction1
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  تجمیع
                </label>
              </div>

              <div className="inputBox__form">
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={fetureOptions}
                  onChange={handleSelectOptionChange}
                  value={fetureOptions.find(
                    (item) => item.value === data?.cmbGroupField2
                  )}
                  name="cmbGroupField2"
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">ستون</div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                  isLoading={isColsLoading || isColsFetching}
                  isDisabled={!tableName}
                />

                <label
                  className={
                    data?.cmbGroupField2
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  ستون
                </label>
              </div>

              <div className="inputBox__form">
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={aggrefateOptions}
                  onChange={handleSelectOptionChange}
                  value={fetureOptions.find(
                    (item) => item.value === data?.cmbGroupFunction2
                  )}
                  name="cmbGroupFunction2"
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">تجمیع</div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                  isLoading={isColsLoading || isColsFetching}
                  isDisabled={!tableName}
                />

                <label
                  className={
                    data?.cmbGroupFunction2
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  تجمیع
                </label>
              </div>

              <div className="inputBox__form">
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={fetureOptions}
                  onChange={handleSelectOptionChange}
                  value={fetureOptions.find(
                    (item) => item.value === data?.cmbGroupField3
                  )}
                  name="cmbGroupField3"
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">ستون</div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                  isLoading={isColsLoading || isColsFetching}
                  isDisabled={!tableName}
                />

                <label
                  className={
                    data?.cmbGroupField3
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  ستون
                </label>
              </div>

              <div className="inputBox__form">
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={aggrefateOptions}
                  onChange={handleSelectOptionChange}
                  value={fetureOptions.find(
                    (item) => item.value === data?.cmbGroupFunction3
                  )}
                  name="cmbGroupFunction3"
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">تجمیع</div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                  isLoading={isColsLoading || isColsFetching}
                  isDisabled={!tableName}
                />

                <label
                  className={
                    data?.cmbGroupFunction3
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  تجمیع
                </label>
              </div>
            </div>

            <div style={{ marginRight: "auto" }} className="flex-row">
              <LoadingButton
                dir="ltr"
                variant="contained"
                endIcon={<PlayIcon />}
                onClick={generateReportHandler}
                loading={isGenerating || isGenerateFetching}
                color="success"
                sx={{ fontFamily: "sahel" }}
              >
                <span>اجرای گزارش</span>
              </LoadingButton>

              <Button
                dir="ltr"
                endIcon={<DownloadIcon />}
                variant="contained"
                color="success"
                sx={{ fontFamily: "sahel" }}
              >
                <span>خروجی اکسل</span>
              </Button>
            </div>
          </div>
        </form>
      </section>

      <ReportGeneratorGrid tableData={tableData} />
    </>
  );
  return content;
}

export default ConditionSelectionForm;
