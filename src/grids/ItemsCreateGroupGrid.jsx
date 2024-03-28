// react imports
import { useMemo, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefresh";

// rrd imports
import { useNavigate } from "react-router-dom";

// helpers
import { convertToPersianNumber } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// components
import UserButton from "../components/UserButton";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  useGetItemsQuery,
  useInsertGroupMutation,
  useDeleteGroupItemsMutation,
  useInsertGroupItemMutation,
} from "../slices/usersApiSlice";
import { setItemsTableData } from "../slices/itemsDataSlice";

// mui imports
import { Box } from "@mui/material";

// library imports
import { toast } from "react-toastify";
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
  getMRT_RowSelectionHandler,
} from "material-react-table";

function ItemsCreateGroupGrid({ groupName }) {
  const [addedItems, setAddedItems] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [insertGroup, { isLoading: isCreating }] = useInsertGroupMutation();
  const [deleteGroupItems, { isLoading: isDeleting }] =
    useDeleteGroupItemsMutation();
  const [insertGroupItem, { isLoading: isInserting }] =
    useInsertGroupItemMutation();

  // access the data from redux store
  const { itemsTableData } = useSelector((state) => state.itemsData);
  //   const { groupItemsTableData } = useSelector((state) => state.groupItemsData);

  const refreshTokenHandler = useRefreshToken();

  const [rowSelection, setRowSelection] = useState({});

  const dispatch = useDispatch();

  const {
    data: items,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
    error,
  } = useGetItemsQuery(token);

  const handleAddItem = async () => {
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
        const deleteRes = await deleteGroupItems({
          token,
          groupID,
        }).unwrap();
        console.log(deleteRes);
        try {
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
        size: 300,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: itemsTableData,
    enableRowSelection: true,
    muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
      onClick: (event) =>
        getMRT_RowSelectionHandler({ row, staticRowIndex, table })(event),
      sx: { cursor: "pointer" },
    }),
    initialState: {
      density: "compact",
      pagination: { pageIndex: 0, pageSize: 7 },
    },
    renderTopToolbarCustomActions: () => (
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
      >
        <UserButton
          variant="outline-success"
          icon={"done"}
          onClickFn={handleAddItem}
          disabled={!groupName}
          isLoading={isCreating || isDeleting || isInserting}
        >
          &nbsp; ذخیره
        </UserButton>

        <UserButton
          variant="outline-primary"
          icon={"arrow-back"}
          onClickFn={() => navigate("/retirement-organization/groups")}
          disabled={isCreating || isDeleting || isInserting}
        >
          &nbsp; بازگشت
        </UserButton>
      </Box>
    ),
    muiPaginationProps: {
      color: "success",
      variant: "outlined",
      showRowsPerPage: false,
      siblingCount: 0,
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
    const selectedRows = table.getSelectedRowModel().rows;
    setAddedItems(selectedRows.map((row) => row.original));
  }, [table, rowSelection]);

  useEffect(() => {
    console.log(addedItems);
  }, [addedItems]);

  // check if token is expired on compoennt mount
  useEffect(() => {
    refreshTokenHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading || isFetching ? (
        <p className="skeleton">
          <Skeleton count={5} />
        </p>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </>
  );
}

export default ItemsCreateGroupGrid;
