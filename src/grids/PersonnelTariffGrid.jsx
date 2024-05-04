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
    rowNum: "1",
    personnelWorkType: "تست",
    personnelYear: "۳",
    personnelMonth: "۱۵",
    personnelDay: "۳۶۵",
    reaclTotal: "۱۰۰۰",
    total: "۱۰۰۰",
  },
];

function PersonnelTariffGrid() {
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "rowNum",
        header: "ردیف",
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "personnelWorkType",
        header: "نوع خدمت",
      },
      {
        accessorKey: "personnelYear",
        header: "سال",
      },
      {
        accessorKey: "personnelMonth",
        header: "ماه",
      },
      {
        accessorKey: "personnelDay",
        header: "روز",
      },
      {
        accessorKey: "reaclTotal",
        header: "جمع واقعی",
      },
      {
        accessorKey: "total",
        header: "جمع",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data,
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
      color: "success",
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
}

export default PersonnelTariffGrid;
