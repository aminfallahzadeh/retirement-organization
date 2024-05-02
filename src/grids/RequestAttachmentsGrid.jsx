// react imports
import { useMemo, useState } from "react";

// mui imports
import { IconButton } from "@mui/material";
import {
  RemoveRedEye as RemoveRedEyeIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// utils imports
import { defaultTableOptions } from "../utils.js";

const data = [];

function RequestAttachmentsGrid() {
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "rowNum",
        header: "ردیف",
      },
      {
        accessorKey: "docName",
        header: "نام مدرک",
      },
      {
        accessorKey: "docDesc",
        header: "توضیحات",
      },
      {
        accessorKey: "senderInfoReq",
        header: "حذف",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <IconButton color="primary">
            <DeleteIcon />
          </IconButton>
        ),
      },
      {
        accessorKey: "observeReq",
        header: "مشاهده",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <IconButton color="primary">
            <RemoveRedEyeIcon />
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
    enablePagination: false,
    enableBottomToolbar: false,
    muiTableContainerProps: { sx: { height: "500px" } },
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

export default RequestAttachmentsGrid;
