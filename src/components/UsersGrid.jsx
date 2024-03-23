// react imports
import { useMemo, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefresh";

// helper imports
import { convertToPersianNumber, findById } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// rrd imports
import { Link } from "react-router-dom";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetUserQuery } from "../slices/usersApiSlice";

import {
  setUsersTableData,
  setSelectedUserData,
} from "../slices/usersDataSlice.js";

// mui imports
import { IconButton, Box } from "@mui/material";
import {
  Edit as EditIcon,
  ChecklistRtl as ChecklistRtlIcon,
} from "@mui/icons-material";

// components
import Modal from "./Modal";
import UserEditForm from "./UserEditForm";
import UserButton from "./UserButton";
import GroupsGridUserScreen from "./GroupsGridUserScreen";
import UserGroupsGrid from "./UserGroupsGrid";
import ArrowButtonsUsers from "./ArrowButtonsUsers";

// library imports
import { PaginationItem } from "@mui/material";
import { toast } from "react-toastify";
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

function UsersGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const { token } = useSelector((state) => state.auth);
  const refreshTokenHandler = useRefreshToken();

  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showEditUserGroupsModal, setShowEditUserGroupsModal] = useState(false);

  const dispatch = useDispatch();

  // access the data from redux store
  const { usersTableData } = useSelector((state) => state.usersData);

  const {
    data: users,
    isLoading,
    isFetching,
    isSuccess,
    error,
    refetch,
  } = useGetUserQuery(token);

  const handleShowEditNameModal = () => {
    setShowEditUserModal(true);
  };

  const handleShowEditUserGroupsModal = () => {
    setShowEditUserGroupsModal(true);
  };

  const handleRefresh = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
    if (isSuccess) {
      console.log(users);
      const data = users.itemList.map((user) => ({
        id: user.id,
        isActive: user.isActive === true ? "فعال" : "غیر فعال",
        lastName: user.lastName,
        firstName: user.firstName,
        username: user.username,
        password: user.password,
        email: user.email,
        sex: user.sex,
        tel: user.tel,
        mobile: user.mobile,
      }));
      dispatch(setUsersTableData(data));
    } else if (error) {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }

    return () => {
      dispatch(setUsersTableData([]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    users,
    isSuccess,
    dispatch,
    // error,
    refetch,
    showEditUserModal,
    showEditUserGroupsModal,
  ]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "username",
        header: "نام کاربری",
        size: 50,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "center",
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
        align: "right",
      },
      {
        accessorKey: "firstName",
        header: "نام",
        size: 50,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "center",
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
        align: "right",
      },
      {
        accessorKey: "lastName",
        header: "نام خانوادگی",
        size: 50,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "center",
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
        align: "right",
      },
      {
        accessorKey: "isActive",
        header: "وضعیت",
        size: 50,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "center",
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
        align: "right",
      },
      {
        accessorKey: "editNameAction",
        header: "ویرایش",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
        Cell: () => (
          <IconButton color="success" onClick={handleShowEditNameModal}>
            <EditIcon />
          </IconButton>
        ),
      },
      {
        accessorKey: "editItemsAction",
        header: "ویرایش گروه ها",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
        Cell: () => (
          <IconButton color="primary" onClick={handleShowEditUserGroupsModal}>
            <ChecklistRtlIcon />
          </IconButton>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: usersTableData,
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
        <Link to={"/retirement-organization/create-user"}>
          <UserButton variant="outline-primary" icon={"add"}>
            ایجاد کاربر
          </UserButton>
        </Link>

        <UserButton
          variant="outline-success"
          icon={"refresh"}
          onClickFn={handleRefresh}
          isLoading={isFetching}
        >
          بروز رسانی
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
    const selectedUserInfo = findById(usersTableData, id);

    if (id) {
      dispatch(setSelectedUserData(selectedUserInfo));
    } else {
      dispatch(setSelectedUserData([]));
    }

    return () => {
      // Cleanup function to clear selected user
      dispatch(setSelectedUserData([]));
    };
  }, [dispatch, table, rowSelection, usersTableData]);

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
        <>
          {showEditUserModal ? (
            <Modal
              title={"ویرایش اطلاعات کاربر"}
              closeModal={() => setShowEditUserModal(false)}
            >
              <UserEditForm setShowEditUserModal={setShowEditUserModal} />
            </Modal>
          ) : showEditUserGroupsModal ? (
            <Modal
              title={"ویرایش گروه های کاربر"}
              closeModal={() => setShowEditUserGroupsModal(false)}
            >
              <div className="flex-row">
                <GroupsGridUserScreen />
                <ArrowButtonsUsers />
                <UserGroupsGrid />
              </div>
            </Modal>
          ) : null}

          <MaterialReactTable table={table} />
        </>
      )}
    </>
  );

  return content;
}

export default UsersGrid;
