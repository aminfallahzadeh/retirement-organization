// react imports
import { useMemo, useState, useEffect } from "react";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetUserQuery } from "../slices/usersApiSlice";

// library imports
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function UserGrid() {
  const dispatch = useDispatch();

  const [gridData, setGridData] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const { data: users, isLoading, isSuccess } = useGetUserQuery(token);

  useEffect(() => {
    // clear the list for refresh
    setGridData([]);
    if (isSuccess) {
      users.itemList.map((user, i) => {
        setGridData((prev) => [
          ...prev,
          {
            isActive: user.isActive === true ? "فعال" : "غیر فعال",
            lname: user.lastName,
            fname: user.firstName,
            username: user.username,
            number: i + 1,
          },
        ]);
      });
    }
  }, [users, isSuccess, dispatch]);

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
    data: gridData,
    columns,
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
