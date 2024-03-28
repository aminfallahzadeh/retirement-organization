// react imports
import { useMemo, useEffect } from "react";

// helper imports
import { convertToPersianNumber } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// redux imports
import { useSelector } from "react-redux";
import { useGetRequestQuery } from "../slices/requestApiSlice";

// library imports
import { toast } from "react-toastify";
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// const data = [];

function CartableGrid({ selectedRole }) {
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(selectedRole);
    console.log("token", token);
  }, [selectedRole, token]);

  const { data: requests } = useGetRequestQuery(token);

  useEffect(() => {
    console.log(requests);
  }, [requests]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "sender",
        header: "فرستنده",
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "date",
        header: "تاریخ درخواست",
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "body",
        header: "متن درخواست",
        muiTableHeadCellProps: {
          sx: { color: "green", fontFamily: "sahel" },
        },
        muiTableBodyCellProps: {
          sx: { fontFamily: "sahel" },
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: [],
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
  });

  const content = <MaterialReactTable table={table} />;

  return content;
}

export default CartableGrid;
