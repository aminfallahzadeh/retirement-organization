// react imports
import { useMemo, useState, useEffect } from "react";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetGroupQuery } from "../slices/usersApiSlice";
import {
  setGroupsUserTableData,
  setSelectedGroupUserData,
} from "../slices/groupsUserDataSlice.js";

// mui imports
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// helpers
import { findById } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

function GroupsGridUser() {
  const [rowSelection, setRowSelection] = useState({});

  const dispatch = useDispatch();

  // access the data from redux store
  const { userGroupsTableData } = useSelector((state) => state.userGroupsData);
  const { groupsUserTableData } = useSelector((state) => state.groupsUserData);

  const {
    data: groups,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetGroupQuery();

  useEffect(() => {
    refetch();
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
  }, [groups, isSuccess, dispatch, error, refetch, userGroupsTableData]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "گروه ها",
        size: 300,
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
    enablePagination: false,
    enableBottomToolbar: false,
    muiTableContainerProps: { sx: { height: "300px" } },
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

  return (
    <>
      {isLoading ? (
        <div className="skeleton-md">
          <Skeleton
            count={7}
            baseColor="#dfdfdf"
            highlightColor="#9f9f9f"
            duration={1}
            direction="rtl"
            width={280}
          />
        </div>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </>
  );
}

export default GroupsGridUser;
