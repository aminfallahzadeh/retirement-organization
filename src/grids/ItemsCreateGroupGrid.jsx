// react imports
import { useMemo, useState, useEffect } from "react";

// rrd imports
import { useNavigate } from "react-router-dom";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  useGetItemsQuery,
  useInsertGroupMutation,
  useInsertGroupItemMutation,
} from "../slices/usersApiSlice";
import { setItemsTableData } from "../slices/itemsDataSlice";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// mui imports
import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  MaterialReactTable,
  useMaterialReactTable,
  getMRT_RowSelectionHandler,
} from "material-react-table";
import { Save as SaveIcon, ArrowBack as BackIcon } from "@mui/icons-material";
import { faIR } from "@mui/material/locale";

// utils imports
import { defaultTableOptions } from "../utils.js";

function ItemsCreateGroupGrid({ groupName }) {
  const theme = useTheme();
  const [addedItems, setAddedItems] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [insertGroup, { isLoading: isCreating }] = useInsertGroupMutation();
  const [insertGroupItem, { isLoading: isInserting }] =
    useInsertGroupItemMutation();

  // access the data from redux store
  const { itemsTableData } = useSelector((state) => state.itemsData);

  const [rowSelection, setRowSelection] = useState({});

  const {
    data: items,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
    error,
  } = useGetItemsQuery(token);

  const handleCreateGroup = async () => {
    try {
      const createGroupRes = await insertGroup({
        token,
        data: {
          "id": "",
          groupName,
          "isdeleted": false,
        },
      }).unwrap();
      try {
        const groupID = createGroupRes.itemList[0].id;
        const data = addedItems.map((item) => ({
          "id": "",
          "itemID": item.id,
          "itemName": "",
          groupID,
        }));
        const insertRes = await insertGroupItem({
          token,
          data,
        }).unwrap();
        console.log(insertRes);
        toast.success(insertRes.message, {
          autoClose: 2000,
        });
        navigate("/retirement-organization/groups");
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error, {
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = items.itemList.map((item) => ({
        id: item.id,
        name: item.itemName,
      }));

      dispatch(setItemsTableData(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, isSuccess, dispatch, refetch]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }
  }, [error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام آیتم",
        size: 800,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: itemsTableData,
    enableRowSelection: true,
    enablePagination: false,
    enableBottomToolbar: false,
    muiTableContainerProps: { sx: { height: "500px" } },
    muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
      onClick: (event) =>
        getMRT_RowSelectionHandler({ row, staticRowIndex, table })(event),
      sx: { cursor: "pointer" },
    }),
    renderTopToolbarCustomActions: () => (
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
      >
        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          loading={isCreating || isInserting}
          onClick={handleCreateGroup}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ذخیره</span>
        </LoadingButton>

        <Button
          dir="ltr"
          endIcon={<BackIcon />}
          onClick={() => navigate("/retirement-organization/groups")}
          variant="contained"
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>بازگشت</span>
        </Button>
      </Box>
    ),
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows;
    setAddedItems(selectedRows.map((row) => row.original));
  }, [table, rowSelection]);

  return (
    <>
      {isLoading || isFetching ? (
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
        <ThemeProvider
          theme={createTheme({ ...theme, direction: "rtl" }, faIR)}
        >
          <div style={{ direction: "rtl" }}>
            <MaterialReactTable table={table} />
          </div>
        </ThemeProvider>
      )}
    </>
  );
}

export default ItemsCreateGroupGrid;
