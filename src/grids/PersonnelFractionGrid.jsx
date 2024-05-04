// react imports
import { useMemo, useState, useEffect } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useGetFractionItemViewQuery } from "../slices/fractionApiSlice";

// mui imports
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

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// helper imports
import { convertToPersianNumber } from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

export const PersonnelFractionGrid = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [tableData, setTableData] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  const {
    data: fractions,
    isSuccess,
    isLoading,
    error,
  } = useGetFractionItemViewQuery({ personID });

  useEffect(() => {
    if (isSuccess) {
      console.log(fractions);
    }
  }, [isSuccess, fractions]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "tariffYear",
        header: "سال",
      },
      {
        accessorKey: "tariffType",
        header: "نوع سابقه",
      },
      {
        accessorKey: "chestName",
        header: "نام صندوق",
      },
      {
        accessorKey: "organization",
        header: "سازمان",
      },
      {
        accessorKey: "farv",
        header: "فروردین",
      },
      {
        accessorKey: "ordib",
        header: "اردیبهشت",
      },
      {
        accessorKey: "khord",
        header: "خرداد",
      },
      {
        accessorKey: "tir",
        header: "تیر",
      },
      {
        accessorKey: "mordad",
        header: "مرداد",
      },
      {
        accessorKey: "shah",
        header: "شهریور",
      },
      {
        accessorKey: "mehr",
        header: "مهر",
      },
      {
        accessorKey: "aban",
        header: "آبان",
      },
      {
        accessorKey: "azar",
        header: "آذر",
      },
      {
        accessorKey: "dey",
        header: "دی",
      },
      {
        accessorKey: "bahman",
        header: "بهمن",
      },
      {
        accessorKey: "esfand",
        header: "اسفند",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: tableData,
    muiTableHeadCellProps: {
      sx: {
        color: "#001a57",
        fontFamily: "sahel",
        backgroundColor: "rgba(0, 78, 152, .4)",
        borderRight: "1px solid #cfcfcf",
        fontWeight: "600",
      },
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
    muiPaginationProps: {
      color: "primary",
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

  const content = (
    <>
      {isLoading ? (
        <div className="skeleton-lg">
          <Skeleton
            count={7}
            baseColor="#dfdfdf"
            highlightColor="#9f9f9f"
            duration={1}
            direction="rtl"
          />
        </div>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </>
  );

  return content;
};

export default PersonnelFractionGrid;
