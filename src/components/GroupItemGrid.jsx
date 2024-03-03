// react imports
import { useMemo, useState, useEffect } from "react";

// helpers
import { convertToPersianNumber, findById } from "../helper.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetGroupItemsQuery } from "../slices/usersApiSlice";
import { setGroupItemInfo, setGroupItemsData } from "../slices/userReqSlice";
// import GridTemplate from "./GridTemplate.jsx";

// library imports
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import { MRT_Localization_FA } from "material-react-table/locales/fa";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  getMRT_RowSelectionHandler,
  useMaterialReactTable,
} from "material-react-table";

function GroupItemGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const dispatch = useDispatch();

  // access selected row info
  const { groupInfo } = useSelector((state) => state.userReq);
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
      const data = groupItems.itemList.map((item, i) => ({
        _id: item.id,
        name: item.itemID,
        number: i + 1,
      }));

      dispatch(setGroupItemsData(data));
    }
  }, [groupItems, isSuccess, dispatch]);

  // const cols = [{ accessorKey: "name", header: "نام" }];

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام",
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
        accessorKey: "number",
        header: "ردیف",
        size: 100,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "right",
        },
        Cell: ({ renderedCellValue }) => (
          <strong>{convertToPersianNumber(renderedCellValue)}</strong>
        ),
        align: "right",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: groupItemsData,
    localization: MRT_Localization_FA,
    muiPaginationProps: {
      color: "secondary",
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
    enablePagination: true,
    paginationDisplayMode: "pages",
    columnResizeDirection: "rtl",
    enableFullScreenToggle: false,
    positionToolbarAlertBanner: "none",
    initialState: { pagination: { pageSize: 5 } },
    enableRowSelection: true,
    enableMultiRowSelection: false,
    muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
      onClick: (event) =>
        getMRT_RowSelectionHandler({ row, staticRowIndex, table })(event),
      sx: { cursor: "pointer" },
    }),
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

  return (
    <>
      {isLoading ? (
        <p className="skeleton">
          <Skeleton count={3} />
        </p>
      ) : (
        <MaterialReactTable table={table} />
        // <GridTemplate data={groupItemsData} cols={cols} />
      )}
    </>
  );
}

export default GroupItemGrid;
