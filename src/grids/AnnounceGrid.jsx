// react imports
import { useMemo, useState, useEffect } from "react";

// redux imports
import {
  useGetAnnounceQuery,
  useDeleteAnnounceMutation,
} from "../slices/announceApiSlice.js";

// mui imports
import { LoadingButton } from "@mui/lab";
import {
  PaginationItem,
  Tooltip,
  Box,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  Refresh as RefreshIcon,
  DeleteOutline as DeleteIcon,
  Close as CloseIcon,
  Done as DoneIcon,
} from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// library imports
import { toast } from "react-toastify";

// components
import Modal from "../components/Modal.jsx";

// helpers
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
} from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

function AnnounceGrid({ isRefresh }) {
  const [rowSelection, setRowSelection] = useState({});
  const [announceID, setAnnounceID] = useState(null);

  // MODAL STATE
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [data, setData] = useState([]);

  // ACCESS DELETE ANNOUNCE QUERY
  const [deleteAnnounce, { isLoading: isDeleting }] =
    useDeleteAnnounceMutation();

  // GET DATA
  const {
    data: announces,
    isSuccess: isGetAnnounceSuccess,
    isLoading: isGetAnnounceLoading,
    isFetching: isGetAnnounceFetching,
    error: getAnnounceError,
    refetch,
  } = useGetAnnounceQuery();

  // FETCH DATA
  useEffect(() => {
    refetch();
    if (isGetAnnounceSuccess) {
      const mappedData = announces.itemList.map((item, index) => ({
        id: item.announceID,
        announceRowNum: index + 1,
        announceTitle: item.title,
        announceDesc: item.description,
        announceRunDate: item.runDate,
      }));

      setData(mappedData);
    }
  }, [isGetAnnounceSuccess, refetch, announces, isRefresh]);

  // HADNLE ERROR
  useEffect(() => {
    if (getAnnounceError) {
      console.log(getAnnounceError);
    }
  }, [getAnnounceError]);

  // HANDLERS
  const handleRefresh = () => {
    refetch();
  };

  const hanldeShowDeleteModalChange = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteAnnounce = async () => {
    try {
      const deleteRes = await deleteAnnounce({
        announceID,
        isDeleted: true,
      }).unwrap();
      toast.success(deleteRes.message, {
        autoClose: 2000,
      });
      setShowDeleteModal(false);
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
        accessorKey: "announceRowNum",
        header: "ردیف",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "announceTitle",
        header: "عنوان اطلاعیه",
        size: 20,
      },
      {
        accessorKey: "announceDesc",
        header: "متن اطلاعیه",
        size: 20,
        Cell: ({ renderedCellValue, row }) => (
          <Tooltip
            title={
              <p style={{ fontFamily: "IranYekan" }}>
                {row.original.announceDesc}
              </p>
            }
          >
            <p
              style={{
                width: "80ch",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {renderedCellValue}
            </p>
          </Tooltip>
        ),
        muiTableBodyCellProps: {
          align: "right",
        },
      },
      {
        accessorKey: "announceRunDate",
        header: "تاریخ اجرا",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianDateFormatted(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "deleteAnnounce",
        header: "حذف",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <IconButton
            color="error"
            onClick={hanldeShowDeleteModalChange}
            sx={{ padding: "0" }}
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data,
    defaultColumn: {
      minSize: 5,
      maxSize: 1000,
    },
    renderTopToolbarCustomActions: () => (
      <Box>
        {isGetAnnounceLoading || isGetAnnounceFetching ? (
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

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];

    if (id) {
      setAnnounceID(id);
    }
  }, [table, rowSelection]);

  const content = (
    <>
      {showDeleteModal && (
        <Modal
          title={"حذف اطلاعیه"}
          closeModal={() => setShowDeleteModal(false)}
        >
          <p className="paragraph-primary">
            آیا از حذف این اطلاعیه اطمینان دارید؟
          </p>
          <div className="flex-row flex-center">
            <LoadingButton
              dir="ltr"
              endIcon={<DoneIcon />}
              onClick={handleDeleteAnnounce}
              loading={isDeleting}
              variant="contained"
              color="success"
              sx={{ fontFamily: "IranYekan" }}
            >
              <span>بله</span>
            </LoadingButton>

            <Button
              dir="ltr"
              endIcon={<CloseIcon />}
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
              variant="contained"
              color="error"
              sx={{ fontFamily: "IranYekan" }}
            >
              <span>خیر</span>
            </Button>
          </div>
        </Modal>
      )}
      <MaterialReactTable table={table} />;
    </>
  );
  return content;
}

export default AnnounceGrid;
