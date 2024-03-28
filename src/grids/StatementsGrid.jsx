// react imports
import { useMemo, useState } from "react";

// helper imports
import { convertToPersianNumber } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// mui imports
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

// components
import UserButton from "../components/UserButton";
import Modal from "../components/Modal";
import RetiredStatementInfoForm from "../forms/RetiredStatementInfoForm";

// library imports
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const data = [
  {
    serial: "۰۱۲۳۴۵۶۷۸۹",
    kind: "test",
    number: "123",
    issueDate: "۱۴۰۲-۱۳-۱۳",
    runDate: "۱۴۰۲-۱۳-۱۳",
  },
];

function StatementsGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [showDeleteStatementModal, setShowDeleteStatementModal] =
    useState(false);

  const handleShowStatementModal = () => {
    setShowStatementModal(true);
  };

  const handleShowDeleteStatementModal = () => {
    setShowDeleteStatementModal(true);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "serial",
        header: "سریال حکم",
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "kind",
        header: "نوع حکم",
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "number",
        header: "شماره حکم",
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "issueDate",
        header: "تاریخ صدور",
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "right",
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "runDate",
        header: "تاریخ اجرا",
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "right",
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "editNameAction",
        header: "ویرایش",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
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
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
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
    initialState: {
      density: "compact",
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
    renderTopToolbarCustomActions: () => (
      <UserButton variant="outline-primary" icon={"add"}>
        ایجاد
      </UserButton>
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
            <UserButton variant={"outline-success"} icon={"done"}>
              بله
            </UserButton>
            <UserButton
              variant={"danger"}
              icon={"close"}
              onClickFn={() => setShowDeleteStatementModal(false)}
            >
              خیر
            </UserButton>
          </div>
        </Modal>
      ) : null}
      <MaterialReactTable table={table} />
    </>
  );

  return content;
}

export default StatementsGrid;
