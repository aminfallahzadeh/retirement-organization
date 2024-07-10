// react import
import { useState, useEffect, useCallback } from "react";

// redux import
import {
  useGetTablesQuery,
  useLazyGetColsQuery,
  useLazyGetLookupValueQuery,
} from "../slices/reportGeneratorsApiSlice";

// mui imports
import { IconButton, Tooltip, Button } from "@mui/material";
import {
  DeleteOutline as RemoveIcon,
  Add as AddIcon,
} from "@mui/icons-material";

// helpers
import { findById } from "../helper";

function ReportGeneratorTableForm() {
  // MAIN STATES
  const [data, setData] = useState({ operator: "=" });
  const [conditionText, setConditionText] = useState("");

  // LOOK UP STATES
  const [tableCombo, setTableCombo] = useState([]);
  const [featureCombo, setFeatureCombo] = useState([]);
  const [conditionCombo, setConditionCombo] = useState([]);

  const [isLookup, setIsLookup] = useState(false);

  const [getCols, { isLoading: isColsLoading, isFetching: isColsFetching }] =
    useLazyGetColsQuery();

  const [
    getLookupValue,
    { isLoading: isLookupLoading, isFetching: isLookupFetching },
  ] = useLazyGetLookupValueQuery();

  const {
    data: tables,
    isSuccess: isTablesSuccess,
    isLoading: isTablesLoading,
    isFetching: isTablesFetching,
    error: tablesError,
  } = useGetTablesQuery();

  useEffect(() => {
    if (isTablesSuccess) {
      setTableCombo(tables.itemList);
    }
  }, [tables, isTablesSuccess]);

  useEffect(() => {
    if (tablesError) {
      console.log(tablesError);
    }
  }, [tablesError]);

  // GET COLS FUNCTION
  const fetchColsData = useCallback(
    async (TableName) => {
      try {
        const res = await getCols(TableName).unwrap();
        setFeatureCombo(res.itemList);
      } catch (err) {
        console.log(err);
      }
    },
    [getCols]
  );

  // GET COLS IF USER CHANGES TABLE
  useEffect(() => {
    if (data.TableName) {
      fetchColsData(data.TableName);
    }
  }, [data, fetchColsData]);

  // GET LOOKUP VALUE FUNCTION
  const fetchLookupValue = useCallback(
    async (id) => {
      try {
        const res = await getLookupValue(id).unwrap();
        setConditionCombo(res.itemList);
      } catch (err) {
        console.log(err);
      }
    },
    [getLookupValue]
  );

  // GET LOOKUP VALUE isLookup IS TRUE
  useEffect(() => {
    if (isLookup) {
      fetchLookupValue(data.columnid);
    }
  }, [data, fetchLookupValue, isLookup]);

  useEffect(() => {
    if (data.columnid) {
      const columnData = findById(featureCombo, data.columnid);
      if (columnData) {
        setIsLookup(columnData.isLookup === 0 ? false : true);
      }
    }
  }, [data, featureCombo]);

  useEffect(() => {
    console.log(isLookup);
  }, [isLookup]);

  // HANDLERS
  const addConditionHandler = (colId, op, condi) => {
    let result;
    const colData = findById(featureCombo, colId);
    const colText = colData.columnTitle;

    if (isLookup) {
      const condiData = findById(conditionCombo, condi, "value");
      const condiText = condiData.text;
      result = `${colText} ${op} ${condiText}`;
    } else {
      result = `${colText} ${op} ${condi}`;
    }

    setConditionText(conditionText + " " + result);
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleDeleteAllconditions = () => {
    setConditionText("");
  };

  const handleAddAnd = () => {
    setConditionText(conditionText + " " + "AND");
  };

  const content = (
    <section className="formContainer flex-col">
      <form method="POST" className="flex-col">
        <div className="grid grid--col-4">
          <div className="inputBox__form">
            <select
              className="inputBox__form--input"
              id="selectTable"
              name="TableName"
              onChange={handleDataChange}
              defaultValue=""
              disabled={isTablesLoading || isTablesFetching}
            >
              <option value="" disabled>
                انتخاب کنید
              </option>

              {tableCombo.map((item) => (
                <option value={item.tableName} key={item.id}>
                  {item.tableNameFarsi}
                </option>
              ))}
            </select>

            <label className="inputBox__form--label" htmlFor="selectTable">
              انتخاب جدول
            </label>
          </div>
        </div>

        <div className="grid grid--col-4-mid-sm-last-sm">
          <div className="inputBox__form">
            <select
              className="inputBox__form--input"
              id="selectFeature"
              name="columnid"
              defaultValue=""
              onChange={handleDataChange}
              disabled={isColsLoading || isColsFetching || !data.TableName}
            >
              <option value="" disabled>
                انتخاب کنید
              </option>

              {featureCombo.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.columnTitle}
                </option>
              ))}
            </select>
            <label className="inputBox__form--label" htmlFor="selectFeature">
              خصوصیت
            </label>
          </div>

          <div className="inputBox__form">
            <select
              className="inputBox__form--input"
              value={data.operator}
              onChange={handleDataChange}
              id="operator"
              name="operator"
            >
              <option value="=">=</option>
              <option value="<">&gt;</option>
              <option value=">">&lt;</option>
              <option value="<=">&#8805;</option>
              <option value=">=">&#8804;</option>
              <option value="like">like</option>
            </select>
          </div>

          {data.columnid && !isLookup && (
            <div className="inputBox__form">
              <input
                type="text"
                className="inputBox__form--input"
                id="condition"
                name="condition"
                onChange={handleDataChange}
                required
              />

              <label className="inputBox__form--label" htmlFor="condition">
                شرط
              </label>
            </div>
          )}

          {data.columnid && isLookup && (
            <div className="inputBox__form">
              <select
                className="inputBox__form--input"
                defaultValue=""
                id="selectCondition"
                name="condition"
                onChange={handleDataChange}
                disabled={isLookupFetching || isLookupLoading}
              >
                <option value="" disabled>
                  انتخاب کنید
                </option>
                {conditionCombo.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>

              <label
                className="inputBox__form--label"
                htmlFor="selectCondition"
              >
                شرط
              </label>
            </div>
          )}

          <div>
            <Tooltip title="افزودن شرط">
              <span>
                <IconButton
                  color="success"
                  onClick={() =>
                    addConditionHandler(
                      data.columnid,
                      data.operator,
                      data.condition
                    )
                  }
                  disabled={
                    !data.TableName ||
                    !data.operator ||
                    !data.columnid ||
                    !data.condition
                  }
                >
                  <AddIcon />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="پاک کردن تمامی شروط">
              <span>
                <IconButton color="error" onClick={handleDeleteAllconditions}>
                  <RemoveIcon />
                </IconButton>
              </span>
            </Tooltip>
          </div>
        </div>

        <div className="grid grid--col-2-first-sm">
          <div className="grid grid--col-2">
            <Button
              dir="ltr"
              variant="contained"
              color="info"
              sx={{ fontFamily: "sahel" }}
            >
              <span>OR</span>
            </Button>
            <Button
              dir="ltr"
              variant="contained"
              color="info"
              onClick={handleAddAnd}
              sx={{ fontFamily: "sahel" }}
            >
              <span>AND</span>
            </Button>
            <Button
              dir="ltr"
              variant="contained"
              color="info"
              sx={{ fontFamily: "sahel" }}
            >
              <span>(</span>
            </Button>
            <Button
              dir="ltr"
              variant="contained"
              color="info"
              sx={{ fontFamily: "sahel" }}
            >
              <span>)</span>
            </Button>
            <Button
              dir="ltr"
              variant="contained"
              color="info"
              sx={{ fontFamily: "sahel" }}
            >
              <span>Null</span>
            </Button>
            <Button
              dir="ltr"
              variant="contained"
              color="info"
              sx={{ fontFamily: "sahel" }}
            >
              <span>%</span>
            </Button>
          </div>
          <div className="condition__box row-span-3">
            <h4 className="condition__box--title">شروط انتخاب شده:</h4>
            <p>{conditionText}</p>
          </div>
        </div>
      </form>
    </section>
  );

  return content;
}

export default ReportGeneratorTableForm;
