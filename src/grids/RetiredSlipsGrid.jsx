// react imports
import { useMemo, useEffect, useState } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

import { useGetPayListQuery } from "../slices/payApiSlice";

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
  findById,
  convertToPersianNumber,
  convertToPersianDateFormatted,
  separateByThousands,
} from "../helper.js";

function RetiredSlipsGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const [slipsTableData, setSlipsTableData] = useState([]);
  const [selectedSlip, setSelectedSlip] = useState([]);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  const {
    data: slips,
    isLoading,
    isSuccess,
    isFetching,
    error,
    refetch,
  } = useGetPayListQuery({ personID, payType: "M" });

  const handleRefresh = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = slips.itemList.map((item, index) => ({
        id: item.payID,
        payRowNum: index + 1,
        payCreditAmount: item.payCreditAmount,
        payDebitAmount: item.payDebitAmount,
        payAmount: item.payAmount,
        payDate: item.payDate,
        currentYear: item.currentYear,
        currentMonth: item.currentMonth,
      }));

      setSlipsTableData(data);
    }
  }, [isSuccess, refetch, slips?.itemList]);

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
        accessorKey: "payRowNum",
        header: "ردیف",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "payCreditAmount",
        header: "مبلغ بستانکاری",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>
            {separateByThousands(convertToPersianNumber(renderedCellValue))}{" "}
            ریال
          </div>
        ),
      },
      {
        accessorKey: "payDebitAmount",
        header: "مبلغ بدهکاری",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>
            {separateByThousands(convertToPersianNumber(renderedCellValue))}{" "}
            ریال
          </div>
        ),
      },
      {
        accessorKey: "payAmount",
        header: "مبلغ کل",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>
            {separateByThousands(convertToPersianNumber(renderedCellValue))}{" "}
            ریال
          </div>
        ),
      },
      {
        accessorKey: "payDate",
        header: "تاریخ پرداخت",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianDateFormatted(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "currentYear",
        header: "سال مالی",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "currentMonth",
        header: "ماه مالی",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: slipsTableData,
    renderTopToolbarCustomActions: () => (
      <Box>
        {isFetching ? (
          <IconButton aria-label="refresh" color="info" disabled>
            <CircularProgress size={20} value={100} />
          </IconButton>
        ) : (
          <Tooltip
            title={
              <span
                style={{
                  fontFamily: "Vazir",
                  fontSize: "0.8rem",
                  fontWeight: "100",
                }}
              >
                بروز رسانی
              </span>
            }
          >
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

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];
    const selected = findById(slipsTableData, id);

    if (id) {
      setSelectedSlip(selected);
    } else {
      setSelectedSlip([]);
    }
  }, [table, rowSelection, slipsTableData]);

  const content = (
    <>
      {isLoading ? (
        <div className="skeleton-lg">
          <Skeleton
            count={7}
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

export default RetiredSlipsGrid;
