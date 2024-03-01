// react imports
import { useMemo, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefresh.js";

// helpers
import { convertToPersianNumber } from "../helper.js";

// bootstrap imports
import { Button } from "react-bootstrap";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetGroupQuery } from "../slices/usersApiSlice";
import { setGetItemsStatus } from "../slices/userReqSlice";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { MRT_Localization_FA } from "material-react-table/locales/fa";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function GroupsGrid() {
  const [groupsData, setGroupsData] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const refreshTokenHandler = useRefreshToken();

  const dispatch = useDispatch();

  const {
    data: groups,
    isLoading: isLoading,
    isSuccess: isSuccess,
  } = useGetGroupQuery(token);

  const createNewHandler = async () => {
    try {
      await refreshTokenHandler();
      dispatch(setGetItemsStatus(true));
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
    // clear the list for refresh
    setGroupsData([]);
    if (isSuccess) {
      groups.itemList.map((group, i) => {
        setGroupsData((prev) => [
          ...prev,
          {
            _id: group.id,
            name: group.groupName,
            number: convertToPersianNumber(i + 1),
          },
        ]);
      });
    }
  }, [groups, isSuccess]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام گروه",
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
        accessorKey: "number",
        header: "ردیف",
        grow: false,
        size: 10,
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
    columns,
    data: groupsData,
    localization: MRT_Localization_FA,
    columnResizeDirection: "rtl",
    paginationDisplayMode: "pages",
    enableFullScreenToggle: false,
    initialState: { pagination: { pageSize: 5 } },
    muiPaginationProps: {
      color: "success",
      shape: "rounded",
      rowsPerPageOptions: [5, 10, 20],
      variant: "outlined",
    },
  });

  return (
    <>
      {isLoading ? (
        <p className="skeleton">
          <Skeleton count={3} />
        </p>
      ) : (
        <>
          <MaterialReactTable table={table} />

          <div className="double-buttons">
            <Button variant="outline-success">ویرایش</Button>
            <Button variant="outline-success" onClick={createNewHandler}>
              ایجاد گروه
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default GroupsGrid;
