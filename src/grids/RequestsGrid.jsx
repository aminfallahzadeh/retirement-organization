// react imports
import { useMemo, useEffect, useState } from "react";

// rrd imports
import { Link } from "react-router-dom";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetRequestQuery } from "../slices/requestApiSlice";
import { setRequestTableData } from "../slices/requestsDataSlice.js";
import { setSelectedRequestData } from "../slices/requestsDataSlice.js";

// mui imports
import { Box, IconButton, Tooltip, CircularProgress } from "@mui/material";
import {
  RemoveRedEye as RemoveRedEyeIcon,
  Feed as FeedIcon,
  Refresh as RefreshIcon,
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
  convertToPersianDateFormatted,
  convertToPersianNumber,
} from "../helper.js";

function RequestsGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const { selectedRole } = useSelector((state) => state.requestsData);

  const dispatch = useDispatch();

  const { requestTableData } = useSelector((state) => state.requestsData);

  const {
    data: requests,
    isSuccess,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetRequestQuery({ role: selectedRole });

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

      dispatch(setRequestTableData(data));
      sessionStorage.setItem("requests", JSON.stringify(data));
    }
    return () => {
      dispatch(setRequestTableData([]));
    };
  }, [requests, isSuccess, dispatch, refetch]);

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
        header: "رسیدگی",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Link
            to={
              row.original.requestTypeID ===
              "62A54585-F331-434A-9027-C9F3060F683A"
                ? `/retirement-organization/slips?requestID=${row.original.id}`
                : row.original.requestTypeID ===
                  "6E7BA26E-A1DC-4A5E-9700-17820A36158D"
                ? "/retirement-organization/batch-statements"
                : `/retirement-organization/retired?personID=${row.original.personID}&role=${selectedRole}&requestID=${row.original.id}`
            }
          >
            <Tooltip title={`رسیدگی به "${row.original.requestTypeNameFa}"`}>
              <span>
                <IconButton sx={{ padding: "0" }}>
                  <FeedIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Link>
        ),
      },
      {
        accessorKey: "observe",
        header: "مشاهده درخواست",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Link
            to={`/retirement-organization/request?id=${row.id}&role=${selectedRole}`}
          >
            <Tooltip
              title={`مشاهده درخواست "${convertToPersianNumber(
                row.original.requestNO
              )}"`}
            >
              <span>
                <IconButton color="primary" sx={{ padding: "0" }}>
                  <RemoveRedEyeIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Link>
        ),
      },
    ],
    [selectedRole]
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: requestTableData,
    enablePagination: false,
    enableBottomToolbar: false,
    muiTableContainerProps: { sx: { height: "500px" } },
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
    const selectedRequest = findById(requestTableData, id);

    if (id) {
      dispatch(setSelectedRequestData(selectedRequest));
    } else {
      dispatch(setSelectedRequestData([]));
    }
  }, [dispatch, table, rowSelection, requestTableData]);

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

export default RequestsGrid;
