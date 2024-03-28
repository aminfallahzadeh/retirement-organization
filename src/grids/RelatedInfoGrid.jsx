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
import DependentInfoForm from "../forms/DependentInfoForm";

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
    code: "۰۱۲۳۴۵۶۷۸۹",
    fname: "سعید",
    lname: "علوی",
    date: "۱۴۰۲-۱۳-۱۳",
    relation: "همسر",
  },
];

function RelatedInfoGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const [showDependentModal, setShowDependentModal] = useState(false);
  const [showDeleteRelatedModal, setShowDeleteRelatedModal] = useState(false);

  const handleShowDependentModal = () => {
    setShowDependentModal(true);
  };

  const handleShowDeleteRelatedModal = () => {
    setShowDeleteRelatedModal(true);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "code",
        header: "کد ملی",
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "fname",
        header: "نام",
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "lname",
        header: "نام خانوادگی",
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
        accessorKey: "date",
        header: "تاریخ تولد",
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
        accessorKey: "relation",
        header: "نسبت",
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
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
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
      {showDependentModal ? (
        <Modal
          title={"اطلاعات فرد وابسته"}
          closeModal={() => setShowDependentModal(false)}
        >
          <DependentInfoForm />
        </Modal>
      ) : showDeleteRelatedModal ? (
        <Modal
          title={"حذف وابسته"}
          closeModal={() => setShowDeleteRelatedModal(false)}
        >
          <p>آیا از حذف این وابسته اطمینان دارید؟</p>
          <div className="flex-row flex-center">
            <UserButton variant={"outline-success"} icon={"done"}>
              بله
            </UserButton>
            <UserButton
              variant={"danger"}
              icon={"close"}
              onClickFn={() => setShowDeleteRelatedModal(false)}
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

export default RelatedInfoGrid;
