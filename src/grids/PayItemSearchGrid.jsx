// REACT IMPORTS
import { useMemo, useState } from "react";

// REDUX
import { useSelector } from "react-redux";
import { useRemoveFinancialItemMutation } from "../slices/financialItemApiSlice";

// MUI
import { IconButton, Tooltip, PaginationItem, Button } from "@mui/material";
import {
  VisibilityOutlined as EyeIcon,
  DeleteOutline as DeleteIcon,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  Add as AddIcon,
  Close as CloseIcon,
  Done as DoneIcon,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// LIBRARIES
import { toast } from "react-toastify";

// COMPONENTS
import Modal from "../components/Modal";
import ViewPayItemForm from "../forms/ViewPayItemForm";
import CreatePayItemForm from "../forms/CreatePayItemForm.jsx";

// HOOKS
import useGetFinancialItems from "../hooks/useGetFinancialItems";

// HELPS
import { convertToPersianNumber } from "../helper.js";

// UTILS
import { defaultTableOptions } from "../utils.js";

function PayItemSearchGrid() {
  const [rowSelection, setRowSelection] = useState({});

  // MODAL STATES
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [financialItemID, setFinancialItemID] = useState(null);
  const [isInsertItemModalOpen, setIsInsertItemModalOpen] = useState(false);
  const [isRemoveItemModalOpen, setIsRemoveItemModalOpen] = useState(false);
  const [itemID, setItemID] = useState(null);

  // STORE STATE
  const { canAddNewItem } = useSelector((state) => state.financialData);

  // TABLE DATA
  const { financialTableData } = useSelector((state) => state.financialData);

  const presonID = useSelector((state) => state.financialData.payPersonID);

  // ACCESS QUERIES
  const [removeItem, { isLoading: isItemRemoving }] =
    useRemoveFinancialItemMutation();
  const { getFinancialItems } = useGetFinancialItems();

  // HANDLERS
  const handleViewItemModal = (id) => {
    setFinancialItemID(id);
    setIsViewModalOpen(true);
  };

  const handleInsertModalOpenChange = () => {
    setIsInsertItemModalOpen(true);
  };

  const handleRemoveModalOpenChange = (id) => {
    setItemID(id);
    setIsRemoveItemModalOpen(true);
  };

  const handleRemoveItem = async () => {
    try {
      const res = await removeItem(itemID).unwrap();
      console.log(res);
      getFinancialItems(presonID);
      setIsRemoveItemModalOpen(false);
      toast.success(res.message, {
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "financialItemRowNum",
        header: "ردیف",
        size: 20,
        enableSorting: false,
        enableColumnActions: false,
        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "payItemTypeID",
        header: "شناسه آیتم",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "payItemTypeName",
        header: "نام آیتم",
        size: 20,
      },
      {
        accessorKey: "editPayItem",
        header: "مشاهده",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip title={`مشاهده "${row.original.payItemTypeName}"`}>
            <IconButton
              color="primary"
              sx={{ padding: "0" }}
              onClick={() => handleViewItemModal(row.original.id)}
            >
              <EyeIcon />
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
            <IconButton
              color="error"
              sx={{ padding: "0" }}
              onClick={() => handleRemoveModalOpenChange(row.original.id)}
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
            onClick={handleInsertModalOpenChange}
            disabled={!canAddNewItem}
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
      {isViewModalOpen && (
        <Modal title="مشاهده آیتم" closeModal={() => setIsViewModalOpen(false)}>
          <ViewPayItemForm id={financialItemID} />
        </Modal>
      )}

      {isInsertItemModalOpen && (
        <Modal
          title="افزودن آیتم"
          closeModal={() => setIsInsertItemModalOpen(false)}
        >
          <CreatePayItemForm
            setIsInsertItemModalOpen={setIsInsertItemModalOpen}
          />
        </Modal>
      )}

      {isRemoveItemModalOpen && (
        <Modal
          title="حذف آیتم"
          closeModal={() => setIsRemoveItemModalOpen(false)}
        >
          <p className="paragraph-primary">
            آیا از حذف این آیتم اطمینان دارید؟
          </p>
          <div className="flex-row flex-center">
            <LoadingButton
              dir="ltr"
              endIcon={<DoneIcon />}
              onClick={handleRemoveItem}
              loading={isItemRemoving}
              variant="contained"
              color="success"
              sx={{ fontFamily: "sahel" }}
            >
              <span>بله</span>
            </LoadingButton>

            <Button
              dir="ltr"
              endIcon={<CloseIcon />}
              onClick={() => setIsRemoveItemModalOpen(false)}
              variant="contained"
              color="error"
              sx={{ fontFamily: "sahel" }}
            >
              <span>خیر</span>
            </Button>
          </div>
        </Modal>
      )}
      <MaterialReactTable table={table} />
    </>
  );

  return content;
}

export default PayItemSearchGrid;
