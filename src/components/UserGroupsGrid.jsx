// react imports
import { useMemo, useState, useEffect } from "react";

// helpers
import { convertToPersianNumber } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetUserGroupsQuery } from "../slices/usersApiSlice";
// import { setUserGroupsData } from "../slices/userReqSlice.js";
import { setUserGroupsTableData } from "../slices/userGroupsDataSlice.js";

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

function UserGroupsGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const dispatch = useDispatch();

  // access selected row info
  const { token } = useSelector((state) => state.auth);
  const { selectedUserData } = useSelector((state) => state.usersData);

  // access the data from redux store
  const { userGroupsTableData } = useSelector((state) => state.userGroupsData);

  // fetch data from the API
  const {
    data: userGroups,
    isSuccess,
    isLoading,
  } = useGetUserGroupsQuery({ token, userId: selectedUserData?.id });

  // trigger the fetch
  useEffect(() => {
    if (isSuccess) {
      const data = userGroups.itemList.map((item) => ({
        id: item.id,
        name: item.groupName,
      }));
      dispatch(setUserGroupsTableData(data));
    }
  }, [userGroups, isSuccess, dispatch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام گروه",
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
    data: userGroupsTableData,
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

export default UserGroupsGrid;
