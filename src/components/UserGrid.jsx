// react imports
import { useMemo, useState, useEffect } from "react";

// redux imports
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../slices/usersApiSlice";

// helper imports
import { convertToPersianNumber } from "../helper.js";

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

function UserGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableItems, setTableItems] = useState([]);
  const [userData, setUserData] = useState([]);

  const { token } = useSelector((state) => state.auth);
  const { data: users, isLoading, isSuccess } = useGetUserQuery(token);

  const rowsPerPage = 5;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex =
    Math.min(startIndex + rowsPerPage, users?.itemList?.length) || 0;

  const handlePageChagne = (event, page) => {
    setCurrentPage(page);
    setTableItems(userData.slice(startIndex, endIndex));
  };

  useEffect(() => {
    if (isSuccess) {
      const data = users.itemList.map((user, i) => ({
        isActive: user.isActive === true ? "فعال" : "غیر فعال",
        lname: user.lastName,
        fname: user.firstName,
        username: user.username,
        number: convertToPersianNumber(i + 1),
      }));

      setUserData(data);
      setTableItems(data.slice(startIndex, endIndex));
    }
    return () => {
      // clear the list for refresh
      setUserData([]);
    };
  }, [users, isSuccess, startIndex, endIndex]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "isActive",
        header: "وضعیت",
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
        accessorKey: "lname",
        header: "نام خانوادگی",
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
        accessorKey: "fname",
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
        accessorKey: "username",
        header: "نام کاربری",
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
    initialState: { pagination: { pageSize: 5 } },
    muiPaginationProps: {
      color: "secondary",
      shape: "rounded",
      showRowsPerPage: false,
      variant: "outlined",
    },
    renderBottomToolbar: (
      <Pagination
        sx={{ paddingTop: 1.5, paddingBottom: 1.5, justifyContent: "right" }}
        count={Math.ceil(userData.length / 5)}
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

export default UserGrid;
