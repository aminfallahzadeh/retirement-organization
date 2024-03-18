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
    isFetching,
    refetch,
  } = useGetGroupItemsQuery({ token, groupId: selectedGroupData?.id });

  // trigger the fetch
  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = groupItems.itemList.map((item) => ({
        id: item.itemID,
        name: item.itemName,
      }));

      dispatch(setGroupItemsTableData(data));
    }
  }, [groupItems, isSuccess, dispatch, refetch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام آیتم",
        size: 300,
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
      pagination: { pageIndex: 0, pageSize: 7 },
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
    const id = Object.keys(table.getState().rowSelection)[0];
    const selectedGroupItem = findById(groupItemsTableData, id);

    if (id && selectedGroupItem) {
      dispatch(setSelectedGroupItemData(selectedGroupItem));
    } else {
      dispatch(setSelectedGroupItemData(null));
    }
  }, [dispatch, table, rowSelection, groupItemsTableData]);

  // check if token is expired on compoennt mount
  useEffect(() => {
    refreshTokenHandler();
  }, [refreshTokenHandler]);

  const content = (
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

  return content;
}

export default GroupItemGrid;
