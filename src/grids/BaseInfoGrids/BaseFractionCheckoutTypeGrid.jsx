// react imports
import { useMemo, useState } from "react";

// mui imports
import { IconButton, PaginationItem } from "@mui/material";
import {
  EditOutlined as EditIcon,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// utils imports
import { defaultTableOptions } from "../../utils.js";

// helpers
import { convertToPersianNumber } from "../../helper.js";

const data = [];

function BaseFractionCheckoutTypeGrid() {
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "fractionCheckoutTypeRow",
        header: "ردیف",
        size: 20,
      },
      {
        accessorKey: "fractionCheckoutTypeID",
        header: "شناسه",
        size: 20,
      },
      {
        accessorKey: "fractionCheckoutType",
        header: "نحوه تسویه کسور",
        size: 20,
      },
      {
        accessorKey: "fractionMoveTypeMustLetter",
        header: "الزام نامه",
        size: 20,
      },
      {
        accessorKey: "fractionCheckoutTypeMustDoc",
        header: "الزام سند",
        size: 20,
      },
      {
        accessorKey: "fractionCheckoutTypeMustAccount",
        header: "الزام حساب",
        size: 20,
      },
      {
        accessorKey: "editFractionCheckoutType",
        header: "ویرایش",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <IconButton color="success" sx={{ padding: "0" }}>
            <EditIcon />
          </IconButton>
        ),
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

export default BaseFractionCheckoutTypeGrid;
