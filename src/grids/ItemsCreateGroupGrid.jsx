// react imports
import { useMemo, useState, useEffect } from "react";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetItemsQuery } from "../slices/usersApiSlice";
import { setItemsTableData } from "../slices/itemsDataSlice";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// mui imports
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  getMRT_RowSelectionHandler,
} from "material-react-table";
import { faIR } from "@mui/material/locale";

// utils imports
import { defaultTableOptions } from "../utils.js";

function ItemsCreateGroupGrid({ setAddedItems }) {
  const theme = useTheme();
  const [rowSelection, setRowSelection] = useState({});

  const dispatch = useDispatch();

  // access the data from redux store
  const { itemsTableData } = useSelector((state) => state.itemsData);

  const {
    data: items,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
    error,
  } = useGetItemsQuery();

  // fetch data
  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = items.itemList.map((item) => ({
        id: item.id,
        name: item.itemName,
      }));
      dispatch(setItemsTableData(data));
    }

    return () => {
      dispatch(setItemsTableData([]));
    };
  }, [items, isSuccess, dispatch, refetch]);

  // hadnle error
  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام دسترسی",
        size: 20,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: itemsTableData,
    enableRowSelection: true,
    enablePagination: false,
    enableBottomToolbar: false,
    muiTableContainerProps: { sx: { height: "500px" } },
    muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
      onClick: (event) =>
        getMRT_RowSelectionHandler({ row, staticRowIndex, table })(event),
      sx: { cursor: "pointer" },
    }),
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  useEffect(() => {
    console.log(rowSelection);
  }, [rowSelection]);

  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows;
    setAddedItems(selectedRows.map((row) => row.original));
  }, [table, rowSelection, setAddedItems]);

  const content = (
    <>
      {isLoading || isFetching ? (
        <div className="skeleton-lg">
          <Skeleton
            count={7}
            baseColor="#dfdfdf"
            highlightColor="#9f9f9f"
            duration={1}
            direction="rtl"
          />
        </div>
      ) : (
        <ThemeProvider
          theme={createTheme({ ...theme, direction: "rtl" }, faIR)}
        >
          <div style={{ direction: "rtl" }} className="u-margin-bottom-md">
            <MaterialReactTable table={table} />
          </div>
        </ThemeProvider>
      )}
    </>
  );

  return content;
}

export default ItemsCreateGroupGrid;
