// react import
import { useState, useEffect, useCallback } from "react";

// redux import
import {
  useGetTablesQuery,
  useLazyGetColsQuery,
  useLazyGetLookupValueQuery,
} from "../slices/reportGeneratorsApiSlice";

// helpers
import { findById } from "../helper";

function ReportGeneratorTableForm() {
  // MAIN STATE
  const [data, setData] = useState({});

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

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (data.columnid) {
      const columnData = findById(featureCombo, data.columnid);
      if (columnData) {
        setIsLookup(columnData.isLookup === 0 ? false : true);
      }
    }
  }, [data, featureCombo]);

  const content = (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-4">
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
        <div></div>
        <div></div>
        <div></div>

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
            id="operator"
            defaultValue=""
            name="operator"
          >
            <option value="" disabled>
              انتخاب کنید
            </option>
            <option value="=">=</option>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value=">=">&#8805;</option>
            <option value="<=">&#8804;</option>
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
              name="sleectCondition"
              onChange={handleDataChange}
            >
              <option value="">انتخاب کنید</option>
            </select>

            {conditionCombo.map((item) => (
              <option value={item.id} key={item.id}>
                {item.lookupValue}
              </option>
            ))}

            <label className="inputBox__form--label" htmlFor="selectCondition">
              شرط
            </label>
          </div>
        )}
      </form>
    </section>
  );

  return content;
}

export default ReportGeneratorTableForm;
