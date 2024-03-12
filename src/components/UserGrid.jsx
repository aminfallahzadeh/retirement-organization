// react imports
import { useMemo, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefresh";

// helper imports
import { convertToPersianNumber, findById } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetUserQuery } from "../slices/usersApiSlice";
import { setUserInfo, setUserData } from "../slices/userReqSlice.js";
import { setGetUserGroupsStatus } from "../slices/statusSlice.js";

// mui imports
import { IconButton } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ChecklistRtl as ChecklistRtlIcon,
} from "@mui/icons-material";

// components
import Modal from "./Modal";
import UserEditForm from "./UserEditForm";
import UserButton from "./UserButton";

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

function UserGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const { token } = useSelector((state) => state.auth);
  const refreshTokenHandler = useRefreshToken();

  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);

  const dispatch = useDispatch();

  // access the data from redux store
  const { userInfo, userData } = useSelector((state) => state.userReq);

  const { data: users, isLoading, isSuccess } = useGetUserQuery(token);

  const handleShowEditNameModal = () => {
    setShowEditNameModal(true);
  };

  const handlShowDeleteGroupModal = () => {
    setShowDeleteGroupModal(true);
  };

  useEffect(() => {
    if (isSuccess) {
      const data = users.itemList.map((user) => ({
        _id: user.id,
        isActive: user.isActive === true ? "فعال" : "غیر فعال",
        lname: user.lastName,
        fname: user.firstName,
        username: user.username,
      }));

      dispatch(setUserData(data));
    }
  }, [users, isSuccess, dispatch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "username",
        header: "نام کاربری",
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
        accessorKey: "fname",
        header: "نام",
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
        accessorKey: "lname",
        header: "نام خانوادگی",
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
        header: "ویرایش نام",
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
        header: "ویرایش آیتم ها",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
        Cell: () => (
          <IconButton color="primary">
            <ChecklistRtlIcon />
          </IconButton>
        ),
      },
      {
        accessorKey: "deleteAction",
        header: "حذف گروه",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
        Cell: () => (
          <IconButton color="error" onClick={handlShowDeleteGroupModal}>
            <DeleteIcon />
          </IconButton>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: userData,
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
      dir: "rtl",
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
    getRowId: (originalRow) => originalRow._id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];
    const selectedUserInfo = findById(userData, id);
    console.log(selectedUserInfo);

    if (id) {
      dispatch(setUserInfo(selectedUserInfo));
    } else {
      dispatch(setUserInfo(null));
    }

    if (userInfo) {
      dispatch(setGetUserGroupsStatus(true));
    } else {
      dispatch(setGetUserGroupsStatus(false));
    }
    return () => {
      // Cleanup function to clear userInfo
      dispatch(setUserInfo(null));
      dispatch(setGetUserGroupsStatus(false));
    };
  }, [dispatch, table, rowSelection, userInfo, userData]);

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
        <>
          {showEditNameModal ? (
            <Modal
              title={"ویرایش اطلاعات کاربر"}
              closeModal={() => setShowEditNameModal(false)}
            >
              <UserEditForm />
            </Modal>
          ) : showDeleteGroupModal ? (
            <Modal
              title={"حذف کاربر"}
              closeModal={() => setShowDeleteGroupModal(false)}
            >
              <p className="GroupsGrid__modal--paragraph">
                آیا از حذف این کاربر اطمینان دارید؟
              </p>
              <div className="GroupsGrid__modal--buttons">
                <UserButton variant={"success"}>بله</UserButton>
                <UserButton
                  variant={"danger"}
                  icon={"close"}
                  onClickFn={() => setShowDeleteGroupModal(false)}
                >
                  خیر
                </UserButton>
              </div>
            </Modal>
          ) : null}

          <MaterialReactTable table={table} />
        </>
      )}
    </>
  );
}

export default UserGrid;
