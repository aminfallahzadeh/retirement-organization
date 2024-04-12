// react imports
import { useEffect, useMemo, useState } from "react";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetListOfRetirementStatementsQuery } from "../slices/retirementStatementApiSlice.js";
import { setStatementTableData } from "../slices/statementDataSlice.js";

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
import RetiredStatementInfoForm from "../forms/RetiredStatementInfoForm";

// helper imports
import { convertToPersianNumber } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// library imports
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

const data = [
  {
    serial: "۰۱۲۳۴۵۶۷۸۹",
    kind: "test",
    number: "123",
    issueDate: "۱۴۰۲-۱۳-۱۳",
    runDate: "۱۴۰۲-۱۳-۱۳",
  },
];

function RetiredStatementGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [showDeleteStatementModal, setShowDeleteStatementModal] =
    useState(false);

  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // access the data from redux store
  // const { statementTableData } = useSelector(
  //   (state) => state.statementDataSlice
  // );
  const { selectedRequestData } = useSelector((state) => state.requestsData);

  // const {
  //   data: statements,
  //   isSuccess,
  //   isLoading,
  //   error,
  //   refetch,
  // } = useGetListOfRetirementStatementsQuery({
  //   token,
  //   personID: selectedRequestData?.personId,
  // });

  const handleShowStatementModal = () => {
    setShowStatementModal(true);
  };

  const handleShowDeleteStatementModal = () => {
    setShowDeleteStatementModal(true);
  };

  // useEffect(() => {
  //   refetch();
  //   if (isSuccess) {
  //     const data = statements.itemList.map((statement) => ({
  //       id: statement.statementID,
  //     }));
  //     dispatch(setStatementTableData(data));
  //   }

  //   return () => {
  //     dispatch(setStatementTableData([]));
  //   };
  // }, [
  //   isSuccess,
  //   refetch,
  //   dispatch,
  //   statements,
  //   showStatementModal,
  //   showDeleteStatementModal,
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
        accessorKey: "serial",
        header: "سریال حکم",
      },
      {
        accessorKey: "kind",
        header: "نوع حکم",
      },
      {
        accessorKey: "number",
        header: "شماره حکم",
      },
      {
        accessorKey: "issueDate",
        header: "تاریخ صدور",
      },
      {
        accessorKey: "runDate",
        header: "تاریخ اجرا",
      },
      {
        accessorKey: "editNameAction",
        header: "ویرایش",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <IconButton color="success" onClick={handleShowStatementModal}>
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
          <IconButton color="error" onClick={handleShowDeleteStatementModal}>
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
      {showStatementModal ? (
        <Modal
          title={"حکم بازنشسته"}
          closeModal={() => setShowStatementModal(false)}
        >
          <RetiredStatementInfoForm />
        </Modal>
      ) : showDeleteStatementModal ? (
        <Modal
          title={"حذف حکم"}
          closeModal={() => setShowDeleteStatementModal(false)}
        >
          <p>آیا از حذف این حکم اطمینان دارید؟</p>
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
              onClick={() => setShowDeleteStatementModal(false)}
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
  );

  return content;
}

export default RetiredStatementGrid;
