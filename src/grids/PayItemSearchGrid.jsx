// REACT IMPORTS
import { useMemo, useState } from "react";

// RRD
import { Link } from "react-router-dom";

// REDUX
import { useSelector } from "react-redux";

// MUI
import { IconButton, Tooltip, PaginationItem } from "@mui/material";
import {
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// HELPS
import { convertToPersianNumber } from "../helper.js";

// UTILS
import { defaultTableOptions } from "../utils.js";

function PayItemSearchGrid() {
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "payItemRowNum",
        header: "ردیف",
        size: 20,
        enableSorting: false,
        enableColumnActions: false,
        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "payItemKey",
        header: "شناسه آیتم",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "payItemName",
        header: "نام آیتم",
        size: 20,
      },
      {
        accessorKey: "editPayItem",
        header: "ویرایش",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <Tooltip>
            <IconButton color="primary" sx={{ padding: "0" }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        ),
      },
      {
        accessorKey: "removePayItem",
        header: "حذف",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <Tooltip>
            <IconButton color="primary" sx={{ padding: "0" }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: [],
    muiPaginationProps: {
      size: "small",
      shape: "rounded",
      showRowsPerPage: false,
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
    muiTableBodyRowProps: ({ row }) => ({
      //implement row selection click events manually
      onClick: () =>
        setRowSelection(() => ({
          [row.id]: true,
        })),
      selected: rowSelection[row.id],
      sx: {
        cursor: "pointer",
      },
    }),
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  const content = <MaterialReactTable table={table} />;
  return content;
}

export default PayItemSearchGrid;
