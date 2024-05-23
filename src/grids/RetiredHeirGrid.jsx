// react imports
import { useMemo, useState, useEffect, useCallback } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  useLazyGetHeirListByParentPersonIDQuery,
  useRemoveHeirMutation,
} from "../slices/heirApiSlice";
import {
  setHeirTableData,
  setSelectedHeirData,
} from "../slices/heirDataSlice.js";

// mui imports
import { IconButton, Button, Box } from "@mui/material";
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
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// components
import Modal from "../components/Modal";
import UpdateHeirForm from "../forms/UpdateHeirForm";
import CreateHeirForm from "../forms/CreateHeirForm";

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
  const [showCreateHeirModal, setShowCreateHeirModal] = useState(false);
  const [showDeleteHeirModal, setShowDeleteHeirModal] = useState(false);

  const { selectedHeirData } = useSelector((state) => state.heirData);

  const dispatch = useDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  // ACCESS THE PENSIONARY STATE FROM STORE
  const { isPensionary } = useSelector((state) => state.retiredState);

  // access the data from redux store
  const { heirTableData } = useSelector((state) => state.heirData);

  const [getListOfHeir, { isLoading, isFetching }] =
    useLazyGetHeirListByParentPersonIDQuery();
  const [removeHeir, { isLoading: isDeleting }] = useRemoveHeirMutation();

  const handleShowCreateHeirModal = () => {
    setShowCreateHeirModal(true);
  };

  const handleShowRelatedModal = () => {
    setShowEditHeirModal(true);
  };

  const handleShowDeleteRelatedModal = () => {
    setShowDeleteHeirModal(true);
  };

  const getHeirList = useCallback(async () => {
    try {
      const getListRes = await getListOfHeir(personID).unwrap();

      const mappedData = getListRes?.itemList?.map((item) => ({
        id: item.personID,
        pensionaryID: item.pensionaryID,
        personNationalCode: item.personNationalCode,
        personFirstName: item.personFirstName,
        personLastName: item.personLastName,
        pensionaryIsUnderGauranteeText: item.pensionaryIsUnderGauranteeText,
        personBirthDate: item.personBirthDate,
        relationshipWithParentName: item.relationshipWithParentName,
        parentPersonNationalCode: item.parentPersonNationalCode,
      }));

      dispatch(setHeirTableData(mappedData));
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  }, [dispatch, personID, getListOfHeir]);

  const handleRemoveHeir = async () => {
    try {
      const deleteRes = await removeHeir({
        pensionaryID: selectedHeirData?.pensionaryID,
      }).unwrap();
      setShowDeleteHeirModal(false);
      getHeirList();
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
    if (isPensionary) {
      getHeirList();
    }
  }, [isPensionary, getHeirList]);

  // useEffect(() => {
  //   refetch();
  //   if (isSuccess) {
  //     const data = heirs.itemList.map((heir) => ({
  //       id: heir.personID,
  //       pensionaryID: heir.pensionaryID,
  //       personNationalCode: heir.personNationalCode,
  //       personFirstName: heir.personFirstName,
  //       personLastName: heir.personLastName,
  //       pensionaryIsUnderGauranteeText: heir.pensionaryIsUnderGauranteeText,
  //       personBirthDate: heir.personBirthDate,
  //       relationshipWithParentName: heir.relationshipWithParentName,
  //       parentPersonNationalCode: heir.parentPersonNationalCode,
  //     }));
  //     dispatch(setHeirTableData(data));
  //   }
  //   return () => {
  //     dispatch(setHeirTableData([]));
  //   };
  // }, [
  //   isSuccess,
  //   refetch,
  //   heirs,
  //   dispatch,
  //   showEditHeirModal,
  //   showDeleteHeirModal,
  //   showCreateHeirModal,
  // ]);

  // useEffect(() => {
  //   if (error) {
  //     console.log(error);
  //     toast.error(error?.data?.message || error.error, {
  //       autoClose: 2000,
  //     });
  //   }
  // }, [error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "personNationalCode",
        header: "کد ملی",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "personFirstName",
        header: "نام",
        size: 20,
      },
      {
        accessorKey: "personLastName",
        header: "نام خانوادگی",
        size: 20,
      },
      {
        accessorKey: "pensionaryIsUnderGauranteeText",
        header: "وضعیت",
        size: 20,
      },
      {
        accessorKey: "personBirthDate",
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
        accessorKey: "relationshipWithParentName",
        size: 20,
        header: "نسبت",
      },
      {
        accessorKey: "parentPersonNationalCode",
        header: "شماره پرونده",
        size: 20,
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
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
      >
        <Button
          dir="ltr"
          endIcon={<AddIcon />}
          disabled={!isPensionary}
          onClick={handleShowCreateHeirModal}
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
          disabled={!isPensionary}
          onClick={getHeirList}
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
              title={"ویرایش اطلاعات موظف"}
              closeModal={() => setShowEditHeirModal(false)}
            >
              <UpdateHeirForm setShowEditHeirModal={setShowEditHeirModal} />
            </Modal>
          ) : showDeleteHeirModal ? (
            <Modal
              title={"حذف موظف"}
              closeModal={() => setShowDeleteHeirModal(false)}
            >
              <p className="paragraph-primary">
                آیا از حذف این موظف اطمینان دارید؟
              </p>
              <div className="flex-row flex-center">
                <LoadingButton
                  dir="ltr"
                  endIcon={<DoneIcon />}
                  onClick={handleRemoveHeir}
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
                  onClick={() => setShowDeleteHeirModal(false)}
                  variant="contained"
                  color="error"
                  sx={{ fontFamily: "sahel" }}
                >
                  <span>خیر</span>
                </Button>
              </div>
            </Modal>
          ) : showCreateHeirModal ? (
            <Modal
              title={"ایجاد موظف"}
              closeModal={() => setShowCreateHeirModal(false)}
            >
              <CreateHeirForm setShowCreateHeirModal={setShowCreateHeirModal} />
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
