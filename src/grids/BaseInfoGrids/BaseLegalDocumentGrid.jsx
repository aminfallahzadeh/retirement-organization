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

function BaseLegalDocumentGrid() {
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "legalDocRow",
        header: "ردیف",
        size: 20,
      },
      {
        accessorKey: "legalDocID",
        header: "شناسه",
        size: 20,
      },
      {
        accessorKey: "legalDocName",
        header: "نام مستند  ",
        size: 20,
      },
      {
        accessorKey: "legalDocIsDefault",
        header: "پیش فرض",
        size: 20,
      },
      {
        accessorKey: "legalDocIsActive",
        header: "فعال",
        size: 20,
      },
      {
        accessorKey: "legalDocIsRetirement",
        header: "بازنشستگی",
        size: 20,
      },
      {
        accessorKey: "legalDocIsWelfare",
        header: "رفاهی",
        size: 20,
      },
      {
        accessorKey: "legalDocIsFractionMove",
        header: "انتفال کسور",
        size: 20,
      },
      {
        accessorKey: "editLegalDoc",
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

export default BaseLegalDocumentGrid;
