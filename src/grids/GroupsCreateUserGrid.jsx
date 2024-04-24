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
} from "../slices/usersApiSlice";
import { setGroupsTableData } from "../slices/groupsDataSlice";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// mui imports
import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon, ArrowBack as BackIcon } from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  getMRT_RowSelectionHandler,
} from "material-react-table";
import { faIR } from "@mui/material/locale";

// utils imports
import { defaultTableOptions } from "../utils.js";

function GriyosCreateUserGrid({ userObject }) {
  const theme = useTheme();
  const [rowSelection, setRowSelection] = useState({});
  const [addedGroups, setAddedGroups] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // recive api reducers
  const [insertUser, { isLoading: isCreating }] = useInsertUserMutation();
  const [insertGroupUsers, { isLoading: isInserting }] =
    useInsertGroupUsersMutation();

  // access the data from redux store
  const { groupsTableData } = useSelector((state) => state.groupsData);

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
      dispatch(setGroupsTableData(data));
    }

    return () => {
      dispatch(setGroupsTableData([]));
    };
  }, [groups, isSuccess, dispatch, refetch]);

  // handle error
  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  // handle create user
  const handleCreateUser = async () => {
    try {
      const createUserRes = await insertUser({
        ...userObject,
        "sex": userObject.sex === "true" ? true : false,
        "isActive": userObject.isActive === "true" ? true : false,
      }).unwrap();
      try {
        const userID = createUserRes.itemList[0].id;
        const data = addedGroups.map((item) => ({
          "id": "",
          userID,
          "groupID": item.id,
          "groupName": "",
        }));
        const insertRes = await insertGroupUsers(data).unwrap();
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
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام گروه",
        size: 800,
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
    muiTableContainerProps: { sx: { height: "500px" } },
    muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
      onClick: (event) =>
        getMRT_RowSelectionHandler({ row, staticRowIndex, table })(event),
      sx: { cursor: "pointer" },
    }),
    renderTopToolbarCustomActions: () => (
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
      >
        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          loading={isCreating || isInserting}
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

export default GriyosCreateUserGrid;