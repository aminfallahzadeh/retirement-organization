// react imports
import { useMemo, useEffect, useState } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import {
  useGetRequestAttachmentQuery,
  useDeleteRequestAttachmentMutation,
} from "../slices/requestApiSlice.js";

// components
import Modal from "../components/Modal";
import RequestAttachmentForm from "../forms/RequestAttachmentForm.jsx";

// mui imports
import {
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
  PaginationItem,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  Refresh as RefreshIcon,
  VisibilityOutlined as EyeIcon,
  DeleteOutline as DeleteIcon,
  Close as CloseIcon,
  Done as DoneIcon,
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
import { RViewer, RViewerTrigger } from "react-viewerjs";

// utils imports
import { defaultTableOptions } from "../utils.js";

// helpers
import { convertToPersianNumber, findById } from "../helper.js";

function RequestAttachmentsGrid() {
  // CONTOLL STATESS
  const [showDeleteAttachmentModal, setShowDeleteAttachmentModal] =
    useState(false);

  // TABLE STATES
  const [rowSelection, setRowSelection] = useState({});
  const [attachmentsTableData, setAttachmentsTableData] = useState([]);

  // MAIN STATES
  const [attachmentID, setAttachmentID] = useState("");
  const [showInsertAttachmentModal, setShowInsertAttachmentModal] =
    useState(false);

  // IMAGE VIEWER OPTIONS
  const [previewImage, setPreviewImage] = useState(null);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const requestID = searchParams.get("requestID");

  const [deleteAttachment, { isLoading: isDeletingAttachment }] =
    useDeleteRequestAttachmentMutation();

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

  // IMAGE VIWER OPTIONS
  const options = useMemo(
    () => ({
      toolbar: {
        prev: false,
        next: false,
        play: false,
        stop: false,
      },
      title: (imageData) =>
        `(${imageData.naturalWidth} × ${imageData.naturalHeight})`,
      viewed() {
        this.viewer.scale(1.2);
      },
    }),
    []
  );

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = attachments?.itemList.map((item, index) => ({
        image: item.attachment,
        contentType: item.contentType,
        id: item.requestAttachmentID,
        attachmentsRowNum: index + 1,
        attachmentDesc: item.attachementDesc || "-",
        attachementTypeName: item.attachementTypeName || "-",
      }));
      setAttachmentsTableData(data);

      // SET A DEFAULT PREVIEW IMAGE
      if (attachments.itemList.length && attachments.itemList.length > 0) {
        const image = attachments.itemList[0].image;
        const contentType = attachments.itemList[0].contentType;

        const prefix = `data:${contentType};base64,`;

        setPreviewImage(`${prefix}${image}`);
      }
    }
  }, [isSuccess, refetch, attachments]);

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

  const handleShowDeleteAttachmentModalChange = () => {
    setShowDeleteAttachmentModal(true);
  };

  // HANLDE REMOVE ATTACHMENT
  const handleDeleteAttachment = async () => {
    try {
      const deleteRes = await deleteAttachment(attachmentID).unwrap();
      toast.success(deleteRes.message, {
        autoClose: 2000,
      });
      setShowDeleteAttachmentModal(false);
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
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
        accessorKey: "attachementTypeName",
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
        header: "حذف",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip title={`حذف "${row.original.attachementTypeName}"`}>
            <IconButton
              color="error"
              sx={{ padding: "0" }}
              onClick={handleShowDeleteAttachmentModalChange}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ),
      },
      {
        accessorKey: "observeAttachment",
        header: "مشاهده",
        enableSorting: false,
        enableColumnActions: false,
        muiTableBodyCellProps: {
          align: "center",
        },
        size: 20,
        Cell: ({ row }) => (
          <Tooltip title={`مشاهده "${row.original.attachementTypeName}"`}>
            <span>
              {previewImage ? (
                <RViewer options={options} imageUrls={previewImage}>
                  <RViewerTrigger>
                    <IconButton sx={{ padding: "0" }} color="info">
                      <EyeIcon color="info" />
                    </IconButton>
                  </RViewerTrigger>
                </RViewer>
              ) : (
                <IconButton sx={{ padding: "0" }} color="info" disabled>
                  <EyeIcon color="action" />
                </IconButton>
              )}
            </span>
          </Tooltip>
        ),
      },
    ],
    [options, previewImage]
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

  // SAVE ID ON ROW SELECTION
  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];

    if (id) {
      setAttachmentID(id);
      const selected = findById(attachmentsTableData, id);

      if (selected) {
        const image = selected.image;
        const contentType = selected.contentType;

        const prefix = `data:${contentType};base64,`;

        setPreviewImage(`${prefix}${image}`);
      }
    }
  }, [table, rowSelection, attachmentsTableData]);

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
                refetch={refetch}
              />
            </Modal>
          )}

          {showDeleteAttachmentModal && (
            <Modal
              title="حذف پیوست"
              closeModal={() => setShowDeleteAttachmentModal(false)}
            >
              <p className="paragraph-primary">
                آیا از حذف این پیوست اطمینان دارید؟
              </p>
              <div className="flex-row flex-center">
                <LoadingButton
                  dir="ltr"
                  endIcon={<DoneIcon />}
                  loading={isDeletingAttachment}
                  onClick={handleDeleteAttachment}
                  variant="contained"
                  color="success"
                  sx={{ fontFamily: "sahel" }}
                >
                  <span>بله</span>
                </LoadingButton>

                <Button
                  dir="ltr"
                  endIcon={<CloseIcon />}
                  disabled={isDeletingAttachment}
                  onClick={() => setShowDeleteAttachmentModal(false)}
                  variant="contained"
                  color="error"
                  sx={{ fontFamily: "sahel" }}
                >
                  <span>خیر</span>
                </Button>
              </div>
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
