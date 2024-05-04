// react imports
import { useMemo, useState } from "react";

// mui imports
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

// helper imports
import { convertToPersianNumber } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

const data = [
  {
    tariffYear: "۲",
    tariffType: "تست",
    chestName: "تست",
    organization: "تست",
    farv: "+",
    ordib: "-",
    khord: "-",
    tir: "+",
    mordad: "+",
    shah: "-",
    mehr: "-",
    aban: "+",
    azar: "-",
    dey: "-",
    bahman: "-",
    esfand: "+",
  },
  {
    tariffYear: "۲",
    tariffType: "تست",
    chestName: "تست",
    organization: "تست",
    farv: "+",
    ordib: "-",
    khord: "-",
    tir: "+",
    mordad: "+",
    shah: "-",
    mehr: "-",
    aban: "+",
    azar: "-",
    dey: "-",
    bahman: "-",
    esfand: "+",
  },
  {
    tariffYear: "۲",
    tariffType: "تست",
    chestName: "تست",
    organization: "تست",
    farv: "+",
    ordib: "-",
    khord: "-",
    tir: "+",
    mordad: "+",
    shah: "-",
    mehr: "-",
    aban: "+",
    azar: "-",
    dey: "-",
    bahman: "-",
    esfand: "+",
  },
  {
    tariffYear: "۲",
    tariffType: "تست",
    chestName: "تست",
    organization: "تست",
    farv: "+",
    ordib: "-",
    khord: "-",
    tir: "+",
    mordad: "+",
    shah: "-",
    mehr: "-",
    aban: "+",
    azar: "-",
    dey: "-",
    bahman: "-",
    esfand: "+",
  },
  {
    tariffYear: "۲",
    tariffType: "تست",
    chestName: "تست",
    organization: "تست",
    farv: "+",
    ordib: "-",
    khord: "-",
    tir: "+",
    mordad: "+",
    shah: "-",
    mehr: "-",
    aban: "+",
    azar: "-",
    dey: "-",
    bahman: "-",
    esfand: "+",
  },
];

export const PersonnelFractionGrid = () => {
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "tariffYear",
        header: "سال",
      },
      {
        accessorKey: "tariffType",
        header: "نوع سابقه",
      },
      {
        accessorKey: "chestName",
        header: "نام صندوق",
      },
      {
        accessorKey: "organization",
        header: "سازمان",
      },
      {
        accessorKey: "farv",
        header: "فروردین",
      },
      {
        accessorKey: "ordib",
        header: "اردیبهشت",
      },
      {
        accessorKey: "khord",
        header: "خرداد",
      },
      {
        accessorKey: "tir",
        header: "تیر",
      },
      {
        accessorKey: "mordad",
        header: "مرداد",
      },
      {
        accessorKey: "shah",
        header: "شهریور",
      },
      {
        accessorKey: "mehr",
        header: "مهر",
      },
      {
        accessorKey: "aban",
        header: "آبان",
      },
      {
        accessorKey: "azar",
        header: "آذر",
      },
      {
        accessorKey: "dey",
        header: "دی",
      },
      {
        accessorKey: "bahman",
        header: "بهمن",
      },
      {
        accessorKey: "esfand",
        header: "اسفند",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data,
    muiTableHeadCellProps: {
      sx: {
        color: "#001a57",
        fontFamily: "sahel",
        backgroundColor: "rgba(0, 78, 152, .4)",
        borderRight: "1px solid #cfcfcf",
        fontWeight: "600",
      },
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
    muiPaginationProps: {
      color: "primary",
      variant: "outlined",
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
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  const content = <MaterialReactTable table={table} />;

  return content;
};

export default PersonnelFractionGrid;
