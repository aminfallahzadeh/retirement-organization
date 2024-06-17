// react imports
import { useMemo, useEffect, useState } from "react";

// rrd imports
import { Link } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";
import { useGetRequestQuery } from "../slices/requestApiSlice";
// components
import RoleSelectionForm from "../forms/RoleSelectionForm";

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
  VisibilityOutlined as EyeIcon,
  TextSnippetOutlined as CheckIcon,
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
  convertToPersianDateFormatted,
  convertToPersianNumber,
} from "../helper.js";

function RequestsGrid({ isLoading, roles }) {
  const [rowSelection, setRowSelection] = useState({});
  const [requestTableData, setRequestTableData] = useState([]);

  const { selectedRole } = useSelector((state) => state.roleData);

  const {
    data: requests,
    isSuccess,
    isLoading: isRequestsLoading,
    isFetching: isRequestsFetching,
    error,
    refetch,
  } = useGetRequestQuery({ Role: selectedRole });

  const handleRefresh = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = requests.itemList.map((item) => ({
        id: item.requestID,
        requestNO: item.requestNO || "-",
        requestTypeID: item.requestTypeID,
        personID: item.personID,
        requestTypeNameFa: item.requestTypeNameFa,
        personName: item.personName || "-",
        date: item.requestDate,
        body: item.requestText,
      }));

      setRequestTableData(data);
      sessionStorage.setItem("requests", JSON.stringify(data));
    }
  }, [requests, isSuccess, refetch]);

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
        accessorKey: "requestNO",
        header: "شماره درخواست",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "requestTypeNameFa",
        header: "نوع درخواست",
        size: 20,
      },
      {
        accessorKey: "personName",
        header: "ارسال کننده",
        size: 20,
      },
      {
        accessorKey: "date",
        header: "تاریخ درخواست",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianDateFormatted(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "senderInfo",
        header: "بررسی درخواست",
        enableSorting: false,
        enableColumnActions: false,
        muiTableBodyCellProps: {
          align: "center",
        },
        size: 20,
        Cell: ({ row }) => (
          <Tooltip title={row.original.requestTypeNameFa}>
            <Link
              to={
                row.original.requestTypeID ===
                "62A54585-F331-434A-9027-C9F3060F683A"
                  ? `/retirement-organization/slips?requestID=${row.original.id}`
                  : row.original.requestTypeID ===
                    "6E7BA26E-A1DC-4A5E-9700-17820A36158D"
                  ? "/retirement-organization/batch-statements"
                  : `/retirement-organization/retired?personID=${row.original.personID}&Role=${selectedRole}&requestID=${row.original.id}`
              }
            >
              <span>
                <IconButton color="success" sx={{ padding: "0" }}>
                  <CheckIcon color="success" />
                </IconButton>
              </span>
            </Link>
          </Tooltip>
        ),
      },
      {
        accessorKey: "observe",
        header: "مشاهده درخواست",
        enableSorting: false,
        enableColumnActions: false,
        muiTableBodyCellProps: {
          align: "center",
        },
        size: 20,
        Cell: ({ row }) => (
          <Tooltip title={convertToPersianNumber(row.original.requestNO)}>
            <Link
              to={`/retirement-organization/request?requestID=${row.id}&Role=${selectedRole}&type=${row.original.requestTypeID}`}
            >
              <span>
                <IconButton sx={{ padding: "0" }} color="info">
                  <EyeIcon color="info" />
                </IconButton>
              </span>
            </Link>
          </Tooltip>
        ),
      },
    ],
    [selectedRole]
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: requestTableData,
    renderTopToolbarCustomActions: () => (
      <Box
        sx={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {isRequestsFetching ? (
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

        <RoleSelectionForm isLoading={isLoading} roles={roles} />
      </Box>
    ),
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

  const content = (
    <>
      {isRequestsLoading || isRequestsFetching ? (
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

export default RequestsGrid;
