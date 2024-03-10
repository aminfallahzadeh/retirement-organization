// react imports
import { useMemo, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefresh";

// helpers
import { convertToPersianNumber, findById } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetGroupQuery } from "../slices/usersApiSlice";
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

  const dispatch = useDispatch();

  // access the data from redux store
  const { groupInfo, groupsData } = useSelector((state) => state.userReq);

  const { data: groups, isLoading, isSuccess, error } = useGetGroupQuery(token);

  useEffect(() => {
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
  }, [groups, isSuccess, dispatch, error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام گروه",
        size: 350,
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
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: groupsData,
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
    state: { rowSelection, pageSize: 5 },
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
        <MaterialReactTable table={table} />
      )}
    </>
  );
}

export default GroupsGrid;
