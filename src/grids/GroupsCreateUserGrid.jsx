// react imports
import { useMemo, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefresh";

// rrd imports
import { useNavigate } from "react-router-dom";

// mui imports
import { Box } from "@mui/material";

// helpers
import { convertToPersianNumber } from "../helper.js";

// components
import UserButton from "../components/UserButton";

// utils imports
import { defaultTableOptions } from "../utils.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  useGetGroupQuery,
  useInsertUserMutation,
  useInsertGroupUsersMutation,
  useDeleteGroupUsersMutation,
} from "../slices/usersApiSlice";
import { setGroupsTableData } from "../slices/groupsDataSlice";

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
  getMRT_RowSelectionHandler,
} from "material-react-table";

function GriyosCreateUserGrid({ userObject }) {
  const [rowSelection, setRowSelection] = useState({});

  const [addedGroups, setAddedGroups] = useState([]);
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

  const [insertUser, { isLoading: isCreating }] = useInsertUserMutation();
  const [insertGroupUsers, { isLoading: isInserting }] =
    useInsertGroupUsersMutation();
  const [deleteGroupUsers, { isLoading: isDeleting }] =
    useDeleteGroupUsersMutation();

  const handleCreateUser = async () => {
    try {
      const createUserRes = await insertUser({
        token,
        data: {
          ...userObject,
          "sex": userObject.sex === "true" ? true : false,
          "isActive": userObject.isActive === "true" ? true : false,
        },
      }).unwrap();
      try {
        const userID = createUserRes.itemList[0].id;
        const deleteRes = await deleteGroupUsers({
          token,
          userID,
        }).unwrap();
        console.log(deleteRes);
        try {
          const data = addedGroups.map((item) => ({
            "id": "",
            userID,
            "groupID": item.id,
            "groupName": "",
          }));
          const insertRes = await insertGroupUsers({
            token,
            data,
          }).unwrap();
          console.log(insertRes);
          toast.success(insertRes.message, {
            autoClose: 2000,
          });
          navigate("/retirement-organization/users");
        } catch (err) {
          console.log(err);
          toast.error(err?.data?.message || err.error, {
            autoClose: 2000,
          });
        }
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error, {
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

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
    enableRowSelection: true,
    muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
      onClick: (event) =>
        getMRT_RowSelectionHandler({ row, staticRowIndex, table })(event),
      sx: { cursor: "pointer" },
    }),
    initialState: {
      density: "compact",
      pagination: { pageIndex: 0, pageSize: 7 },
    },
    renderTopToolbarCustomActions: () => (
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
      >
        <UserButton
          variant="outline-success"
          icon={"done"}
          onClickFn={handleCreateUser}
          disabled={isCreating}
          isLoading={isCreating || isDeleting || isInserting}
        >
          &nbsp; ذخیره
        </UserButton>

        <UserButton
          variant="outline-primary"
          icon={"arrow-back"}
          onClickFn={() => navigate("/retirement-organization/users")}
          disabled={isCreating || isDeleting || isInserting}
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
    const selectedRows = table.getSelectedRowModel().rows;
    setAddedGroups(selectedRows.map((row) => row.original));
  }, [table, rowSelection]);

  useEffect(() => {
    console.log(addedGroups);
  }, [addedGroups]);

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
