// react imports
import { useMemo, useState, useEffect } from "react";

// helpers
import { convertToPersianNumber } from "../helper.js";

// redux imports
import { useSelector } from "react-redux";
import { useGetGroupItemsQuery } from "../slices/usersApiSlice";

// library imports
import { PaginationItem, Pagination } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import { MRT_Localization_FA } from "material-react-table/locales/fa";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function GroupItemGrid() {
  const [currentPage, setcurrentPage] = useState(1);
  const [tableItems, setTableItems] = useState([]);
  const [groupItemsData, setGroupItemsData] = useState([]);

  const { getGroupInfo } = useSelector((state) => state.userReq);

  const { token } = useSelector((state) => state.auth);
  const {
    data: groupItems,
    isSuccess,
    isLoading,
  } = useGetGroupItemsQuery({ token, groupId: getGroupInfo?._id });

  const rowsPerPage = 5;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex =
    Math.min(startIndex + rowsPerPage, groupItems?.itemList?.length) || 0;

  const handlePageChagne = (event, page) => {
    setcurrentPage(page);
    setTableItems(groupItemsData.slice(startIndex, endIndex));
  };

  useEffect(() => {
    if (isSuccess) {
      const data = groupItems.itemList.map((item, i) => ({
        name: item.itemID,
        number: convertToPersianNumber(i + 1),
      }));

      setGroupItemsData(data);
      setTableItems(data.slice(startIndex, endIndex));
    }
  }, [groupItems, isSuccess, startIndex, endIndex]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "نام",
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
        count={Math.ceil(groupItemsData.length / 5)}
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
  });

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

export default GroupItemGrid;
