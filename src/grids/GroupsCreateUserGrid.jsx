// react imports
import { useMemo, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefresh";

// rrd imports
import { useNavigate } from "react-router-dom";

// mui imports
import { Box } from "@mui/material";
import {} from "@mui/icons-material";

// helpers
import { convertToPersianNumber, findById } from "../helper.js";

// components
import UserButton from "../components/UserButton";

// utils imports
import { defaultTableOptions } from "../utils.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetGroupQuery } from "../slices/usersApiSlice";
import {
  setGroupsTableData,
  setSelectedGroupData,
} from "../slices/groupsDataSlice";

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

function GriyosCreateUserGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const { token } = useSelector((state) => state.auth);
  const refreshTokenHandler = useRefreshToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // access the data from redux store
  const { groupsTableData } = useSelector((state) => state.groupsData);

  const {
    data: groups,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetGroupQuery(token);

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = groups.itemList.map((group) => ({
        id: group.id,
        name: group.groupName,
      }));
      dispatch(setGroupsTableData(data));
    }

    return () => {
      dispatch(setGroupsTableData([]));
    };
  }, [groups, isSuccess, dispatch, refetch]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }
  }, [error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام گروه",
        size: 450,
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
    data: groupsTableData,
    initialState: {
      density: "compact",
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
    renderTopToolbarCustomActions: () => (
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
      >
        <UserButton variant="outline-success" icon={"done"}>
          &nbsp; ذخیره
        </UserButton>

        <UserButton
          variant="outline-primary"
          icon={"arrow-back"}
          onClickFn={() => navigate("/retirement-organization/users")}
        >
          &nbsp; بازگشت
        </UserButton>
      </Box>
    ),
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
    const selectedGroup = findById(groupsTableData, id);

    if (id) {
      dispatch(setSelectedGroupData(selectedGroup));
    } else {
      dispatch(setSelectedGroupData([]));
    }

    return () => {
      // Cleanup function to clear selected group
      dispatch(setSelectedGroupData([]));
    };
  }, [dispatch, table, rowSelection, groupsTableData]);

  // check if token is expired on compoennt mount
  useEffect(() => {
    refreshTokenHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const content = (
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

  return content;
}

export default GriyosCreateUserGrid;
