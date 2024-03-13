// react imports
import { useMemo, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefresh";

// rrd imports
import { Link } from "react-router-dom";

// mui imports
import { IconButton, Box } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ChecklistRtl as ChecklistRtlIcon,
} from "@mui/icons-material";

// helpers
import { convertToPersianNumber, findById } from "../helper.js";

// components
import Modal from "./Modal";
import GroupEditForm from "./GroupEditForm";
import UserButton from "./UserButton";

// utils imports
import { defaultTableOptions } from "../utils.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  useGetGroupQuery,
  useDeleteGroupMutation,
} from "../slices/usersApiSlice";
import { setGetItemsStatus } from "../slices/statusSlice";
import { setGroupInfo, setGroupsData } from "../slices/userReqSlice";

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

function GroupsGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const { token } = useSelector((state) => state.auth);
  const refreshTokenHandler = useRefreshToken();

  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);

  const [deleteGroup, { isLoading: isDeleting }] = useDeleteGroupMutation();

  const dispatch = useDispatch();

  // access the data from redux store
  const { groupInfo, groupsData } = useSelector((state) => state.userReq);

  const {
    data: groups,
    isLoading,
    isFetching,
    isSuccess,
    error,
    refetch,
  } = useGetGroupQuery(token);

  const handleShowEditNameModal = () => {
    setShowEditNameModal(true);
  };

  const handlShowDeleteGroupModal = () => {
    setShowDeleteGroupModal(true);
  };

  const handleRefresh = () => {
    refetch();
  };

  const deleteGroupHandler = async () => {
    try {
      const res = await deleteGroup({
        token,
        data: {
          "id": groupInfo?._id,
          "groupName": groupInfo?.name,
          "isdeleted": true,
        },
      }).unwrap();
      toast.success(res.message, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }
  };

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = groups.itemList.map((group) => ({
        _id: group.id,
        name: group.groupName,
      }));
      dispatch(setGroupsData(data));
    } else if (error) {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }

    return () => {
      dispatch(setGroupsData([]));
    };
  }, [groups, isSuccess, dispatch, error, refetch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام گروه",
        size: 450,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
          align: "right",
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
          align: "right",
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
    data: groupsData,
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
      <Box sx={{ display: "flex", gap: "1rem", p: "4px" }}>
        <Link to={"/retirement-organization/create-group"}>
          <UserButton variant="outline-primary" icon={"add"}>
            ایجاد گروه
          </UserButton>
        </Link>

        <UserButton
          variant="outline-success"
          onClickFn={handleRefresh}
          icon={"refresh"}
          isLoading={isFetching}
        >
          بارگزاری مجدد
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
    getRowId: (originalRow) => originalRow._id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];
    const selectedGroupInfo = findById(groupsData, id);

    if (id) {
      dispatch(setGroupInfo(selectedGroupInfo));
    } else {
      dispatch(setGroupInfo(null));
    }

    if (groupInfo) {
      dispatch(setGetItemsStatus(true));
    } else {
      dispatch(setGetItemsStatus(false));
    }

    return () => {
      dispatch(setGroupInfo(null));
      dispatch(setGetItemsStatus(false));
    };
  }, [dispatch, table, rowSelection, groupInfo, groupsData]);

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
              title={"ویرایش نام گروه"}
              closeModal={() => setShowEditNameModal(false)}
            >
              <GroupEditForm />
            </Modal>
          ) : showDeleteGroupModal ? (
            <Modal
              title={"حذف گروه"}
              closeModal={() => setShowDeleteGroupModal(false)}
            >
              <p className="GroupsGrid__modal--paragraph">
                آیا از حذف این گروه اطمینان دارید؟
              </p>
              <div className="GroupsGrid__modal--buttons">
                <UserButton
                  variant={"success"}
                  isLoading={isDeleting}
                  onClickFn={deleteGroupHandler}
                >
                  بله
                </UserButton>
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

export default GroupsGrid;
