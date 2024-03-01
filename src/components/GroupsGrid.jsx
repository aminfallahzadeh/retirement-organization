// react imports
import { useMemo, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefresh.js";

// helpers
import { convertToPersianNumber } from "../helper.js";

// component imports
import CustomPagination from "./CustomPagination.jsx";

// bootstrap imports
import { Button } from "react-bootstrap";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetGroupQuery } from "../slices/usersApiSlice";
import { setGetItemsStatus, setGetGroupStatus } from "../slices/userReqSlice";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { MRT_Localization_FA } from "material-react-table/locales/fa";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  getMRT_RowSelectionHandler,
  useMaterialReactTable,
} from "material-react-table";

function GroupsGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const [groupsData, setGroupsData] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const refreshTokenHandler = useRefreshToken();

  const dispatch = useDispatch();

  const { data: groups, isLoading, isSuccess, error } = useGetGroupQuery(token);

  const createNewHandler = async () => {
    try {
      await refreshTokenHandler();
      dispatch(setGetItemsStatus(true));
      dispatch(setGetGroupStatus(false));
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
    } else if (error && error.status === 401) {
      toast.error("اطلاعات ورودی صحیح نیست", {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }
  }, [groups, isSuccess, error]);

  useEffect(() => {
    console.log(Object.keys(rowSelection)[0]);
  }, [rowSelection]);

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
    initialState: {
      pagination: { pageSize: 5 },
    },
    renderBottomToolbar: (
      <CustomPagination
        count={Math.ceil(groupsData.length / 5)}
        page={1}
        onChange={(page) => console.log("Page changed to", page)}
      />
    ),
    enableRowSelection: true,
    enableMultiRowSelection: false,
    muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
      onClick: (event) =>
        getMRT_RowSelectionHandler({ row, staticRowIndex, table })(event),
      sx: { cursor: "pointer" },
    }),
    getRowId: (originalRow) => originalRow._id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
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
            <Button variant="outline-success" onClick={createNewHandler}>
              ویرایش
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default GroupsGrid;
