// react imports
import { useMemo, useEffect, useState } from "react";

// rrd imports
import { Link, useLocation } from "react-router-dom";

// redux imports
import { useGetRequestQuery } from "../slices/requestApiSlice";

// mui imports
import {
  Box,
  CircularProgress,
  IconButton,
  PaginationItem,
  Tooltip,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  VisibilityOutlined as RemoveRedEyeIcon,
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

// hjelpers
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
} from "../helper.js";

function AllRequestsGrid() {
  const [rowSelection, setRowSelection] = useState({});

  const [requestTableData, setRequestTableData] = useState([]);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const Role = searchParams.get("Role");
  const personID = searchParams.get("personID");

  const {
    data: requests,
    isSuccess,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetRequestQuery({ Role, personID });

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = requests.itemList.map((item) => ({
        id: item.requestNO,
        type: item.requestTypeID,
        requestNO: item.requestNO || "-",
        personId: item.personID,
        requestTypeNameFa: item.requestTypeNameFa || "-",
        personName: item.personName || "-",
        date: item.requestDate || "-",
        body: item.requestText || "-",
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

  // HANDLERS
  const handleRefresh = () => {
    refetch();
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
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
          <div>
            {convertToPersianNumber(
              convertToPersianDateFormatted(renderedCellValue)
            )}
          </div>
        ),
      },
      {
        accessorKey: "observeReq",
        header: "مشاهده درخواست",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip title={convertToPersianNumber(row.original.requestNO)}>
            <Link
              to={`/retirement-organization/request?requestID=${row.id}&Role=${Role}&type=${row.original.type}`}
            >
              <IconButton color="primary" sx={{ padding: "0" }}>
                <RemoveRedEyeIcon />
              </IconButton>
            </Link>
          </Tooltip>
        ),
      },
    ],
    [Role]
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: requestTableData,
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
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  // useEffect(() => {
  //   const id = Object.keys(table.getState().rowSelection)[0];
  //   const selectedRequest = findById(allRequestTableData, id);

  //   if (id) {
  //     dispatch(setSelectedRequestAllRequests(selectedRequest));
  //   } else {
  //     dispatch(setSelectedRequestAllRequests([]));
  //   }
  // }, [dispatch, table, rowSelection, allRequestTableData]);

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

export default AllRequestsGrid;
