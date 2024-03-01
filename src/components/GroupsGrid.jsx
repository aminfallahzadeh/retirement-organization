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
import { setGetItemsStatus, setGetGroupStatus } from "../slices/userReqSlice";

// library imports
import { toast } from "react-toastify";
import { PaginationItem, Pagination } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import { MRT_Localization_FA } from "material-react-table/locales/fa";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  getMRT_RowSelectionHandler,
  useMaterialReactTable,
} from "material-react-table";

function GroupsGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableItems, setTableItems] = useState([]);
  const [groupsData, setGroupsData] = useState([]);

  const [rowSelection, setRowSelection] = useState({});

  const { token } = useSelector((state) => state.auth);

  const refreshTokenHandler = useRefreshToken();

  const dispatch = useDispatch();

  const { data: groups, isLoading, isSuccess } = useGetGroupQuery(token);

  const rowsPerPage = 5;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex =
    Math.min(startIndex + rowsPerPage, groups?.itemList?.length) || 0;

  const handlePageChagne = (event, page) => {
    setCurrentPage(page);
    setTableItems(groupsData.slice(startIndex, endIndex));
  };

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
    if (isSuccess) {
      const data = groups.itemList.map((group, i) => ({
        _id: group.id,
        name: group.groupName,
        number: convertToPersianNumber(i + 1),
      }));

      setGroupsData(data);
      setTableItems(data.slice(startIndex, endIndex));
    }
    return () => {
      // clear the list for refresh
      setGroupsData([]);
    };
  }, [groups, isSuccess, startIndex, endIndex]);

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
    data: tableItems,
    localization: MRT_Localization_FA,
    columnResizeDirection: "rtl",
    enableFullScreenToggle: false,
    positionToolbarAlertBanner: "none",
    initialState: {
      pagination: { pageSize: 5 },
    },
    muiPaginationProps: {
      color: "secondary",
      shape: "rounded",
      showRowsPerPage: false,
      variant: "outlined",
    },
    renderBottomToolbar: (
      <Pagination
        sx={{ paddingTop: 1.5, paddingBottom: 1.5, justifyContent: "right" }}
        count={Math.ceil(groupsData.length / 5)}
        page={currentPage}
        dir="rtl"
        variant="outlined"
        color="secondary"
        onChange={handlePageChagne}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            slots={{ previous: ChevronRight, next: ChevronLeft }}
            page={convertToPersianNumber(item.page)}
          />
        )}
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
