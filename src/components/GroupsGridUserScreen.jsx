// react imports
import { useMemo, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefresh";

// helpers
import { convertToPersianNumber, findById } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetGroupQuery } from "../slices/usersApiSlice";
import {
  setGroupsUserTableData,
  setSelectedGroupUserData,
} from "../slices/groupsUserDataSlice.js";

// library imports
import { toast } from "react-toastify";
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  LastPage,
  FirstPage,
} from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function GroupsGridUserScreen() {
  const [rowSelection, setRowSelection] = useState({});
  const { token } = useSelector((state) => state.auth);
  const refreshTokenHandler = useRefreshToken();

  const dispatch = useDispatch();

  // access the data from redux store
  const { userGroupsTableData } = useSelector((state) => state.userGroupsData);
  const { groupsUserTableData } = useSelector((state) => state.groupsUserData);

  const { data: groups, isLoading, isSuccess, error } = useGetGroupQuery(token);

  useEffect(() => {
    if (isSuccess) {
      const data = groups.itemList.map((group) => ({
        id: group.id,
        name: group.groupName,
      }));

      const filteredData = data.filter(
        (a) => !userGroupsTableData.map((b) => b.name).includes(a.name)
      );

      dispatch(setGroupsUserTableData(filteredData));
    } else if (error) {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }
  }, [groups, isSuccess, dispatch, error, userGroupsTableData]);

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
    data: groupsUserTableData,
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
    const selectedGroup = findById(groupsUserTableData, id);

    if (id) {
      dispatch(setSelectedGroupUserData(selectedGroup));
    } else {
      dispatch(setSelectedGroupUserData(null));
    }
  }, [dispatch, table, rowSelection, groupsUserTableData]);

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

export default GroupsGridUserScreen;
