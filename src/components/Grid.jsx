// REACT IMPORTS
import { useState } from "react";

// MUI
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

// UTILS
import { defaultTableOptions } from "../utils.js";

// HELPERS
import { convertToPersianNumber } from "../helper.js";

function Grid({
  columns,
  data,
  topBarActions,
  bottomBarActions,
  scroll,
  props,
}) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data,
    renderTopToolbarCustomActions: () => topBarActions,
    renderBottomToolbarCustomActions: () => bottomBarActions,
    muiTopToolbarProps: topBarActions
      ? {
          sx: {
            overflow: "none",
          },
        }
      : null,
    muiTableHeadProps: topBarActions
      ? {
          sx: {
            zIndex: 0,
          },
        }
      : null,
    muiTableBodyRowProps: ({ row }) => ({
      // IMPLEMENT ROW SELECTION MANUALLY
      onClick: () =>
        setRowSelection(() => ({
          [row.id]: true,
        })),
      selected: rowSelection[row.id],
      sx: {
        cursor: "pointer",
      },
    }),
    enablePagination: scroll ? false : true,
    enableBottomToolbar: scroll ? false : true,
    muiTableContainerProps: scroll ? { sx: { height: "300px" } } : null,
    muiPaginationProps: !scroll
      ? {
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
        }
      : null,
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    ...props,
  });

  return <MaterialReactTable table={table} />;
}

export default Grid;
