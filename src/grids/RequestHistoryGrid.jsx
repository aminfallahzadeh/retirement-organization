// react imports
import { useMemo, useEffect, useState } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useGetRequestHistoryQuery } from "../slices/requestApiSlice.js";

// mui imports
import {
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
  PaginationItem,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// utils imports
import { defaultTableOptions } from "../utils.js";

// helpers
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
} from "../helper.js";

function RequestHistoryGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const [historyTableData, setHistoryTableData] = useState([]);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const requestID = searchParams.get("requestID");

  const {
    data: histories,
    isLoading,
    isSuccess,
    isFetching,
    error,
    refetch,
  } = useGetRequestHistoryQuery(requestID);

  const handleRefresh = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = histories.itemList.map((item, index) => ({
        historyRowNum: index + 1,
        historyUser: item.firstName + " " + item.lastName || "-",
        roleName: item.roleName || "-",
        historyDate: item.date || "-",
        historyDesc: item.description || "-",
        historyStateName: item.stateName || "-",
        historyCondition: item.accept || "-",
      }));

      setHistoryTableData(data);
    }
  }, [isSuccess, refetch, histories]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "historyRowNum",
        header: "ردیف",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "historyUser",
        header: "کاربر",
        size: 20,
      },
      {
        accessorKey: "roleName",
        header: "نقش",
        size: 20,
      },
      {
        accessorKey: "historyDate",
        header: "تاریخ",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianDateFormatted(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "historyDesc",
        header: "شرح",
        size: 20,
      },
      {
        accessorKey: "historyStateName",
        header: "مرحله",
        size: 20,
      },
      {
        accessorKey: "historyCondition",
        header: "وضعیت",
        size: 20,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: historyTableData,
    renderTopToolbarCustomActions: () => (
      <Box>
        {isFetching ? (
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

  const content = (
    <>
      {isLoading ? (
        <div className="skeleton-lg">
          <Skeleton
            count={5}
            baseColor="#dfdfdf"
            highlightColor="#9f9f9f"
            duration={1}
            direction="rtl"
          />
        </div>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </>
  );

  return content;
}

export default RequestHistoryGrid;
