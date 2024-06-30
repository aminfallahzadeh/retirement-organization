// react imports
import { useMemo, useState, useEffect } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import {
  useGetHeirListByParentPersonIDQuery,
  useRemoveHeirMutation,
} from "../slices/heirApiSlice";

// mui imports
import {
  IconButton,
  Button,
  Box,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
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
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
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

  const [heirTableData, setHeirTableData] = useState([]);

  const [showEditHeirModal, setShowEditHeirModal] = useState(false);
  const [showCreateHeirModal, setShowCreateHeirModal] = useState(false);
  const [showDeleteHeirModal, setShowDeleteHeirModal] = useState(false);

  const [personID, setPersonID] = useState("");
  const [pensionaryID, setPensionaryID] = useState("");

  // const { selectedHeirData } = useSelector((state) => state.heirData);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const parentPersonID = searchParams.get("personID");
  const [removeHeir, { isLoading: isDeleting }] = useRemoveHeirMutation();

  const {
    data: heirs,
    isLoading,
    isSuccess,
    isFetching,
    error,
    refetch,
  } = useGetHeirListByParentPersonIDQuery(parentPersonID);

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = heirs.itemList.map((item) => ({
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
      setHeirTableData(data);
    }
  }, [
    isSuccess,
    heirs,
    refetch,
    showEditHeirModal,
    showCreateHeirModal,
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

  // HANDLERS
  const handleRefresh = () => {
    refetch();
  };

  const handleShowCreateHeirModal = () => {
    setShowCreateHeirModal(true);
  };

  const handleShowRelatedModal = () => {
    setShowEditHeirModal(true);
  };

  const handleShowDeleteRelatedModal = () => {
    setShowDeleteHeirModal(true);
  };

  const handleRemoveHeir = async () => {
    try {
      const deleteRes = await removeHeir({
        pensionaryID,
      }).unwrap();
      setShowDeleteHeirModal(false);
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
        Cell: ({ row }) => (
          <Tooltip
            title={`ویرایش "${row.original.personFirstName} ${row.original.personLastName}"`}
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
        accessorKey: "deleteHeirAction",
        header: "حذف",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip
            title={`حذف "${row.original.personFirstName} ${row.original.personLastName}"`}
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
                ایجاد موظف
              </span>
            }
          >
            <span>
              <IconButton
                aria-label="refresh"
                color="success"
                onClick={handleShowCreateHeirModal}
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
      const selected = findById(heirTableData, id);
      setPersonID(id);
      setPensionaryID(selected?.pensionaryID);
    }
  }, [table, rowSelection, heirTableData]);

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
          {showEditHeirModal ? (
            <Modal
              title={"ویرایش اطلاعات موظف"}
              closeModal={() => setShowEditHeirModal(false)}
            >
              <UpdateHeirForm
                setShowEditHeirModal={setShowEditHeirModal}
                personID={personID}
              />
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
