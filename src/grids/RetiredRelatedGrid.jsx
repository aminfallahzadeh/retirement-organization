// react imports
import { useMemo, useState, useEffect } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  useGetRelatedListByParentPersonIDQuery,
  useRemoveRelatedMutation,
} from "../slices/relatedApiSlice";
import {
  setRelatedTableData,
  setSelectedRelatedData,
} from "../slices/relatedDataSlice";

// mui imports
import { IconButton, Button, Box } from "@mui/material";
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
import { PaginationItem } from "@mui/material";
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
  const [showCreateRelatedModal, setShowCreateRelatedModal] = useState(false);
  const [showEditRelatedModal, setShowEditRelatedModal] = useState(false);
  const [showDeleteRelatedModal, setShowDeleteRelatedModal] = useState(false);

  const { selectedRelatedData } = useSelector((state) => state.relatedData);

  const [removeRelated, { isLoading: isDeleting }] = useRemoveRelatedMutation();

  const dispatch = useDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const parentPersonID = searchParams.get("personID");

  // access the data from redux store
  const { relatedTableData } = useSelector((state) => state.relatedData);

  const {
    data: relateds,
    isSuccess,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetRelatedListByParentPersonIDQuery(parentPersonID);

  const handleShowCreateRelatedModal = () => {
    setShowCreateRelatedModal(true);
  };

  const handleShowRelatedModal = () => {
    setShowEditRelatedModal(true);
  };

  const handleShowDeleteRelatedModal = () => {
    setShowDeleteRelatedModal(true);
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleRemoveRelated = async () => {
    try {
      const deleteRes = await removeRelated({
        pensionaryID: selectedRelatedData?.pensionaryID,
      }).unwrap();
      setShowDeleteRelatedModal(false);
      refetch();
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

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = relateds.itemList.map((related) => ({
        id: related.personID,
        pensionaryID: related.pensionaryID,
        relatedBirthDate: related.personBirthDate,
        relatedNtionalCode: related.personNationalCode,
        relatedFirstName: related.personFirstName,
        relatedLastName: related.personLastName,
        relatedStatus: related.pensionaryIsUnderGauranteeText,
        relation: related.relationshipWithParentName,
      }));
      dispatch(setRelatedTableData(data));
    }
    return () => {
      dispatch(setRelatedTableData([]));
    };
  }, [
    isSuccess,
    refetch,
    relateds,
    dispatch,
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
        Cell: () => (
          <IconButton color="success" onClick={handleShowRelatedModal}>
            <EditIcon />
          </IconButton>
        ),
      },
      {
        accessorKey: "deleteRelatedAction",
        header: "حذف",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <IconButton color="error" onClick={handleShowDeleteRelatedModal}>
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
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
      >
        <Button
          dir="ltr"
          endIcon={<AddIcon />}
          onClick={handleShowCreateRelatedModal}
          variant="contained"
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ایجاد</span>
        </Button>

        <LoadingButton
          dir="ltr"
          endIcon={<RefreshIcon />}
          loading={isFetching}
          onClick={handleRefresh}
          variant="contained"
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>بروز رسانی</span>
        </LoadingButton>
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
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];
    const selectedRelated = findById(relatedTableData, id);

    if (id) {
      dispatch(setSelectedRelatedData(selectedRelated));
    } else {
      dispatch(setSelectedRelatedData([]));
    }

    return () => {
      // Cleanup function to clear selected group
      dispatch(setSelectedRelatedData([]));
    };
  }, [dispatch, table, rowSelection, relatedTableData]);

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
