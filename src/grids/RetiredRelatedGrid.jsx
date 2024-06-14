// react imports
import { useMemo, useState, useEffect } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import {
  useGetRelatedListByParentPersonIDQuery,
  useRemoveRelatedMutation,
} from "../slices/relatedApiSlice";

// mui imports
import {
  IconButton,
  Button,
  Box,
  CircularProgress,
  Tooltip,
  PaginationItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  Add as AddIcon,
  Close as CloseIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// components
import Modal from "../components/Modal";
import CreateRelatedForm from "../forms/CreateRelatedForm";
import UpdateRelatedForm from "../forms/UpdateRelatedForm";

// library imports
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

// helper imports
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
  findById,
} from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

function RetiredRelatedGrid() {
  const [rowSelection, setRowSelection] = useState({});

  const [relatedTableData, setRelatedTableData] = useState([]);

  const [showCreateRelatedModal, setShowCreateRelatedModal] = useState(false);
  const [showEditRelatedModal, setShowEditRelatedModal] = useState(false);
  const [showDeleteRelatedModal, setShowDeleteRelatedModal] = useState(false);

  const [personID, setPersonID] = useState("");
  const [pensionaryID, setPensionaryID] = useState("");

  const [removeRelated, { isLoading: isDeleting }] = useRemoveRelatedMutation();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const parentPersonID = searchParams.get("personID");

  const {
    data: relateds,
    isSuccess,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useGetRelatedListByParentPersonIDQuery(parentPersonID);

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = relateds.itemList.map((item) => ({
        id: item.personID,
        pensionaryID: item.pensionaryID,
        relatedBirthDate: item.personBirthDate,
        relatedNtionalCode: item.personNationalCode,
        relatedFirstName: item.personFirstName,
        relatedLastName: item.personLastName,
        relatedStatus: item.pensionaryIsUnderGauranteeText,
        relation: item.relationshipWithParentName,
      }));
      setRelatedTableData(data);
    }
  }, [
    isSuccess,
    relateds,
    refetch,
    showCreateRelatedModal,
    showEditRelatedModal,
    showDeleteRelatedModal,
  ]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  const handleRefresh = () => {
    refetch();
  };

  const handleShowCreateRelatedModal = () => {
    setShowCreateRelatedModal(true);
  };

  const handleShowRelatedModal = () => {
    setShowEditRelatedModal(true);
  };

  const handleShowDeleteRelatedModal = () => {
    setShowDeleteRelatedModal(true);
  };

  const handleRemoveRelated = async () => {
    try {
      const deleteRes = await removeRelated({
        pensionaryID,
      }).unwrap();
      refetch();
      setShowDeleteRelatedModal(false);
      toast.success(deleteRes.message, {
        autoClose: 2000,
      });
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
        accessorKey: "relatedNtionalCode",
        header: "کد ملی",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "relatedFirstName",
        header: "نام",
        size: 20,
      },
      {
        accessorKey: "relatedLastName",
        header: "نام خانوادگی",
        size: 20,
      },
      {
        accessorKey: "relatedStatus",
        header: "وضعیت",
        size: 20,
      },
      {
        accessorKey: "relatedBirthDate",
        header: "تاریخ تولد",
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
        accessorKey: "relation",
        header: "نسبت",
        size: 20,
      },
      {
        accessorKey: "editRelatedAction",
        header: "ویرایش",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip
            title={`ویرایس وابسته "${row.original.relatedFirstName} ${row.original.relatedLastName}"`}
          >
            <IconButton
              color="success"
              onClick={handleShowRelatedModal}
              sx={{ padding: "0" }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        ),
      },
      {
        accessorKey: "deleteRelatedAction",
        header: "حذف",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip
            title={`حذف وابسته "${row.original.relatedFirstName} ${row.original.relatedLastName}"`}
          >
            <IconButton
              color="error"
              onClick={handleShowDeleteRelatedModal}
              sx={{ padding: "0" }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: relatedTableData,
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

        {isFetching ? (
          <IconButton aria-label="refresh" color="info" disabled>
            <CircularProgress size={20} value={100} />
          </IconButton>
        ) : (
          <Tooltip
            title={
              <span style={{ fontFamily: "sahel", fontSize: "0.8rem" }}>
                ایجاد وابسته
              </span>
            }
          >
            <span>
              <IconButton
                aria-label="refresh"
                color="success"
                onClick={handleShowCreateRelatedModal}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Box>
    ),
    muiPaginationProps: {
      shape: "rounded",
      showRowsPerPage: false,
      size: "small",
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

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];

    if (id) {
      const selected = findById(relatedTableData, id);
      setPersonID(id);
      setPensionaryID(selected?.pensionaryID);
    }
  }, [table, rowSelection, relatedTableData]);

  const content = (
    <>
      {isLoading || isFetching ? (
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
          {showCreateRelatedModal ? (
            <Modal
              title={"ایجاد وابسته"}
              closeModal={() => setShowCreateRelatedModal(false)}
            >
              <CreateRelatedForm
                setShowCreateRelatedModal={setShowCreateRelatedModal}
              />
            </Modal>
          ) : showEditRelatedModal ? (
            <Modal
              title={"ویرایش اطلاعات وابسته"}
              closeModal={() => setShowEditRelatedModal(false)}
            >
              <UpdateRelatedForm
                setShowEditRelatedModal={setShowEditRelatedModal}
                personID={personID}
              />
            </Modal>
          ) : showDeleteRelatedModal ? (
            <Modal
              title={"حذف وابسته"}
              closeModal={() => setShowDeleteRelatedModal(false)}
            >
              <p className="paragraph-primary">
                آیا از حذف این وابسته اطمینان دارید؟
              </p>
              <div className="flex-row flex-center">
                <LoadingButton
                  dir="ltr"
                  endIcon={<DoneIcon />}
                  onClick={handleRemoveRelated}
                  loading={isDeleting}
                  variant="contained"
                  color="success"
                  sx={{ fontFamily: "sahel" }}
                >
                  <span>بله</span>
                </LoadingButton>

                <Button
                  dir="ltr"
                  endIcon={<CloseIcon />}
                  onClick={() => setShowDeleteRelatedModal(false)}
                  variant="contained"
                  color="error"
                  sx={{ fontFamily: "sahel" }}
                >
                  <span>خیر</span>
                </Button>
              </div>
            </Modal>
          ) : null}
          <MaterialReactTable table={table} />
        </>
      )}
    </>
  );

  return content;
}

export default RetiredRelatedGrid;
