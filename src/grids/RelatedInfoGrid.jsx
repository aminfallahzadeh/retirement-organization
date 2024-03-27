// react imports
import { useMemo } from "react";

// helper imports
import { convertToPersianNumber } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// mui imports
import { Box, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

// library imports
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const data = [
  {
    code: "۰۱۲۳۴۵۶۷۸۹",
    name: "سعید علوی",
    date: "۱۴۰۲-۱۳-۱۳",
    relation: "همسر",
  },
  {
    code: "۰۱۲۳۴۵۶۷۸۹",
    name: "سعید علوی",
    date: "۱۴۰۲-۱۳-۱۳",
    relation: "همسر",
  },
  {
    code: "۰۱۲۳۴۵۶۷۸۹",
    name: "سعید علوی",
    date: "۱۴۰۲-۱۳-۱۳",
    relation: "همسر",
  },
];

function RelatedInfoGrid() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "code",
        header: "کد ملی",
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "right",
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "name",
        header: "نام و نام خانوادگی فرستنده",
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "right",
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "date",
        header: "تاریخ تولد",
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "right",
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "relation",
        header: "نسبت",
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "right",
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "actions",
        header: "عملیات",
        Cell: () => (
          <Box sx={{ display: "flex", gap: "8px" }}>
            <IconButton color="secondary">
              <EditIcon />
            </IconButton>
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data,
    muiPaginationProps: {
      color: "success",
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
  });

  const content = <MaterialReactTable table={table} />;

  return content;
}

export default RelatedInfoGrid;
