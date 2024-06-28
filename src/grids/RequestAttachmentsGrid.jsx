// react imports
import { useMemo, useEffect, useState } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useGetRequestAttachmentQuery } from "../slices/requestApiSlice.js";

// components
import Modal from "../components/Modal";
import RequestAttachmentForm from "../forms/requestAttachmentForm.jsx";

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
  VisibilityOutlined as EyeIcon,
  DeleteOutline as DeleteIcon,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  Add as AddIcon,
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
import { convertToPersianNumber } from "../helper.js";

function RequestAttachmentsGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const [attachmentsTableData, setAttachmentsTableData] = useState([]);

  const [showInsertAttachmentModal, setShowInsertAttachmentModal] =
    useState(false);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const requestID = searchParams.get("requestID");

  const {
    data: attachments,
    isLoading,
    isSuccess,
    isFetching,
    error,
    refetch,
  } = useGetRequestAttachmentQuery(requestID);

  const handleRefresh = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = attachments.itemList.map((item, index) => ({
        attachmentsRowNum: index + 1,
        attachmentDesc: item.attachementDesc || "-",
        attachmentName: item.attachmentName || "-",
      }));
      setAttachmentsTableData(data);
    }
  }, [isSuccess, refetch, attachments, showInsertAttachmentModal]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  // CHANGE HANDLERS
  const handleShowInsertAttachmentModalChange = () => {
    setShowInsertAttachmentModal(true);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "attachmentsRowNum",
        header: "ردیف",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "attachmentName",
        header: "نام پیوست",
        size: 20,
      },
      {
        accessorKey: "attachmentDesc",
        header: "توضیحات",
        size: 20,
      },
      {
        accessorKey: "deleteAttachment",
        header: "حذف پیوست",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <Tooltip>
            <IconButton color="error" sx={{ padding: "0" }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ),
      },
      {
        accessorKey: "observeAttachment",
        header: "مشاهده پیوست",
        enableSorting: false,
        enableColumnActions: false,
        muiTableBodyCellProps: {
          align: "center",
        },
        size: 20,
        Cell: () => (
          <Tooltip>
            <span>
              <IconButton sx={{ padding: "0" }} color="info">
                <EyeIcon color="info" />
              </IconButton>
            </span>
          </Tooltip>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: attachmentsTableData,
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
        {isFetching ? (
          <IconButton aria-label="refresh" color="info" disabled>
            <CircularProgress size={20} value={100} color={"success"} />
          </IconButton>
        ) : (
          <Tooltip title="افزودن پیوست">
            <span>
              <IconButton
                aria-label="refresh"
                color="success"
                onClick={handleShowInsertAttachmentModalChange}
              >
                <AddIcon fontSize="small" />
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
        <>
          {showInsertAttachmentModal && (
            <Modal
              title="افزودن پیوست"
              closeModal={() => setShowInsertAttachmentModal(false)}
            >
              <RequestAttachmentForm
                setShowInsertAttachmentModal={setShowInsertAttachmentModal}
              />
            </Modal>
          )}
          <MaterialReactTable table={table} />
        </>
      )}
    </>
  );

  return content;
}

export default RequestAttachmentsGrid;
