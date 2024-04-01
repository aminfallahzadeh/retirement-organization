// react imports
import { useMemo, useState, useEffect } from "react";

// rrd imports
import { useNavigate } from "react-router-dom";

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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// mui imports
import { Box, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  LastPage,
  FirstPage,
  Save as SaveIcon,
  ArrowBack as BackIcon,
} from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  getMRT_RowSelectionHandler,
} from "material-react-table";

// helpers
import { convertToPersianNumber } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

function GriyosCreateUserGrid({ userObject }) {
  const [rowSelection, setRowSelection] = useState({});

  const [addedGroups, setAddedGroups] = useState([]);
  const { token } = useSelector((state) => state.auth);

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
        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          loading={isCreating || isDeleting || isInserting}
          onClick={handleCreateUser}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ذخیره</span>
        </LoadingButton>

        <Button
          dir="ltr"
          endIcon={<BackIcon />}
          onClick={() => navigate("/retirement-organization/users")}
          variant="contained"
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>بازگشت</span>
        </Button>
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
