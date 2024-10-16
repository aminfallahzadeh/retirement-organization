// REDUX
import { useLazyGetFinancialItemsQuery } from "../slices/financialItemApiSlice";
import { useDispatch } from "react-redux";
import {
  setFinancialTableData,
  setPayPersonID,
  setCanAddNewItem,
} from "../slices/financialDataSlice.js";

function useGetFinancialItems() {
  const dispatch = useDispatch();

  // ACCESS QUERIES
  const [getItems, { isLoading, isFetching }] = useLazyGetFinancialItemsQuery();

  const getFinancialItems = async (personID) => {
    try {
      const res = await getItems(personID).unwrap();
      const mappedData = res.itemList.map((item, index) => ({
        id: item.financialItemID,
        personID: item.personID,
        financialItemRowNum: index + 1,
        payItemTypeID: item.payItemTypeID || "-",
        payItemTypeName: item.payItemTypeName || "-",
      }));
      dispatch(setFinancialTableData(mappedData));
      dispatch(setPayPersonID(personID));
      dispatch(setCanAddNewItem(true));
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
