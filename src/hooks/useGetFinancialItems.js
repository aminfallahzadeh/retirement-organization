// REDUX
import { useLazyGetFinancialItemsQuery } from "../slices/financialItemApiSlice";
import { useDispatch } from "react-redux";
import {
  setFinancialTableData,
  setPayPersonID,
} from "../slices/financialDataSlice.js";

// HELPS
import { convertToPersianNumber } from "../helper.js";

function useGetFinancialItems() {
  const dispatch = useDispatch();

  // ACCESS QUERIES
  const [getItems, { isLoading, isFetching }] = useLazyGetFinancialItemsQuery();

  const getFinancialItems = async (personID) => {
    try {
      const res = await getItems(personID).unwrap();
      console.log(res);
      const mappedData = res.itemList.map((item, index) => ({
        id: item.financialItemID,
        personID: item.personID,
        financialItemRowNum: convertToPersianNumber(index + 1),
        payItemTypeID: convertToPersianNumber(item.payItemTypeID) || "-",
        payItemTypeName: item.payItemTypeName || "-",
      }));
      dispatch(setFinancialTableData(mappedData));
      dispatch(setPayPersonID(personID));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getFinancialItems,
    isLoading,
    isFetching,
  };
}

export default useGetFinancialItems;
