// react imports
import { useMemo, useState, useEffect } from "react";

// helpers
import { convertToPersianNumber, findById } from "../helper.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetItemsQuery } from "../slices/usersApiSlice";
import { setItemInfo, setItemsData } from "../slices/userReqSlice";

// library imports
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

function ItemsGrid() {
  const [currentPage, setcurrentPage] = useState(1);
  const [tableItems, setTableItems] = useState([]);

  const { token } = useSelector((state) => state.auth);
  const { itemInfo, itemsData } = useSelector((state) => state.userReq);

  const [rowSelection, setRowSelection] = useState({});

  const dispatch = useDispatch();

  const rowsPerPage = 5;

  const { data: items, isLoading, isSuccess } = useGetItemsQuery(token);

  const handlePageChagne = (_, page) => {
    setcurrentPage(page);
  };

  useEffect(() => {
    if (isSuccess) {
      const data = items.itemList.map((item, i) => ({
        _id: item.id,
        name: item.itemName,
        number: convertToPersianNumber(i + 1),
      }));

      dispatch(setItemsData(data));
    }
  }, [items, isSuccess, dispatch]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, itemsData.length);

    setTableItems(itemsData.slice(startIndex, endIndex));
  }, [currentPage, itemsData]);

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
        size: 100,
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
    initialState: { pagination: { pageSize: 5 } },
    renderBottomToolbar: (
      <Pagination
        sx={{ paddingTop: 1.5, paddingBottom: 1.5, justifyContent: "right" }}
        count={Math.ceil(itemsData.length / 5)}
        page={currentPage}
        dir="rtl"
        variant="outlined"
        color="success"
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

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];
    const selectedItemInfo = findById(itemsData, id);

    if (id) {
      dispatch(setItemInfo(selectedItemInfo));
    } else {
      dispatch(setItemInfo(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, table, rowSelection, itemInfo]);

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

export default ItemsGrid;
