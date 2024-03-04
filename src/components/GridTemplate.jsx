// library imports
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import { MRT_Localization_FA } from "material-react-table/locales/fa";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  getMRT_RowSelectionHandler,
  useMaterialReactTable,
} from "material-react-table";

// helpers
import { convertToPersianNumber } from "../helper.js";

// react imports
import { useMemo, useState, useEffect } from "react";

function GridTemplate({ columns, data }) {
  const [rowSelection, setRowSelection] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //   const columns = useMemo(() => {
  //     // the static "number" column
  //     const numberColumn = {
  //       accessorKey: "number",
  //       header: "ردیف",
  //       size: 100,
  //       muiTableHeadCellProps: {
  //         sx: { color: "green", fontFamily: "sahel" },
  //         align: "right",
  //       },
  //       muiTableBodyCellProps: {
  //         sx: { fontFamily: "sahel" },
  //         align: "right",
  //       },
  //       Cell: ({ renderedCellValue }) => (
  //         <strong>{convertToPersianNumber(renderedCellValue)}</strong>
  //       ),
  //       align: "right",
  //     };

  //     const dynamicColumns = cols.map((col) => ({
  //       accessorKey: col.accessorKey,
  //       header: col.header,
  //       size: col.size || 100,
  //       muiTableHeadCellProps: {
  //         sx: { color: "green", fontFamily: "sahel" },
  //         align: "right",
  //       },
  //       muiTableBodyCellProps: {
  //         sx: { fontFamily: "sahel" },
  //         align: "right",
  //       },
  //       Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  //       align: "right",
  //     }));

  //     return [...dynamicColumns, numberColumn];
  //   }, [cols]);

  const table = useMaterialReactTable({
    columns,
    data,
    localization: MRT_Localization_FA,
    muiPaginationProps: {
      color: "secondary",
      variant: "outlined",
      showRowsPerPage: false,
      dir: "rtl",
      renderItem: (item) => (
        <PaginationItem
          {...item}
          page={convertToPersianNumber(item.page)}
          slots={{
            previous: ChevronRight,
            next: ChevronLeft,
            first: LastPage,
            last: FirstPage,
          }}
        />
      ),
    },
    enablePagination: true,
    paginationDisplayMode: "pages",
    columnResizeDirection: "rtl",
    enableFullScreenToggle: false,
    positionToolbarAlertBanner: "none",
    initialState: { pagination: { pageSize: 5 } },
    enableRowSelection: true,
    enableMultiRowSelection: false,
    muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
      onClick: (event) =>
        getMRT_RowSelectionHandler({ row, staticRowIndex, table })(event),
      sx: { cursor: "pointer" },
    }),
    getRowId: (originalRow) => originalRow._id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  console.log("columns", columns);
  //   console.log("cols", cols);
  console.log("data", data);

  useEffect(() => {
    // Simulate data fetching delay
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Adjust the delay as needed
  }, []);

  //   console.log(table.getRowModel().rows);

  return isLoading ? <h1>Loading</h1> : <MaterialReactTable table={table} />;
}

export default GridTemplate;
