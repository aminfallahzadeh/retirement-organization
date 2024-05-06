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
import { IconButton } from "@mui/material";
import {
  RemoveRedEye as RemoveRedEyeIcon,
  Feed as FeedIcon,
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
    error,
    refetch,
  } = useGetRequestQuery({ role: selectedRole });

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = requests.itemList.map((item) => ({
        id: item.requestID,
        requestNO: item.requestNO || "-",
        personID: item.personID,
        requestTypeNameFa: item.requestTypeNameFa,
        sender: item.requestFrom || "-",
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
      },
      {
        accessorKey: "requestTypeNameFa",
        header: "نوع درخواست",
      },
      {
        accessorKey: "sender",
        header: "ارسال کننده",
      },
      {
        accessorKey: "date",
        header: "تاریخ درخواست",
        Cell: ({ renderedCellValue }) => (
          <div>
            {convertToPersianNumber(
              convertToPersianDateFormatted(renderedCellValue)
            )}
          </div>
        ),
      },
      {
        accessorKey: "senderInfo",
        header: "درخواست کننده",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Link
            to={`/retirement-organization/retired?personID=${row.original.personID}&role=${selectedRole}`}
          >
            <IconButton color="primary">
              <FeedIcon />
            </IconButton>
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
          <Link to={`/retirement-organization/request?id=${row.id}`}>
            <IconButton color="primary">
              <RemoveRedEyeIcon />
            </IconButton>
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
