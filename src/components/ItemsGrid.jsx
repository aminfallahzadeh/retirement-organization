// react imports
import { useMemo, useState, useEffect, useCallback } from "react";
import useRefreshToken from "../hooks/useRefresh";

// helpers
import { convertToPersianNumber, findById } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  useGetItemsQuery,
  useInsertGroupItemMutation,
} from "../slices/usersApiSlice";
import {
  setSelectedItemData,
  setItemsTableData,
  removeItemsFromTable,
} from "../slices/itemsDataSlice";
import { addGroupItems } from "../slices/groupItemsDataSlice";

// mui imports
import { IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

// library imports
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
} from "material-react-table";

function ItemsGrid() {
  const { token } = useSelector((state) => state.auth);
  const { itemsTableData, selectedItemData } = useSelector(
    (state) => state.itemsData
  );

  const refreshTokenHandler = useRefreshToken();

  const [rowSelection, setRowSelection] = useState({});

  const [inserGroupItem] = useInsertGroupItemMutation();

  const dispatch = useDispatch();

  const { data: items, isLoading, isSuccess } = useGetItemsQuery(token);

  const handleAddGroupItem = useCallback(() => {
    dispatch(addGroupItems(selectedItemData));
    dispatch(removeItemsFromTable(selectedItemData.id));
  }, [dispatch, selectedItemData]);

  useEffect(() => {
    if (isSuccess) {
      const data = items.itemList.map((item) => ({
        id: item.id,
        name: item.itemName,
      }));

      dispatch(setItemsTableData(data));
    }
  }, [items, isSuccess, dispatch]);

  // const insertGroupItemHandler = async () => {
  //   try {
  //     const itemID = itemInfo?._id;
  //     const groupID = groupInfo._id;
  //     const res = await inserGroupItem({
  //       token,
  //       data: [
  //         {
  //           "id": "",
  //           itemID,
  //           "itemName": "",
  //           groupID,
  //         },
  //       ],
  //     });
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام آیتم",
        size: 350,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "right",
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
        align: "right",
      },
      {
        accessorKey: "addItem",
        header: "اضافه کردن",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
        Cell: () => (
          <IconButton
            color="success"
            onClick={handleAddGroupItem}
            disabled={selectedItemData ? false : true}
          >
            <AddIcon />
          </IconButton>
        ),
      },
    ],
    [handleAddGroupItem, selectedItemData]
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: itemsTableData,
    positionGlobalFilter: "left",
    initialState: {
      density: "compact",
      showGlobalFilter: true,
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
    const selectedItem = findById(itemsTableData, id);

    if (id && selectedItem) {
      dispatch(setSelectedItemData(selectedItem));
    } else {
      dispatch(setSelectedItemData(null));
    }
  }, [dispatch, table, itemsTableData, rowSelection]);

  // check if token is expired on compoennt mount
  useEffect(() => {
    refreshTokenHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <p className="skeleton">
          <Skeleton count={3} />
        </p>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </>
  );
}

export default ItemsGrid;
