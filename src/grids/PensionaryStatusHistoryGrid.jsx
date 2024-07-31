// react imports
import { useMemo } from "react";

// mui imports
import {
  PaginationItem,
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// library imports
import "react-loading-skeleton/dist/skeleton.css";

// utils imports
import { defaultTableOptions } from "../utils.js";

// helpers
import {
  convertToPersianDateFormatted,
  convertToPersianNumber,
} from "../helper.js";

function PensionaryStatusHistoryGrid({
  statusHistoryTableData,
  isLoading,
  isFetching,
  handleRefresh,
}) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "pensionaryStatusRowNum",
        header: "ردیف",
        size: 20,
        enableSorting: false,
        enableColumnActions: false,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "pensionaryStatusName",
        header: "وضعیت",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "pensionaryStartdate",
        header: "تاریخ شروع",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianDateFormatted(renderedCellValue)}</div>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: statusHistoryTableData,
    muiTopToolbarProps: {
      sx: {
        overflow: "none",
      },
    },
    muiTableHeadProps: {
      sx: {
        zIndex: 0,
      },
    },
    renderTopToolbarCustomActions: () => (
      <Box>
        {isLoading || isFetching ? (
          <IconButton aria-label="refresh" color="info" disabled>
            <CircularProgress size={20} value={100} />
          </IconButton>
        ) : (
          <Tooltip title="بروز رسانی">
            <span>
              <IconButton
                aria-label="refresh"
                color="info"
                onClick={handleRefresh}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Box>
    ),
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

export default PensionaryStatusHistoryGrid;
