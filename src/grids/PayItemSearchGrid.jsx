// REACT IMPORTS
import { useMemo, useState } from "react";

// REDUX
import { useSelector } from "react-redux";

// MUI
import {
  IconButton,
  Tooltip,
  PaginationItem,
  CircularProgress,
} from "@mui/material";
import {
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  Add as AddIcon,
} from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// COMPONENTS
import Modal from "../components/Modal.jsx";
import PayItemForm from "../forms/PayItemForm.jsx";

// HELPS
import { convertToPersianNumber } from "../helper.js";

// UTILS
import { defaultTableOptions } from "../utils.js";

function PayItemSearchGrid({ isFetching }) {
  const [rowSelection, setRowSelection] = useState({});

  // MODAL STATES
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [itemModalType, setItemModalType] = useState(null);

  // TABLE DATA
  const { financialTableData } = useSelector((state) => state.financialData);

  // HANDLERS
  const handleItemModalOpenChange = (type) => {
    setItemModalType(type);
    setIsItemModalOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "financialItemRowNum",
        header: "ردیف",
        size: 20,
        enableSorting: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "payItemTypeID",
        header: "شناسه آیتم",
        size: 20,
      },
      {
        accessorKey: "payItemTypeName",
        header: "نام آیتم",
        size: 20,
      },
      {
        accessorKey: "editPayItem",
        header: "ویرایش",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip title={`ویرایش "${row.original.payItemTypeName}"`}>
            <IconButton
              color="primary"
              sx={{ padding: "0" }}
              onClick={() => handleItemModalOpenChange("edit")}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        ),
      },
      {
        accessorKey: "removePayItem",
        header: "حذف",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip title={`حذف "${row.original.payItemTypeName}"`}>
            <IconButton color="error" sx={{ padding: "0" }}>
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
    data: financialTableData,
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
    renderTopToolbarCustomActions: () => (
      <Tooltip title="افزودن آیتم">
        <span>
          <IconButton
            aria-label="refresh"
            color="success"
            onClick={() => handleItemModalOpenChange("add")}
            disabled={financialTableData.length > 0 ? false : true}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    ),
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

  const content = (
    <>
      {isItemModalOpen && (
        <Modal closeModal={() => setIsItemModalOpen(false)}>
          <PayItemForm type={itemModalType} />
        </Modal>
      )}
      <MaterialReactTable table={table} />
    </>
  );

  return content;
}

export default PayItemSearchGrid;
