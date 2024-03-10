// react imports
import { useMemo } from "react";

// helper imports
import { convertToPersianNumber } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

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
    type: "درخواست بازنشستگی",
    date: "۱۴۰۲-۱۳-۱۳",
  },
  {
    code: "۰۱۲۳۴۵۶۷۸۹",
    name: "سعید علوی",
    type: "درخواست بازنشستگی",
    date: "۱۴۰۲-۱۳-۱۳",
  },
  {
    code: "۰۱۲۳۴۵۶۷۸۹",
    name: "سعید علوی",
    type: "درخواست بازنشستگی",
    date: "۱۴۰۲-۱۳-۱۳",
  },
];

function CartableGrid() {
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
        accessorKey: "type",
        header: "نوع درخواست",
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
        header: "تاریخ درخواست",
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

  const content = (
    <section className="CartableGrid">
      <h4 className="CartableGrid__title">کارتابل</h4>
      <MaterialReactTable table={table} />
    </section>
  );

  return content;
}

export default CartableGrid;
