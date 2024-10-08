// REACT IMPORTS
import { useMemo, useState } from "react";

// REDUX
import { useSelector } from "react-redux";

// MUI
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

// HELPERS
import { convertToPersianNumber } from "../helper.js";

// UTILS
import { defaultTableOptions } from "../utils.js";

function CompareSalaryReportGrid() {
  // TRABLE STATES
  const [rowSelection, setRowSelection] = useState({});

  const { payCompareTableData } = useSelector((state) => state.payCompareData);

  const columns = useMemo(
    () => [
      {
        accessorKey: "compareRowNum",
        header: "ردیف",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
      },
      {
        accessorKey: "payNationalCode",
        header: "شماره ملی",
        size: 20,
      },
      {
        accessorKey: "payPersonID",
        header: "شماره کارمندی",
        size: 20,
      },
      {
        accessorKey: "payFirstName",
        header: "نام",
        size: 20,
      },
      {
        accessorKey: "payLastName",
        header: "نام خانوادگی",
        size: 20,
      },
      {
        accessorKey: "payCurrentMonth",
        header: "ماه جاری",
        size: 20,
      },
      {
        accessorKey: "payLastMonth",
        header: "ماه قیل",
        size: 20,
      },
      {
        accessorKey: "payDiff",
        header: "تفاوت",
        size: 20,
      },
      {
        accessorKey: "payStatus",
        header: "وضعیت",
        size: 20,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: payCompareTableData,
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
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  const content = <MaterialReactTable table={table} />;

  return content;
}

export default CompareSalaryReportGrid;
