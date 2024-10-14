// REACT IMPORTS
import { useEffect, useMemo, useState } from "react";

// REDUX
import {
  useGetPayQuery,
  useRemovePayItemMutation,
} from "../slices/payApiSlice.js";

// MUI
import {
  IconButton,
  Tooltip,
  PaginationItem,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import {
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
import InsertPayItemForm from "../forms/InsertPayItemForm.jsx";

// HELPS
import { convertToPersianNumber } from "../helper.js";

// UTILS
import { defaultTableOptions } from "../utils.js";

function EditPayItemGrid({ payID, setIsEditModalOpen }) {
  const [tableData, setTableData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  // MODAL STATES
  const [isInsertItemModalOpen, setIsInsertItemModalOpen] = useState(false);
  const [isRemoveItemModalOpen, setIsRemoveItemModalOpen] = useState(false);
  const [payItemID, setPayItemID] = useState(null);

  // GET PAY LIST
  const {
    data: payList,
    isSuccess: isPayListSuccess,
    isLoading: isPayListLoading,
    isFetching: isPayListFetching,
    error: isPayListError,
    refetch,
  } = useGetPayQuery({ payID });

  // FETCH PAY LIST
  useEffect(() => {
    if (isPayListSuccess) {
      const mappedData = payList.payItemList.map((item, index) => ({
        id: item.payItemID,
        financialItemRowNum: index + 1,
        payItemTypeID: item.payItemTypeID,
        payItemTypeName: item.payItemTypeName,
      }));
      setTableData(mappedData);
    }

    return () => {
      setTableData([]);
    };
  }, [isPayListSuccess, payList]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // HANDLE ERRORS
  useEffect(() => {
    if (isPayListError) {
      console.log(isPayListError);
    }
  }, [isPayListError]);

  // ACCESS QUERIES
  const [removePayItem, { isLoading: isItemRemoving }] =
    useRemovePayItemMutation();

  // HANDLERS
  const handleInsertModalOpenChange = () => {
    setIsInsertItemModalOpen(true);
  };

  const handleRemoveModalOpenChange = (id) => {
    setPayItemID(id);
    setIsRemoveItemModalOpen(true);
  };

  const handleRemoveItem = async () => {
    try {
      const res = await removePayItem({ payItemID }).unwrap();
      console.log(res);
      setIsRemoveItemModalOpen(false);
      toast.success(res.message, {
        autoClose: 2000,
      });
      setIsEditModalOpen(false);
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
    data: tableData,
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
      {isInsertItemModalOpen && (
        <Modal
          title="افزودن آیتم"
          closeModal={() => setIsInsertItemModalOpen(false)}
        >
          <InsertPayItemForm
            setIsInsertItemModalOpen={setIsInsertItemModalOpen}
            payID={payID}
            refetch={refetch}
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

      {isPayListLoading || isPayListFetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem 10rem",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <div className="formContainer-transparent formContainer--width-lg flex-col">
          <MaterialReactTable table={table} />
        </div>
      )}
    </>
  );

  return content;
}

export default EditPayItemGrid;
