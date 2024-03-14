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
import { setGroupItemInfo, setGroupItemsData } from "../slices/userReqSlice";

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
  getMRT_RowSelectionHandler,
} from "material-react-table";

function GroupItemGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const dispatch = useDispatch();
  const refreshTokenHandler = useRefreshToken();

  // access selected row info
  const { groupInfo, itemsData } = useSelector((state) => state.userReq);
  const { token } = useSelector((state) => state.auth);

  // access the data from redux store
  const { groupItemsData } = useSelector((state) => state.userReq);

  // fetch data from the API
  const {
    data: groupItems,
    isSuccess,
    isLoading,
  } = useGetGroupItemsQuery({ token, groupId: groupInfo?._id });

  // trigger the fetch
  useEffect(() => {
    if (isSuccess) {
      const data = groupItems.itemList.map((item) => ({
        _id: item.id,
        name: item.itemName,
      }));

      console.log(data);

      const filteredData = data.filter(
        (a) => !itemsData.map((b) => b.name).includes(a.name)
      );

      dispatch(setGroupItemsData(filteredData));
    }
  }, [groupItems, isSuccess, dispatch, itemsData]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام",
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
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: groupItemsData,
    positionGlobalFilter: "left",
    initialState: {
      ...defaultTableOptions.initialState,
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
    const selectedGroupItemInfo = findById(groupItemsData, id);

    if (id) {
      dispatch(setGroupItemInfo(selectedGroupItemInfo));
    } else {
      dispatch(setGroupItemInfo(null));
    }
  }, [dispatch, table, rowSelection, groupItemsData]);

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
