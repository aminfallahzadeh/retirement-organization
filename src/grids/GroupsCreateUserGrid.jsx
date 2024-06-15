// react imports
import { useMemo, useState, useEffect } from "react";

// redux imports
import { useGetGroupQuery } from "../slices/usersApiSlice";
// import { setGroupsTableData } from "../slices/groupsDataSlice";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// mui imports
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  getMRT_RowSelectionHandler,
} from "material-react-table";
import { faIR } from "@mui/material/locale";

// utils imports
import { defaultTableOptions } from "../utils.js";

function GroupsCreateUserGrid({ setAddedGroups }) {
  const theme = useTheme();
  const [rowSelection, setRowSelection] = useState({});

  const [groupsTableData, setGroupsTableData] = useState([]);

  const {
    data: groups,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetGroupQuery();

  // fetch data
  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = groups.itemList.map((group) => ({
        id: group.id,
        name: group.groupName,
      }));
      setGroupsTableData(data);
    }
  }, [groups, isSuccess, refetch]);

  // handle error
  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام گروه",
        size: 20,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: groupsTableData,
    enableRowSelection: true,
    enablePagination: false,
    enableBottomToolbar: false,
    muiTableContainerProps: { sx: { height: "400px" } },
    muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
      onClick: (event) =>
        getMRT_RowSelectionHandler({ row, staticRowIndex, table })(event),
      sx: { cursor: "pointer" },
    }),
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows;
    setAddedGroups(selectedRows.map((row) => row.original));
  }, [table, rowSelection, setAddedGroups]);

  const content = (
    <>
      {isLoading ? (
        <div className="skeleton-lg">
          <Skeleton
            count={7}
            baseColor="#dfdfdf"
            highlightColor="#9f9f9f"
            duration={1}
            direction="rtl"
          />
        </div>
      ) : (
        <ThemeProvider
          theme={createTheme({ ...theme, direction: "rtl" }, faIR)}
        >
          <div style={{ direction: "rtl" }}>
            <MaterialReactTable table={table} />
          </div>
        </ThemeProvider>
      )}
    </>
  );

  return content;
}

export default GroupsCreateUserGrid;
