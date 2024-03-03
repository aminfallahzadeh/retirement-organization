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
import { useMemo, useState } from "react";

function GridTemplate({ data, cols }) {
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(() => {
    // the static "number" column
    const numberColumn = {
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
      Cell: ({ renderedCellValue }) => (
        <strong>{convertToPersianNumber(renderedCellValue)}</strong>
      ),
      align: "right",
    };

    const dynamicColumns = cols.map((col) => ({
      accessorKey: col.accessorKey,
      header: col.header,
      size: col.size || 100,
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
    }));

    return [...dynamicColumns, numberColumn];
  }, [cols]);

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

  return <MaterialReactTable table={table} />;
}

export default GridTemplate;
