// react imports
import { useMemo, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefresh";

// helpers
import { convertToPersianNumber, findById } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetGroupItemsQuery } from "../slices/usersApiSlice";
import {
  setGroupItemsTableData,
  setSelectedGroupItemData,
} from "../slices/groupItemsDataSlice";

// mui imports
import { IconButton } from "@mui/material";
import { Remove as RemoveIcon } from "@mui/icons-material";

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

function GroupItemGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const dispatch = useDispatch();
  const refreshTokenHandler = useRefreshToken();

  // access selected row info
  const { selectedGroupData } = useSelector((state) => state.groupsData);
  const { token } = useSelector((state) => state.auth);

  // access the data from redux store
  const { groupItemsTableData } = useSelector((state) => state.groupItemsData);

  // fetch data from the API
  const {
    data: groupItems,
    isSuccess,
    isLoading,
  } = useGetGroupItemsQuery({ token, groupId: selectedGroupData?.id });

  // trigger the fetch
  useEffect(() => {
    if (isSuccess) {
      const data = groupItems.itemList.map((item) => ({
        id: item.id,
        name: item.itemName,
      }));

      // console.log(data);

      // const filteredData = data.filter(
      //   (a) => !itemsData.map((b) => b.name).includes(a.name)
      // );

      dispatch(setGroupItemsTableData(data));
    }
  }, [groupItems, isSuccess, dispatch]);

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
      },
      {
        accessorKey: "removeItem",
        header: "کم کردن",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        muiTableHeadCellProps: {
          sx: { color: "red", fontFamily: "sahel" },
        },
        Cell: () => (
          <IconButton color="error">
            <RemoveIcon />
          </IconButton>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: groupItemsTableData,
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
      dir: "rtl",
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
    getRowId: (originalRow) => originalRow._id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];
    const selectedGroupItemInfo = findById(groupItemsTableData, id);

    if (id) {
      dispatch(setSelectedGroupItemData(selectedGroupItemInfo));
    } else {
      dispatch(setSelectedGroupItemData([]));
    }
  }, [dispatch, table, rowSelection, groupItemsTableData]);

  // check if token is expired on compoennt mount
  useEffect(() => {
    refreshTokenHandler();
  }, [refreshTokenHandler]);

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

export default GroupItemGrid;
