// react imports
import { useMemo, useState, useEffect } from "react";

// helpers
import { convertToPersianNumber } from "../helper.js";

// redux imports
import { useSelector } from "react-redux";
import { useGetItemsQuery } from "../slices/usersApiSlice";

// library imports
import Skeleton from "react-loading-skeleton";
import { MRT_Localization_FA } from "material-react-table/locales/fa";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  getMRT_RowSelectionHandler,
  useMaterialReactTable,
} from "material-react-table";

function ItemsGrid() {
  const [itemsData, setItemsData] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { data: items, isLoading, isSuccess } = useGetItemsQuery(token);

  useEffect(() => {
    // clear the list for refresh
    setItemsData([]);
    if (isSuccess) {
      items.itemList.map((item, i) => {
        setItemsData((prev) => [
          ...prev,
          {
            _id: item.id,
            name: item.itemName,
            number: convertToPersianNumber(i + 1),
          },
        ]);
      });
    }
  }, [items, isSuccess]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام گروه",
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "right",
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
        align: "right",
      },
      {
        accessorKey: "number",
        header: "ردیف",
        size: 100,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "right",
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
        align: "right",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: itemsData,
    localization: MRT_Localization_FA,
    columnResizeDirection: "rtl",
    paginationDisplayMode: "pages",
    enableFullScreenToggle: false,
    initialState: { pagination: { pageSize: 5 } },
    muiPaginationProps: {
      color: "success",
      shape: "rounded",
      rowsPerPageOptions: [5, 10, 20],
      variant: "outlined",
    },
    enableRowSelection: true,
    enableMultiRowSelection: false,
    muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
      onClick: (event) =>
        getMRT_RowSelectionHandler({ row, staticRowIndex, table })(event),
      sx: { cursor: "pointer" },
    }),
  });

  return (
    <>
      {isLoading ? (
        <p className="skeleton">
          <Skeleton count={3} />
        </p>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </>
  );
}

export default ItemsGrid;
