// react imports
import { useMemo, useState } from "react";

// mui imports
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";

// library imports
import "react-loading-skeleton/dist/skeleton.css";

// utils imports
import { defaultTableOptions } from "../utils.js";

// helpers
import { convertToPersianNumber, separateByThousands } from "../helper.js";

function PersonnelStatementViewGrid({ data }) {
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "personnelStatementItemRowNum",
        header: "ردیف",
        size: 20,
        enableSorting: false,
        enableColumnActions: false,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "personnelStatementItemDesc",
        header: "شرح آیتم",
        size: 20,
      },

      {
        accessorKey: "personnelStatementItemAmount",
        header: "مبلغ",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>
            {separateByThousands(convertToPersianNumber(renderedCellValue))}
          </div>
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
    muiTableContainerProps: { sx: { height: "300px" } },
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
    initialState: {
      density: "compact",
      pagination: {
        pageSize: 3,
      },
    },
  });

  const content = <MaterialReactTable table={table} />;

  return content;
}

export default PersonnelStatementViewGrid;
