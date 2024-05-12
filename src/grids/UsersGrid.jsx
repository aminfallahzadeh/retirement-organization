// react imports
import { useMemo, useState, useEffect } from "react";

// rrd imports
import { Link } from "react-router-dom";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetUserQuery } from "../slices/usersApiSlice";

// mui imports
import { IconButton, Box, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  Edit as EditIcon,
  ChecklistRtl as ChecklistRtlIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// utils imports
import { defaultTableOptions } from "../utils.js";

import { setUsersTableData } from "../slices/usersDataSlice.js";

// components
import Modal from "../components/Modal";
import EditUserForm from "../forms/EditUserForm";
import GroupsGridUser from "../grids/GroupsGridUser";
import UserGroupsGrid from "../grids/UserGroupsGrid";
import ArrowButtonsUsers from "../components/ArrowButtonsUsers";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function UsersGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const [userID, setUserID] = useState(null);

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
  } = useGetUserQuery({});

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
      const data = users.itemList.map((user) => ({
        id: user.userID,
        isActive: user.isActive ? "فعال" : "غیر فعال",
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
    }
    return () => {
      dispatch(setUsersTableData([]));
    };
  }, [
    users,
    isSuccess,
    dispatch,
    refetch,
    showEditUserModal,
    showEditUserGroupsModal,
  ]);

  useEffect(() => {
    console.log(usersTableData);
  }, [usersTableData]);

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
        accessorKey: "username",
        header: "نام کاربری",
        size: 50,
      },
      {
        accessorKey: "firstName",
        header: "نام",
        size: 50,
      },
      {
        accessorKey: "lastName",
        header: "نام خانوادگی",
        size: 50,
      },
      {
        accessorKey: "isActive",
        header: "وضعیت",
        size: 50,
      },
      {
        accessorKey: "editNameAction",
        header: "ویرایش کاربر",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
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
    enablePagination: false,
    enableBottomToolbar: false,
    muiTableContainerProps: { sx: { height: "500px" } },
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
          <Button
            dir="ltr"
            endIcon={<AddIcon />}
            variant="contained"
            color="primary"
            sx={{ fontFamily: "sahel" }}
          >
            <span>ایجاد کاربر</span>
          </Button>
        </Link>

        <LoadingButton
          dir="ltr"
          endIcon={<RefreshIcon />}
          loading={isFetching}
          onClick={handleRefresh}
          variant="contained"
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>بروز رسانی</span>
        </LoadingButton>
      </Box>
    ),
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];
    // const selectedUserInfo = findById(usersTableData, id);

    if (id) {
      setUserID(id);
    }
    // if (id) {
    //   dispatch(setSelectedUserData(selectedUserInfo));
    // } else {
    //   dispatch(setSelectedUserData([]));
    // }

    // return () => {
    //   // Cleanup function to clear selected user
    //   dispatch(setSelectedUserData([]));
    // };
  }, [dispatch, table, rowSelection, usersTableData]);

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
        <>
          {showEditUserModal ? (
            <Modal
              title={"ویرایش اطلاعات کاربر"}
              closeModal={() => setShowEditUserModal(false)}
            >
              <EditUserForm
                setShowEditUserModal={setShowEditUserModal}
                userID={userID}
              />
            </Modal>
          ) : showEditUserGroupsModal ? (
            <Modal
              title={"ویرایش گروه های کاربر"}
              closeModal={() => setShowEditUserGroupsModal(false)}
            >
              <div className="flex-row">
                <div>
                  <div className="Modal__header">
                    <h4 className="title-tertiary">گروه ها</h4>
                  </div>

                  <GroupsGridUser />
                </div>

                <div>
                  <div className="Modal__header">
                    <h4 className="title-tertiary">عملیات</h4>
                  </div>

                  <div style={{ marginTop: "6rem" }}>
                    <ArrowButtonsUsers />
                  </div>
                </div>

                <div>
                  <div className="Modal__header">
                    <h4 className="title-tertiary">گروه های کاربر</h4>
                  </div>

                  <UserGroupsGrid />
                </div>
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
