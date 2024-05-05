// react imports
import { useMemo, useState, useEffect } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useGetPersonnelStatementQuery } from "../slices/personnelStatementApiSlice";

// mui imports
import { IconButton } from "@mui/material";
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  RemoveRedEye as RemoveRedEyeIcon,
  Print as PrintIcon,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// helper imports
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
} from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PersonnelStatementGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const [personnelStatementTableData, setPersonnelStatementTableData] =
    useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  const {
    data: statements,
    isSuccess,
    isLoading,
    error,
  } = useGetPersonnelStatementQuery({ personID });

  useEffect(() => {
    if (isSuccess) {
      console.log(statements);
      const data = statements.itemList.map((item) => ({
        id: item.personnelStatementID,
        personnelStatementSerial: item.personnelStatementSerial || "-",
        personnelStatementTypeName: item.personnelStatementTypeName || "-",
        personnelStatementIssueDate: item.personnelStatementIssueDate || "-",
        personnelStatementRunDate: item.personnelStatementRunDate || "-",
      }));
      setPersonnelStatementTableData(data);
    }
  }, [isSuccess, statements]);

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
        accessorKey: "personnelStatementSerial",
        header: "سریال حکم",
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "personnelStatementNo",
        header: "شماره حکم",
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "personnelStatementTypeName",
        header: "نوع حکم",
      },
      {
        accessorKey: "personnelStatementIssueDate",
        header: "تاریخ صدور",
        Cell: ({ renderedCellValue }) => (
          <div>
            {convertToPersianNumber(
              convertToPersianDateFormatted(renderedCellValue)
            )}
          </div>
        ),
      },
      {
        accessorKey: "personnelStatementRunDate",
        header: "تاریخ اجرا",
        Cell: ({ renderedCellValue }) => (
          <div>
            {convertToPersianNumber(
              convertToPersianDateFormatted(renderedCellValue)
            )}
          </div>
        ),
      },
      {
        accessorKey: "printStaffStatementAction",
        header: "چاپ",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <IconButton color="success">
            <PrintIcon />
          </IconButton>
        ),
      },
      {
        accessorKey: "observeStaffStatement",
        header: "مشاهده",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <IconButton color="primary">
            <RemoveRedEyeIcon />
          </IconButton>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: personnelStatementTableData,
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
      color: "success",
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
}

export default PersonnelStatementGrid;
