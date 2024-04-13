// react imports
import { useMemo, useState, useEffect } from "react";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetRelatedListByParentPersonIDQuery } from "../slices/relatedApiSlice";
import { setRelatedTableData } from "../slices/relatedDataSlice";

// mui imports
import { IconButton, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  Add as AddIcon,
  Close as CloseIcon,
  Done as DoneIcon,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// components
import Modal from "../components/Modal";
import RetiredRelatedInfoForm from "../forms/RetiredRelatedInfoForm";

// library imports
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

// helper imports
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
} from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

function RetiredRelatedInfoGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const [showDependentModal, setShowDependentModal] = useState(false);
  const [showDeleteRelatedModal, setShowDeleteRelatedModal] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // access the data from redux store
  const { relatedTableData } = useSelector((state) => state.relatedData);
  const { selectedRequestData } = useSelector((state) => state.requestsData);

  const {
    data: relateds,
    isSuccess,
    isLoading,
    error,
    refetch,
  } = useGetRelatedListByParentPersonIDQuery({
    token,
    parentPersonID: selectedRequestData?.personId,
  });

  const handleShowDependentModal = () => {
    setShowDependentModal(true);
  };

  const handleShowDeleteRelatedModal = () => {
    setShowDeleteRelatedModal(true);
  };

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = relateds.itemList.map((related) => ({
        id: related.relatedID,
        relatedBirthDate: related.personBirthDate,
        relatedNtionalCode: related.personNationalCode,
        relatedFirstName: related.personFirstName,
        relatedLastName: related.personLastName,
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
    showDependentModal,
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
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "relatedFirstName",
        header: "نام",
      },
      {
        accessorKey: "relatedLastName",
        header: "نام خانوادگی",
      },
      {
        accessorKey: "relatedBirthDate",
        header: "تاریخ تولد",
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
      },
      {
        accessorKey: "editNameAction",
        header: "ویرایش",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <IconButton color="success" onClick={handleShowDependentModal}>
            <EditIcon />
          </IconButton>
        ),
      },
      {
        accessorKey: "deleteAction",
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
      <Button
        dir="ltr"
        endIcon={<AddIcon />}
        variant="contained"
        color="primary"
        sx={{ fontFamily: "sahel" }}
      >
        <span>ایجاد</span>
      </Button>
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
          {showDependentModal ? (
            <Modal
              title={"اطلاعات فرد وابسته"}
              closeModal={() => setShowDependentModal(false)}
            >
              <RetiredRelatedInfoForm />
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

export default RetiredRelatedInfoGrid;
