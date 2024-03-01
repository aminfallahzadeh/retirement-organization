// react imports
import { useMemo, useState, useEffect } from "react";

// helpers
import { convertToPersianNumber } from "../helper.js";

// redux imports
import { useSelector } from "react-redux";
import { useGetItemsQuery } from "../slices/usersApiSlice";

// library imports
import { PaginationItem, Pagination } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import { MRT_Localization_FA } from "material-react-table/locales/fa";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  getMRT_RowSelectionHandler,
  useMaterialReactTable,
} from "material-react-table";

function ItemsGrid() {
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsData, setItemsData] = useState([]);
  const [tableItems, setTableItems] = useState([]);

  const { token } = useSelector((state) => state.auth);
  const { data: items, isLoading, isSuccess } = useGetItemsQuery(token);

  const rowsPerPage = 5;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex =
    Math.min(startIndex + rowsPerPage, items?.itemList?.length) || 0;

  const handlePageChagne = (event, page) => {
    setcurrentPage(page);
    setTableItems(itemsData.slice(startIndex, endIndex));
  };

  useEffect(() => {
    if (isSuccess) {
      const data = items.itemList.map((item, i) => ({
        _id: item.id,
        name: item.itemName,
        number: convertToPersianNumber(i + 1),
      }));

      setItemsData(data);
      setTableItems(data.slice(startIndex, endIndex));
    }

    return () => {
      // Clear the list for refresh
      setItemsData([]);
    };
  }, [items, isSuccess, startIndex, endIndex]);

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
    data: tableItems,
    localization: MRT_Localization_FA,
    columnResizeDirection: "rtl",
    enableFullScreenToggle: false,
    initialState: { pagination: { pageSize: 5 } },
    muiPaginationProps: {
      color: "secondary",
      shape: "rounded",
      showRowsPerPage: false,
      variant: "outlined",
    },

    renderBottomToolbar: (
      <Pagination
        sx={{ paddingTop: 1.5, paddingBottom: 1.5, justifyContent: "right" }}
        count={Math.ceil(itemsData.length / 5)}
        page={currentPage}
        dir="rtl"
        variant="outlined"
        color="secondary"
        onChange={handlePageChagne}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            slots={{ previous: ChevronRight, next: ChevronLeft }}
            page={convertToPersianNumber(item.page)}
          />
        )}
      />
    ),
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
