// react imports
import { useMemo, useState, useEffect } from "react";

// rrd imports
import { Link } from "react-router-dom";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  useGetGroupQuery,
  useDeleteGroupMutation,
} from "../slices/usersApiSlice";
import {
  setGroupsTableData,
  setSelectedGroupData,
} from "../slices/groupsDataSlice";

// mui imports
import { IconButton, Box, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ChecklistRtl as ChecklistRtlIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Done as DoneIcon,
} from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// helpers
import { findById } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// components
import Modal from "../components/Modal";
import EditGroupForm from "../forms/EditGroupForm";
import ItemsGrid from "../grids/ItemsGrid";
import GroupItemsGrid from "../grids/GroupItemsGrid";
import ArrowButtonsGroups from "../components/ArrowButtonsGroups";

// library imports
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

function GroupsGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const { token } = useSelector((state) => state.auth);

  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [showEditItemsModal, setShowEditItemsModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);

  const [deleteGroup, { isLoading: isDeleting }] = useDeleteGroupMutation();

  const dispatch = useDispatch();

  // access the data from redux store
  const { groupsTableData, selectedGroupData } = useSelector(
    (state) => state.groupsData
  );

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

  const handleShowEditItemsModal = () => {
    setShowEditItemsModal(true);
  };

  const handleRefresh = () => {
    refetch();
  };

  const deleteGroupHandler = async () => {
    try {
      const res = await deleteGroup({
        token,
        data: {
          "id": selectedGroupData?.id,
          "groupName": selectedGroupData?.name,
          "isdeleted": true,
        },
      }).unwrap();
      setShowDeleteGroupModal(false);
      refetch();
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
        id: group.id,
        name: group.groupName,
      }));
      dispatch(setGroupsTableData(data));
    }

    return () => {
      dispatch(setGroupsTableData([]));
    };
  }, [
    groups,
    isSuccess,
    dispatch,
    refetch,
    showDeleteGroupModal,
    showEditNameModal,
    showEditItemsModal,
  ]);

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
        size: 450,
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
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
          <IconButton color="primary" onClick={handleShowEditItemsModal}>
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
    data: groupsTableData,
    enablePagination: false,
    enableBottomToolbar: false,
    muiTableContainerProps: { sx: { height: "500px" } },
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
        <Link to={"/retirement-organization/create-group"}>
          <Button
            dir="ltr"
            endIcon={<AddIcon />}
            variant="contained"
            color="primary"
            sx={{ fontFamily: "sahel" }}
          >
            <span>ایجاد گروه</span>
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

  const content = (
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
              <EditGroupForm setShowEditModal={setShowEditNameModal} />
            </Modal>
          ) : showDeleteGroupModal ? (
            <Modal
              title={"حذف گروه"}
              closeModal={() => setShowDeleteGroupModal(false)}
            >
              <p>آیا از حذف این گروه اطمینان دارید؟</p>
              <div className="flex-row flex-center">
                <LoadingButton
                  dir="ltr"
                  endIcon={<DoneIcon />}
                  loading={isDeleting}
                  onClick={deleteGroupHandler}
                  variant="contained"
                  color="success"
                  sx={{ fontFamily: "sahel" }}
                >
                  <span>بله</span>
                </LoadingButton>
                <Button
                  dir="ltr"
                  endIcon={<CloseIcon />}
                  onClick={() => setShowDeleteGroupModal(false)}
                  variant="contained"
                  color="error"
                  sx={{ fontFamily: "sahel" }}
                >
                  <span>خیر</span>
                </Button>
              </div>
            </Modal>
          ) : showEditItemsModal ? (
            <Modal
              title={"ویرایش آیتم ها"}
              closeModal={() => setShowEditItemsModal(false)}
            >
              <div className="flex-row">
                <div>
                  <div className="Modal__header">
                    <h4>دسترسی ها</h4>
                    <hr />
                  </div>
                  <ItemsGrid />
                </div>

                <div>
                  <div className="Modal__header">
                    <h4>عملیات</h4>
                    <hr />
                  </div>
                  <ArrowButtonsGroups />
                </div>

                <div>
                  <div className="Modal__header">
                    <h4>دسترسی های گروه</h4>
                    <hr />
                  </div>
                  <GroupItemsGrid />
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

export default GroupsGrid;
