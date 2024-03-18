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
import ItemsGrid from "./ItemsGrid";
import GroupItemGrid from "./GroupItemGrid";
import ArrowButtonsGroups from "./ArrowButtonsGroups";

// utils imports
import { defaultTableOptions } from "../utils.js";

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
    } else if (error) {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }

    return () => {
      dispatch(setGroupsTableData([]));
    };
  }, [
    groups,
    isSuccess,
    dispatch,
    error,
    refetch,
    showDeleteGroupModal,
    showEditNameModal,
    showEditItemsModal,
  ]);

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
        <>
          {showEditNameModal ? (
            <Modal
              title={"ویرایش نام گروه"}
              closeModal={() => setShowEditNameModal(false)}
            >
              <GroupEditForm setShowEditModal={setShowEditNameModal} />
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
                  variant={"outline-success"}
                  isLoading={isDeleting}
                  onClickFn={deleteGroupHandler}
                  icon={"done"}
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
          ) : showEditItemsModal ? (
            <Modal
              title={"ویرایش آیتم ها"}
              closeModal={() => setShowEditItemsModal(false)}
            >
              <div className="flex-row">
                <ItemsGrid />
                <ArrowButtonsGroups />
                <GroupItemGrid />
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
