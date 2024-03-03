// react imports
import { useMemo, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefresh.js";

// helpers
import { convertToPersianNumber, findById } from "../helper.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetGroupQuery } from "../slices/usersApiSlice";
import {
  setGetItemsStatus,
  setGroupInfo,
  setGroupsData,
} from "../slices/userReqSlice";

// library imports
import { PaginationItem, Pagination } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import { MRT_Localization_FA } from "material-react-table/locales/fa";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  getMRT_RowSelectionHandler,
  useMaterialReactTable,
} from "material-react-table";

function GroupsGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableItems, setTableItems] = useState([]);
  // const [groupsData, setGroupsData] = useState([]);

  const { groupInfo, groupsData } = useSelector((state) => state.userReq);

  const [rowSelection, setRowSelection] = useState({});

  const { token } = useSelector((state) => state.auth);

  const refreshTokenHandler = useRefreshToken();

  const dispatch = useDispatch();

  const { data: groups, isLoading, isSuccess } = useGetGroupQuery(token);

  const rowsPerPage = 5;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex =
    Math.min(startIndex + rowsPerPage, groups?.itemList?.length) || 0;

  const handlePageChagne = (event, page) => {
    setCurrentPage(page);
    setTableItems(groupsData.slice(startIndex, endIndex));
  };

  useEffect(() => {
    if (isSuccess) {
      const data = groups.itemList.map((group, i) => ({
        _id: group.id,
        name: group.groupName,
        number: convertToPersianNumber(i + 1),
      }));

      dispatch(setGroupsData(data));
      setTableItems(data.slice(startIndex, endIndex));
    }
    return () => {
      // clear the list for refresh
      dispatch(setGroupsData([]));
    };
  }, [groups, isSuccess, startIndex, endIndex, dispatch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام گروه",
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
        grow: false,
        size: 10,
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
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: tableItems,
    localization: MRT_Localization_FA,
    columnResizeDirection: "rtl",
    enableFullScreenToggle: false,
    positionToolbarAlertBanner: "none",
    initialState: {
      pagination: { pageSize: 5 },
    },

    renderBottomToolbar: (
      <Pagination
        sx={{ paddingTop: 1.5, paddingBottom: 1.5, justifyContent: "right" }}
        count={Math.ceil(groupsData.length / 5)}
        page={currentPage}
        dir="rtl"
        variant="outlined"
        color="success"
        onChange={handlePageChagne}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            slots={{ previous: ChevronRight, next: ChevronLeft }}
            page={convertToPersianNumber(item.page)}
          />
        )}
      />
    ),
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
    const selectedGroupInfo = findById(groupsData, id);

    if (id) {
      dispatch(setGroupInfo(selectedGroupInfo));
    } else {
      dispatch(setGroupInfo(null));
    }

    if (groupInfo) {
      dispatch(setGetItemsStatus(true));
    } else {
      dispatch(setGetItemsStatus(false));
    }
  }, [
    dispatch,
    table,
    rowSelection,
    refreshTokenHandler,
    groupInfo,
    groupsData,
  ]);

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

export default GroupsGrid;
