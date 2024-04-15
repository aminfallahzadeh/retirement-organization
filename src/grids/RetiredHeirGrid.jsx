// react imports
import { useMemo, useState, useEffect } from "react";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetHeirListByParentPersonIDQuery } from "../slices/heirApiSlice";
import {
  setHeirTableData,
  setSelectedHeirData,
} from "../slices/heirDataSlice.js";

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
  findById,
} from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

function RetiredHeirGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const [showEditHeirModal, setShowEditHeirModal] = useState(false);
  const [showDeleteHeirModal, setShowDeleteHeirModal] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // access the data from redux store
  const { heirTableData } = useSelector((state) => state.heirData);
  const { selectedRequestData } = useSelector((state) => state.requestsData);

  const {
    data: heirs,
    isSuccess,
    isLoading,
    error,
    refetch,
  } = useGetHeirListByParentPersonIDQuery({
    token,
    parentPersonID: selectedRequestData?.personId,
  });

  const handleShowRelatedModal = () => {
    setShowEditHeirModal(true);
  };

  const handleShowDeleteRelatedModal = () => {
    setShowDeleteHeirModal(true);
  };

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = heirs.itemList.map((heir) => ({
        id: heir.personID,
        pensionaryID: heir.pensionaryID,
        personNationalCode: heir.personNationalCode,
        personFirstName: heir.personFirstName,
        personLastName: heir.personLastName,
        personBirthDate: heir.personBirthDate,
        relationshipWithParentName: heir.relationshipWithParentName,
        parentPersonNationalCode: heir.parentPersonNationalCode,
      }));
      dispatch(setHeirTableData(data));
    }
    return () => {
      dispatch(setHeirTableData([]));
    };
  }, [
    isSuccess,
    refetch,
    heirs,
    dispatch,
    showEditHeirModal,
    showDeleteHeirModal,
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
        accessorKey: "personNationalCode",
        header: "کد ملی",
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "personFirstName",
        header: "نام",
      },
      {
        accessorKey: "personLastName",
        header: "نام خانوادگی",
      },
      {
        accessorKey: "personBirthDate",
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
        accessorKey: "relationshipWithParentName",
        header: "نسبت",
      },
      {
        accessorKey: "parentPersonNationalCode",
        header: "شماره پرونده",
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "editHeirAction",
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
        accessorKey: "deleteHeirAction",
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
    data: heirTableData,
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

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];
    const selectedGroup = findById(heirTableData, id);

    if (id) {
      dispatch(setSelectedHeirData(selectedGroup));
    } else {
      dispatch(setSelectedHeirData([]));
    }

    return () => {
      // Cleanup function to clear selected group
      dispatch(setSelectedHeirData([]));
    };
  }, [dispatch, table, rowSelection, heirTableData]);

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
          {showEditHeirModal ? (
            <Modal
              title={"اطلاعات فرد وابسته"}
              closeModal={() => setShowEditHeirModal(false)}
            >
              <RetiredRelatedInfoForm />
            </Modal>
          ) : showDeleteHeirModal ? (
            <Modal
              title={"حذف وابسته"}
              closeModal={() => setShowDeleteHeirModal(false)}
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
                  onClick={() => setShowDeleteHeirModal(false)}
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

export default RetiredHeirGrid;
